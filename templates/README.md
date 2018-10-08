# Template creation

We have created a set of Google Apps script functions that help with setting up spreadsheet input templates with friendly formatting.

A version of the scripts should be held within each template spreadsheet. The templates are [available in Google Drive here](https://drive.google.com/drive/folders/1vHFE2LXoX_a-vghWWZfAMO0xnTXq-osv).

## Creating a new template

(1) Create a new spreadsheet in Google Drive by uploading a copy of Meta.csv 

This is modelled on [Meta Tab](https://www.metatab.org/) and the 360 Giving approach to embedded meta-data. 

Remove columns and rows that are not needed from the Meta tab.

The `#,HeaderRows 6` directive at the top tells flatten-tool and other software that in the main sheets there will be 6 rows of header information. If the final generated template has a different number of header rows, this should be updated. 

(1) Use [ocdskit](https://github.com/open-contracting/ocdskit) to generate a mapping sheet

`cat ../schema/schema.json | ocdskit mapping-sheet | sed 's/section,path/#,ignore/g' > mapping.csv` 

Then generate and append organization mapping data with:

`csvgrep -c 2 -m "recipientOrganization" mapping.csv | sed "s/recipientOrganization\///g" | sed "s/recipientOrganization//g" | tail -n +4 | sed '$ d' >> mapping.csv`

We use `sed` in this command to replace the first two cells of the sheet with `#,ignore` so that flatten-tool will ignore this sheet in future. 

> Note: In an ideal set-up we would read information direct from JSON Schema, but as this would require writing scripts to handle ref resolution etc., we use the mapping output of ocdskit as an intermediate format. 

(3) Upload this to the Google Spreadsheet as a sheet named 'mapping' using 'File -> Import' and choosing 'Insert new sheet'

(4) Generate a flat template using

`flatten-tool create-template --rollup -f csv -o csv -s ../schema/schema.json`

(5) Upload the resulting 'main.csv' file to the spreadsheet using 'File -> Import' and choosing 'Insert new sheet'

Add 200 or so rows to this sheet (as many as you want validation to be configured on) and make sure there is a value in the final cell of column A.

Rename this sheet to 'Deals'

(6) Install the scripts into this template by:

(This requires [google clasp](https://github.com/google/clasp) to be installed and authenticated)

* Go to Tools -> Script Editor
* Go to 'File -> Project Properties' to get the 'Script ID'. If prompted, name the script 'Template scripts'
* Update the script id in `scripts/.clasp.json`
* From the `scripts/` directory run `clasp push`
* Close and re-open the script editor

(7) With the 'Main' sheet selected, run the `layoutTemplate` and `setupGroups` functions from the Google Apps script

Set the group +/- to appear on the left. 


### Setting up organisation lookups (DRAFT)

(1) Run the command below to create Organizations.csv (from the mapping template) and upload this into the sheet. 

`csvgrep -c 2 -m "recipientOrganization" mapping.csv | csvcut -c 2 | sed "s/recipientOrganization\///g" | uniq | sed -e :a -e '$!N; s/\n/,/; ta' | csvcut -C ignore,recipientOrganization > Organizations.csv`

(2) Run `layoutTemplate` on this sheet

(4) Return to the deals sheet and run 'addOrganizationLookup' 

This will turn all organization name columns into a lookup list, and will set up Vlookup formula to automatically populate the deal organisation identifier from the Organization sheet. 

## Script development

### Requirements

Scripts can be managed locally using [google clasp](https://github.com/google/clasp). Follow the setup instructions for clasp to get started.

