/*

To setup a template we need to:

- Identify the number of rows we need for headers
- Identify the depth of header 

*/

// Use http://tools.medialab.sciences-po.fr/iwanthue/ to get a different color palette 
colors = ["#caecbc",
"#a6b79f",
"#bdd6bc",
"#a3c9a3",
"#d3f1d6",
"#88baa9",
"#97b1ab",
"#abc5bf",
"#b6eee2",
"#cde8e2",
"#79c6c1",
"#94d2cf",
"#a2e7ed",
"#83daf2",
"#bbe2ee",
"#6dc5dd",
"#99ceeb",
"#a4bccb",
"#b8cff2",
"#88aee1",
"#9db3d6",
"#cbd5e7",
"#cec9f3",
"#bcaad6",
"#e6d6ee",
"#e2c2f3",
"#c3b3cb",
"#f0c3dd",
"#e0b3c9",
"#e0c7ce"]


function getSchemaMap(sheetName) {
  var schemaSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName)
  var schemaRange = schemaSheet.getRange(2,2,schemaSheet.getLastRow(),8).getValues()
  var schemaMap = {}
  var maxDepth = 0
  
  for(i = 0; i < schemaRange.length; i++) {
    schemaMap[schemaRange[i][0]] = {
      "depth":schemaRange[i][0].split("/").length,
      "title": schemaRange[i][1],
      "description": schemaRange[i][2],
      "type": schemaRange[i][3],
      "range": schemaRange[i][4],
      "values": schemaRange[i][5],
      "links": schemaRange[i][6],
      "deprecated": schemaRange[i][7],
      "deprecationNotes": schemaRange[i][8],
    }
    if(schemaMap[schemaRange[i][0]]['depth'] > maxDepth) { maxDepth = schemaMap[schemaRange[i][0]]['depth']}
  }  
  
  return {'map':schemaMap,'maxDepth':maxDepth}
}


/*
* This function establishes a spreadsheet template based on paths
*/ 

function layoutTemplate() {
  
  // We assume the presence of a mapping sheet with columns: section, path, title, description, type, range, values, links, deprecated, deprecationNotes
  // We build an object which maps from path to relevant information
  var schemaMap = getSchemaMap('mapping')
  var maxDepth = schemaMap['maxDepth']

  
  var sheet = SpreadsheetApp.getActiveSheet()
  var headers = sheet.getRange(1,1,1,sheet.getLastColumn()).getValues()[0]

  //Get a copy of the header row without /0/ notation
  var mapHeaders = headers.map(function(item) { return item.replace(/\/[0-9]/g,"") })

  //Now we iterate through each column, setting up titles, color coding, and validation  
  var titles = []
  var descriptions = []
  var depth = 0
  var parent = ""
  var fontArray = []

  for(m = 0; m < mapHeaders.length; m++) {
      titles.push(schemaMap['map'][mapHeaders[m]]['title'])
      descriptions.push(schemaMap['map'][mapHeaders[m]]['description'])
      fontArray.push("bold")
      
      //When the parent changes we want to write out the object details, and color in the range.
      
      var currentParent = mapHeaders[m].split("/")[mapHeaders[m].split("/").length - 2]

      if(currentParent != parent) {
        depth = mapHeaders[m].split("/").length
        parent = mapHeaders[m].split("/")[mapHeaders[m].split("/").length - 2]
        var object = mapHeaders[m].substring(0, mapHeaders[m].lastIndexOf('/'))
        sheet.getRange(depth +1,m + 1 ,1,1).setValue(schemaMap['map'][object]['title']).setFontWeight("bold")
        sheet.getRange(depth +1,m + 1 ,1,1).setNote(schemaMap['map'][object]['description'])
       
        //We select the next entry from our array of colors
        color = colors.pop()
        sheet.getRange(depth+1,m+1,(maxDepth-depth) +1,(sheet.getLastColumn() - m)).setBackground(color)
        sheet.getRange(depth+1,m+1,(maxDepth-depth) +1,(sheet.getLastColumn() - m)).setBorder(true,true,true,true,true,true,color,SpreadsheetApp.BorderStyle.SOLID)
      }

      //Now we set up our validations    
      validationRange = sheet.getRange(maxDepth +2, m+1, sheet.getLastRow(),1)
      
      if(schemaMap['map'][mapHeaders[m]]['type']== 'number') {
       validationRange.setDataValidation(SpreadsheetApp.newDataValidation()
          .setAllowInvalid(true)
          .requireNumberBetween(-99999999, 999999999)
          .build());
      } 
    
      if(schemaMap['map'][mapHeaders[m]]['values']== 'date-time') {
       validationRange.setDataValidation(SpreadsheetApp.newDataValidation()
          .setAllowInvalid(true)
          .requireDate()
          .build());
      }
    
      if(schemaMap['map'][mapHeaders[m]]['values'] == 'uri') {
       validationRange.setDataValidation(SpreadsheetApp.newDataValidation()
          .setAllowInvalid(true)
          .requireTextIsUrl()
          .build());
      } 
    
      if(schemaMap['map'][mapHeaders[m]]['type'] == 'boolean') {
       validationRange.setDataValidation(SpreadsheetApp.newDataValidation()
          .setAllowInvalid(true)
          .requireCheckbox()
          .build());
      } 
    
    
      if(schemaMap['map'][mapHeaders[m]]['values'].indexOf('Codelist:') != -1) {
        var codelist = schemaMap['map'][mapHeaders[m]]['values'].replace("Codelist: ","").split(", ")
        validationRange.setDataValidation(SpreadsheetApp.newDataValidation()
          .setAllowInvalid(true)
          .requireValueInList(codelist, true)
          .build());
      }
  }
  
  //Now we add our row of column headers.
  var titleRow = sheet.getRange(maxDepth+1,1,1,mapHeaders.length).setValues([titles]).setFontWeights([fontArray])
  sheet.getRange(maxDepth+1,1,1,mapHeaders.length).setNotes([descriptions])
}

/*
* This function sets up column grouping
*/

function setupGroups(){
  var schemaMap = getSchemaMap('mapping')
  
  var sheet = SpreadsheetApp.getActiveSheet()
  var headers = sheet.getRange(1,1,1,sheet.getLastColumn()).getValues()[0]

  //Get a copy of the header row without /0/ notation
  var mapHeaders = headers.map(function(item) { return item.replace(/\/[0-9]/g,"") })
  //Reset all groupings
  sheet.getRange(1,1,1,sheet.getLastColumn()).shiftColumnGroupDepth(-10)
  
  var parent = ""

  //Iterate through at depth N
  
  
  //We iterate through to each new parent  
  //TODO - USE MAP HEADERS DEPTH OF THE PARENT TO WORK OUT WHAT WE SHOULD BE COMPARING - 
  // INSTEAD OF COMPARING TO THE END OF THE PATH STRING AS WE ARE AT PRESENT
  // Start at maxDepth. Go through until value at MaxDepth changes
  
  for(depth = 0; depth < schemaMap['maxDepth']; depth++) {
     for(p = 0; p < mapHeaders.length - 1; p++) {
        Logger.log(mapHeaders[p].split("/")[depth])
        // Check if we have two columns with the same value at this depth. If so, we want to group them, so we'll want to keep going until we find a different value
        if(mapHeaders[p].split("/")[depth] && !startCol && mapHeaders[p].split("/")[depth] == mapHeaders[p+1].split("/")[depth]) {
           var startCol = p
           var currentGroup = mapHeaders[p].split("/")[depth]
        }
        if(currentGroup && (currentGroup != mapHeaders[p+1].split("/")[depth])) {
           Logger.log(currentGroup + " runs from " + startCol + " to " + p) 
           sheet.getRange(1,startCol+2,1,p-startCol).shiftColumnGroupDepth(1)
           startCol = null
           currentGroup = null
        }
     }
  }  
}

/*
* This function creates a lookup for any Organization fields to the Organization table
*/
function addOrganizationLookup() {
   var schemaMap = getSchemaMap('mapping')
   var dataRowStartsAt = schemaMap['maxDepth'] + 2 
   var sheet = SpreadsheetApp.getActiveSheet()
   var headers = sheet.getRange(1,1,1,sheet.getLastColumn()).getValues()[0]

   //Get a copy of the header row without /0/ notation
   var mapHeaders = headers.map(function(item) { return item.replace(/\/[0-9]/g,"") })
  
for(i = 0; i < mapHeaders.length -1; i++) {
    path = mapHeaders[i]
    validationRange = sheet.getRange(dataRowStartsAt, i+1, sheet.getLastRow()-(dataRowStartsAt+1),1)

    
    if(path.indexOf('Organization/') !== -1) {
      field = path.split("Organization/").pop()
      if(field == 'name') {
         orgNameField = i;  
         validationRange.setDataValidation(SpreadsheetApp.newDataValidation()
            .setAllowInvalid(true)
            .requireValueInRange(sheet.getRange('Organizations!$A:$A'), true)
            .build());
      } else {
        sheet.getRange(dataRowStartsAt,i+1).setFormula('=IFERROR(VLOOKUP(indirect("R[0]C[' + (orgNameField - i) + ']",false),Organisations!$1:$1000,'+ getOrgLookupCol(field)+ '),"")');
        sourceRange = sheet.getRange(dataRowStartsAt,i+1)
        validationRange = sheet.getRange(dataRowStartsAt + 1,i+1,sheet.getLastRow()-(dataRowStartsAt + 1))
        sourceRange.copyTo(validationRange)

        formatRange = sheet.getRange(dataRowStartsAt,i,sheet.getLastRow()-(dataRowStartsAt))
        conditionalFormatRules = SpreadsheetApp.getActiveSheet().getConditionalFormatRules();
        conditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
        .setRanges([formatRange])
        .whenFormulaSatisfied('=AND(NOT('+ formatRange.getA1Notation() + '=""),isFormula(' + formatRange.getA1Notation() + '))')
        .setBackground('#f3f3f3')
        .setItalic(true)
        .build());
        SpreadsheetApp.getActiveSheet().setConditionalFormatRules(conditionalFormatRules);
      }
      
    }
  }   
}
    
function getOrgLookupCol(field) {
 orgsheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Organizations");
 orgHeadings = orgsheet.getRange(1,1,1,orgsheet.getLastColumn()).getValues();
 col = orgHeadings[0].indexOf(field)
 return col + 1
}