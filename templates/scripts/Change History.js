var dataRowStartsAt = 7;
var headerRowAt = 1;
var variationHeaderRowAt = 1;

//Temp
function reset() {
  var cache = CacheService.getDocumentCache();
  cache.remove("variationActive")
     cache.remove("variationRow")
     cache.remove("variationBefore") 
     
  Logger.log(createMap(headerRowAt,6))
}

/*
* Create a key-pair object using the paths row and a data row
*
*/
function createMap(headerRow,dataRow) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var header = sheet.getRange(headerRow,1,1,sheet.getLastColumn()).getValues()[0];
  var data= sheet.getRange(dataRow,1,1,sheet.getLastColumn()).getValues()[0];
  
  var map = {};
  for (var i = 0; i < header.length; i++) {
    map[header[i]] = data[i];
  }
  return map
}

/*
* Sets the range to capture variations from
*
*/
function startVariation() {
 var cache = CacheService.getDocumentCache();
  
  if(!cache.get("variationActive")) {
     var sheet = SpreadsheetApp.getActiveSheet()
     var row = sheet.getActiveCell().getRowIndex()
     var variationRange = sheet.getRange(row,1,1,sheet.getLastColumn())
     variationRange.setBorder(true, true, true, true, null, null, '#980000', SpreadsheetApp.BorderStyle.SOLID_THICK);
     
     var variationMap = createMap(headerRowAt,row)

     cache.put("variationActive", true)
     cache.put("variationRow",row)
     cache.put("variationBefore",JSON.stringify(variationMap))
  } else {
     Browser.msgBox('A variation is currently active. End it first.')  
  }
  
}

/*
* Ends a variation, by looking for what has changed
* 
* TODO: Think about how this works for changing identifiers (?)
*/ 

function endVariation() {
  var cache = CacheService.getDocumentCache();
  
  if(cache.get("variationActive")) { 
     var sheet = SpreadsheetApp.getActiveSheet()
     var row = cache.get("variationRow") || dataRowStartsAt 
     var variationRange = sheet.getRange(row,1,1,sheet.getLastColumn())
     var variationBefore = JSON.parse(cache.get("variationBefore"))
     var variationAfter = JSON.parse(JSON.stringify(createMap(headerRowAt,row)))

     //We build an object of what has changed
     changed = {}
     for(var i in variationBefore) {
       if(!(variationBefore[i] == variationAfter[i]))  {
         // Add the before and after fields to our changed object
         changed['variations/0/change/' + i + "/before"] = variationBefore[i]
         changed['variations/0/change/' + i + "/after"] = variationAfter[i]
         
         // Now check if we need to include any parent identifiers and set these
         var parts = i.split("/")
         for(p = 0; p <= (parts.length + 1); p++) {
            parts.pop()
            var idPath = parts.join("/") + "/identifier"
            // If a suitable identifier field exists, use it. 
            // Right now we use the identifier from after
            // TODO: We should warn if identifiers have changed
            if(variationAfter[idPath]) {
              changed['variations/0/change/' + idPath] = variationAfter[idPath]
            }  
         }
                        
       }
     }
    Logger.log(changed)
    if(Object.keys(changed).length) { 
      changed['identifier'] = variationBefore['identifier']
      var date = Browser.inputBox('Saving variation','Please enter the effective date for this variation',Browser.Buttons.OK_CANCEL);
      var reason = Browser.inputBox('Saving variation','Please enter the reason for this variation',Browser.Buttons.OK_CANCEL)
      var description = Browser.inputBox('Saving variation','Please enter a short free text description of this variation',Browser.Buttons.OK_CANCEL)
      
      changed['date'] = date
      changed['reason'] = reason
      changed['description'] = description
      
      //Now we want to write things out to the variations sheet
      //The current draft approach here DOES NOT capture IDs of objects. But we will need to do that!
  
      var varSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Variations")
      var varHeader = varSheet.getRange(variationHeaderRowAt,1,1,varSheet.getLastColumn()).getValues()[0]
      
      //Create an empty row for our output
      var outRow = new Array(varHeader.length)
      for(b = 0; b < outRow.length; b++) {
         outRow[b] = "" 
      }
      
      // We iterate through the columns, checking if the column already existings in the variations sheet
      // If it does not, we push a new column onto the end, and add the value into the output array too. 
      // Then, when we're done, we update the header row. 
      for(var changedCol in changed) {
        if(varHeader.indexOf(changedCol) != -1) {
          outRow[varHeader.indexOf(changedCol)] = changed[changedCol]
        } else {
          varSheet.insertColumnAfter(varSheet.getLastColumn())
          varHeader.push(changedCol)
          outRow.push(changed[changedCol])
        }
      }
      Logger.log(changed)
      Logger.log(outRow)
      Logger.log(varHeader)
      
      varSheet.appendRow(outRow)
      varSheet.getRange(variationHeaderRowAt,1,1,varSheet.getLastColumn()).setValues([varHeader])
  
    } else {
     Browser.msgBox("No changes were found in the variation range")     
    }
      variationRange.setBorder(false, false, false, false, null, null)
      cache.remove("variationActive")
      cache.remove("variationRow")
      cache.remove("variationBefore")
    
  } else {
     //No variation was active. Should we tell the user? 
    
  }
    
}

