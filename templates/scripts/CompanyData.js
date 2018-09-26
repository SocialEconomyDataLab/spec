


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
  var headers = sheet.getRange(1,1,1,sheet.getLastColumn()).getValues()[0]
  
  var companyCol = headers.indexOf("companyNumber")
  if(companyCol > -1 && sheet.getRange(row,companyCol+1).getValue()) {
    var companyNumber = sheet.getRange(row,companyCol+1).getValue()
      var response = UrlFetchApp.fetch("https://api.opencorporates.com/companies/gb/" + companyNumber);
      var data = JSON.parse(response)
      for(field in data['results']['company']['registered_address']) {
        var col = headers.indexOf(fieldMapping[field])
        if(col > -1) {
          if(sheet.getRange(row,col+1).getValue() == "") {
            sheet.getRange(row,col+1).setValue(data['results']['company']['registered_address'][field])
          } else {
            SpreadsheetApp.getActiveSpreadsheet().toast('Existing values in ' + field + ' were not overwritten')
          }
        }
      }
    industryCodes = []
    Logger.log(data['results']['company']['industry_codes'][0]['industry_code']['code'])
    for(var n = 0; n < data['results']['company']['industry_codes'].length; n++) {
        Logger.log("Industry code")
        industryCodes.push(data['results']['company']['industry_codes'][n]['industry_code']['code'])
    }
    Logger.log(industryCodes)
    sheet.getRange(row,headers.indexOf('sicCodes')+1).setValue(industryCodes.join(","))   
  }
  
  geoCodeAddress()
}




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