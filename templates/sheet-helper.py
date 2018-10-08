"""
At present this script is used to move columns when required - as a manual script.

It may be developed in future to further automate the set-up of templates.

Expects:

- spreadsheetID
- sheet name
- origin column group, first header
- origin column group, last header
- destination position, insert before header


"""

from __future__ import print_function
from googleapiclient.discovery import build
from httplib2 import Http
from oauth2client import file, client, tools

# If modifying these scopes, delete the file token.json.
SCOPES = 'https://www.googleapis.com/auth/spreadsheets'

# The ID and range of a sample spreadsheet.
SAMPLE_SPREADSHEET_ID = '1REEwFDG3fCbWfJFoAj4FsKw_M17mWkZTzBAYLCEeodos'
SAMPLE_RANGE_NAME = 'Deals!A2:E'

def moveColumns(spreadsheetID, sheetName, sheetID, originStart, originEnd, insertBefore):
    """
    Helps to move columns from one place to another.

    Useful when modifying templates to particular users
    """
    store = file.Storage('token.json')
    creds = store.get()
    if not creds or creds.invalid:
        flow = client.flow_from_clientsecrets('credentials.json', SCOPES)
        creds = tools.run_flow(flow, store)
    service = build('sheets', 'v4', http=creds.authorize(Http()))

    # Get the header row
    result = service.spreadsheets().values().get(spreadsheetId=spreadsheetID,
                                                range=sheetName + "!1:1").execute()
    
    headers = result.get('values', [])[0]

    startCol = headers.index(originStart) 
    endCol = headers.index(originEnd) + 1
    destCol = headers.index(insertBefore) 

    print([startCol,headers[startCol],endCol,headers[endCol],destCol,headers[destCol]])


    requests = []
    requests.append({
            "moveDimension": {
            "source": {
              "sheetId": sheetID,
              "dimension": "COLUMNS",
              "startIndex": startCol,
              "endIndex": endCol
            },
            "destinationIndex": destCol
          }
        })
    body = {
        'requests': requests
    }

    response = service.spreadsheets().batchUpdate(
        spreadsheetId=spreadsheetID,
        body=body).execute()

    print(response)

if __name__ == '__main__':
    moveColumns('1S_uhV2j7q7q4F_rDxlBZTJiiVmbY_20JfSU2fNKgDZs', 'Deals', '1380427983', 'projects/0/id', 'projects/0/assets/0/referenceNumbers','id')
    moveColumns('1S_uhV2j7q7q4F_rDxlBZTJiiVmbY_20JfSU2fNKgDZs', 'Deals', '1380427983', 'recipientOrganization/name', 'recipientOrganization/dateModified','id')