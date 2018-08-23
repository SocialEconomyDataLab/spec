# Template creation

We have created a set of Google Apps script functions that help with setting up spreadsheet input templates with friendly formatting.

The scripts are currently [held within this spreadsheet](https://docs.google.com/spreadsheets/d/1x9IHOCkm6jvjySM2ZXp03uXQa20wQbjxs2csfUCwl7s/edit#gid=755217583).

## Initial HowTo

(This needs to be improved with full instructions)

To create a template:

(1) Use [ocdskit](https://github.com/open-contracting/ocdskit) to generate a mapping sheet

`cat ../schema/schema.json | ocdskit mapping-sheet > mapping.csv`

(2) Add this to a Google Spreadsheet as a sheet named 'mapping'

(3) Generate a flat template using

`flatten-tool create-template --rollup -f csv -o csv -s ../schema/schema.json`

(4) Upload the resulting main.csv file to the spreadsheet

Add 200 or so rows to this sheet (as many as you want validation to be configured on) and make sure there is something in the final cell of column A.

(5) With the main.csv sheet selected, run the `layoutTemplate` and `setupGroups` functions from the Google Apps script


### Setting up organisation lookups

(1) Take one of the Organisation sections (e.g. recipientOrganization/) and paste into a sheet named 'Organization'

(2) Run `layoutTemplate` on this sheet

(3) Run a replace of 'recipientOrganization/' on this sheet with an empty string so the headers are now 'name','id' etc. instead of 'recipientOrganization/name', 'recipientOrganization/id' etc.


## Script development

### Requirements

Scripts can be managed locally using [google clasp](https://github.com/google/clasp). Follow the setup instructions for clasp to get started.

