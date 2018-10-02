function onOpen() {
  var ui = SpreadsheetApp.getUi();
  // Or DocumentApp or FormApp.
  ui.createMenu('Organisation Tools')
      .addItem('Fetch Company Data', 'fetchUKCompanyDetails')
      .addItem('Fetch Charity Data', 'fetchUKCharityDetails')
      .addItem('Fetch Mutuals Data', 'fetchUKMutualsDetails')
      .addItem('Geocode from postcode', 'geoCodeAddress')
      .addToUi();
}



//The headers should be established once per script run
sheetForHeaders = SpreadsheetApp.getActiveSheet()
headers = sheetForHeaders.getRange(1,1,1,sheetForHeaders.getLastColumn()).getValues()[0]

/*
* updateCell
*
* We want a way to non-desctructively update cells
*/ 
function updateCell(sheet,row,colTitle,value,overwrite) {
  if(value) {
   var col = headers.indexOf(colTitle) 
   if(col > -1) {
     if(sheet.getRange(row,col+1).getValue() == "" || overwrite) {
       sheet.getRange(row,col+1).setValue(value)
     } else {
        SpreadsheetApp.getActiveSpreadsheet().toast('Existing values in ' + colTitle + ' were not overwritten')
     }
   } else {
     Logger.log("No column found for " + colTitle) 
   }
  }
}

/*
* openCorporatesGetDatum
*
* Extract a particular item from the Open Corporates datum array by type
*/
function openCorporatesGetDatum(data,type) {
  //ToDo: Check if we should sort datum by id first, in case the API has not done this. 
  for(var n =0; n < data.length; n++) {
    if(data[n]['datum']['data_type'] == type) {
      return data[n]['datum']['description']
    }
  }
}

/*
* Used to make sure we have the latest financial figures from Open Corporates Data
*
* Taken from https://stackoverflow.com/questions/8837454/sort-array-of-objects-by-single-key-with-date-value
*/
function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}


/*
* toTitleCase
*
* Useful because OpenCorporates gives back company titles in all caps. 
*/

function toTitleCase(input) {
  var i, j, str, lowers, uppers;
  str = input.replace(/([^\W_]+[^\s-]*) */g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });

  // Certain minor words should be left lowercase unless 
  // they are the first or last words in the string
  lowers = ['A', 'An', 'The', 'And', 'But', 'Or', 'For', 'Nor', 'As', 'At', 
  'By', 'For', 'From', 'In', 'Into', 'Near', 'Of', 'On', 'Onto', 'To', 'With'];
  for (i = 0, j = lowers.length; i < j; i++)
    str = str.replace(new RegExp('\\s' + lowers[i] + '\\s', 'g'), 
      function(txt) {
        return txt.toLowerCase();
      });

  // Certain words such as initialisms or acronyms should be left uppercase
  uppers = ['Id', 'Tv'];
  for (i = 0, j = uppers.length; i < j; i++)
    str = str.replace(new RegExp('\\b' + uppers[i] + '\\b', 'g'), 
      uppers[i].toUpperCase());

  return str;
}

/*
* Run to update UK Company details
* 
*/
function fetchUKCompanyDetails() {
  var fieldMapping = {
    "street_address":"streetAddress",
    "locality":"addressLocality",
    "region":"addressRegion",
    "country":"addressCountry",
    "postal_code":"postalCode"
  }
  var sheet = SpreadsheetApp.getActiveSheet()
  var row = sheet.getActiveCell().getRow()
  // var headers = sheet.getRange(1,1,1,sheet.getLastColumn()).getValues()[0]
  
  var companyCol = headers.indexOf("companyNumber")
  if(companyCol > -1 && sheet.getRange(row,companyCol+1).getValue()) {
    var companyNumber = sheet.getRange(row,companyCol+1).getValue()
      var response = UrlFetchApp.fetch("https://api.opencorporates.com/companies/gb/" + companyNumber);
      var data = JSON.parse(response)
      
      //Iterate through address fields
      for(field in data['results']['company']['registered_address']) {
        updateCell(sheet,row,fieldMapping[field],data['results']['company']['registered_address'][field],false)
      }
    
      //Check for company name
      updateCell(sheet,row,'name',toTitleCase(data['results']['company']['name']),false)
   
      //At present we assume we are getting UK SIC codes in industry classifications.
      industryCodes = []
      for(var n = 0; n < data['results']['company']['industry_codes'].length; n++) {
          industryCodes.push(data['results']['company']['industry_codes'][n]['industry_code']['code'])
      }
      updateCell(sheet,row,'sicCodes',industryCodes.join(","),false)
      
      //Add start and end dates
      updateCell(sheet,row,'startDate',data['results']['company']['incorporation_date'],false)
      updateCell(sheet,row,'endDate',data['results']['company']['dissolution_date'],false)
      updateCell(sheet,row,'typeFromLookup',data['results']['company']['company_type'],false)
      
      //Get the first previous name as an alternate name
      if(data['results']['company']['previous_names']) {
        updateCell(sheet,row,'alternateName',toTitleCase(data['results']['company']['previous_names'][0]['company_name']),false)
      }

      //Check for website
      updateCell(sheet,row,'url',openCorporatesGetDatum(data['results']['company']['data']['most_recent'],'Website'),false)
    
      //Get latest turnover
      //This needs more work to make sure it is always accurate - as possible different years for different
      //values, and we just assume that the most recent is common across everything.
      if(data['results']['company']['financial_summary']) {
         updateCell(sheet,row,'financial/0/income',data['results']['company']['financial_summary']['revenue'],false)
        
         var sortedFinance = sortByKey(data['results']['company']['financial_summary']['current_assets'],'date')
         updateCell(sheet,row,'financial/0/id',sortedFinance[0]['date'],false)
         updateCell(sheet,row,'financial/0/assets',sortedFinance[0]['value'],false)
         var sortedFinance = sortByKey(data['results']['company']['financial_summary']['fixed_assets'],'date')
         updateCell(sheet,row,'financial/0/fixed_assets',sortedFinance[0]['value'],false)
         
      }

  }
  
  geoCodeAddress()
}

/*
* findThatCharityGetByType
*
* Extract a particular item from the Open Corporates datum array by type
*/
function findThatCharityGetByType(data,type) {
  //ToDo: Check if we should sort datum by id first, in case the API has not done this. 
  for(var n =0; n < data.length; n++) {
    if(data[n]['type'] == type) {
      return data[n]['name']
    }
  }
}


/*
* fetchUKCharityData
*/
function fetchUKCharityDetails() {
 
  var sheet = SpreadsheetApp.getActiveSheet()
  var row = sheet.getActiveCell().getRow()  
  var charityCol = headers.indexOf("charityNumber")
  if(charityCol > -1 && sheet.getRange(row,charityCol+1).getValue()) {
      var charityNumber = sheet.getRange(row,charityCol+1).getValue()
      var response = UrlFetchApp.fetch("https://findthatcharity.uk/charity/" + charityNumber +'.json');
      var data = JSON.parse(response)
 
      updateCell(sheet,row,'name',data['known_as'],false)

      updateCell(sheet,row,'startDate',data['date_registered'].substring(0,10),false)
      updateCell(sheet,row,'endDate',(data['date_removed'] ? data['date_removed'].substring(0,10) : "") ,false)
      updateCell(sheet,row,'postalCode',data['geo']['postcode'],false)
      updateCell(sheet,row,'url',data['url'],false)
      
      updateCell(sheet,row,'financial/0/id',data['last_modified'].substring(0,10),false)
      updateCell(sheet,row,'financial/0/income',data['latest_income'],false)
    
      updateCell(sheet,row,'alternateName',findThatCharityGetByType(data['names'],'other name'),false)
      
      if(data['company_number'].length) {
        updateCell(sheet,row,'companyNumber',data['company_number'][0]['number'])
      }

    geoCodeAddress()
  }
}


/*
* fetchUKMutualsData
*
* Scrape data from the Mutuals Public Register
*/
function fetchUKMutualsDetails() {
  
 var sheet = SpreadsheetApp.getActiveSheet()
  var row = sheet.getActiveCell().getRow()
  // var headers = sheet.getRange(1,1,1,sheet.getLastColumn()).getValues()[0]
  
  var companyCol = headers.indexOf("companyNumber")
  if(companyCol > -1 && sheet.getRange(row,companyCol+1).getValue()) {
    var companyNumber = sheet.getRange(row,companyCol+1).getValue()
      var parts = companyNumber.split(/([A-Z]+)/g)
      if(parts.length) {
        
        //We try and parse the Register website to get the details we need
        var mutualsDict = {}
        var response = UrlFetchApp.fetch("https://mutuals.fsa.gov.uk/SocietyDetails.aspx?Number=" + parts[0] + "&Suffix=" + parts[1]);
        
         var table = response.getContentText().split('class="table topaligned">')[1].split("</table>")[0]
         var tableRows = table.split("</tr>")

         for(var tr = 0; tr < tableRows.length;tr++) {
           var dataRow = tableRows[tr].split("</td>")
           if(dataRow.length > 1) {
             mutualsDict[dataRow[0].replace(/(<([^>]+)>)/ig,"").replace(":","").trim()]=dataRow[1].replace(/<br \/>/g,"|").replace(/(<([^>]+)>)/ig,"")
           }
         }
        
        updateCell(sheet,row,'name',mutualsDict['Society Name'],false)
        
        if(mutualsDict['Registration Date']) {
          var startDate =  new Date(mutualsDict['Registration Date']).toISOString().substr(0,10)
          updateCell(sheet,row,'startDate',startDate,false)
        }
        
        //We assume the postcode is the last portion
        Logger.log(mutualsDict['Address'])
        if(mutualsDict['Address']) {
         var address = mutualsDict['Address'].split("|") 
         Logger.log(address)
         updateCell(sheet,row,'postalCode',address.pop(),false) 
         updateCell(sheet,row,'addressLocality',address.pop(),false) 
         updateCell(sheet,row,'streetAddress',address.join("\n").trim(),false) 
        }
        

      } else {
        SpreadsheetApp.getActiveSpreadsheet().toast('Mutuals numbers should be written in the form prefix+suffix. Eg. 7704CBS for a community benefit society.')
      }
    
     geoCodeAddress()
      }
}


/*
* We currently use a simple Google Geocoding from postcode
*/ 
function geoCodeAddress() {
  var sheet = SpreadsheetApp.getActiveSheet()
  var row = sheet.getActiveCell().getRow()
  var headers = sheet.getRange(1,1,1,sheet.getLastColumn()).getValues()[0]
  
  var postcodeCol = headers.indexOf("postalCode")
  if(postcodeCol > -1 && sheet.getRange(row,postcodeCol+1).getValue()) {
    var response = Maps.newGeocoder().setRegion("uk").geocode(sheet.getRange(row,postcodeCol+1).getValue())
    sheet.getRange(row,headers.indexOf('location/0/latitude')+1).setValue(response['results'][0]['geometry']['location']['lat'])
    sheet.getRange(row,headers.indexOf('location/0/longitude')+1).setValue(response['results'][0]['geometry']['location']['lng'])
    sheet.getRange(row,headers.indexOf('location/0/id')+1).setValue(response['results'][0]['place_id'])
  } else {
    SpreadsheetApp.getActiveSpreadsheet().toast('No postcode provided')
  }
  
}




/*
* For padding numbers. From https://stackoverflow.com/questions/10073699/pad-a-number-with-leading-zeros-in-javascript
*/
function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}


/*
* A spreadsheet function provide an org-id value
*
* Very primitive right now.
*/

function uk_orgid(companyNumber,charityNumber,name) {
  companyNumber = String(companyNumber) || ""
  charityNumber = String(charityNumber) || ""
  name = String(name) || ""

  if(companyNumber) {
     //Values staring RS, IP or with a text suffix are assumed to be Mutuals
     if(companyNumber.substr(0,2) == 'RS' || companyNumber.substr(0,2) == 'IP' || companyNumber.slice(-1) == "R" || companyNumber.slice(-3) == "CBS" ) {
         prefix = "GB-MPR"
         value = companyNumber
     } else {
        prefix = "GB-COH"
        value = pad(companyNumber,8)
     }
  } else if(charityNumber) {
    if(charityNumber.substr(0,2) == "SC") {
      prefix = "GB-SC"
      value = charityNumber
    } else if(charityNumber.substr(0,2) == "NI") {
      prefix ="GB-NIC" 
      value = charityNumber
    } else {
      prefix = "GB-CHC" 
      value = charityNumber
    }
  } else {
    prefix = "MISC"
    value = name.replace(/ /g,"")
  }
  
  return prefix + "-"+value 
}

