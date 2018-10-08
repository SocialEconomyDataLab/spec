"""
A helper script for schema development. Extracts codelists from enum sections.
"""

import json
import csv

def walk(source): 
    for leaf in list(source):
        if 'enum' in source[leaf].keys():
            if 'codelist' in source[leaf].keys():
                output = []
                with open("codelists/"+ source[leaf]['codelist'],"w") as codelistcsv:
                    writer = csv.DictWriter(codelistcsv, fieldnames=['Code','Title','Description'])
                    writer.writeheader()
                    for i in range(len(source[leaf]['enum'])):
                        writer.writerow({'Code':source[leaf]['enum'][i],
                                          'Title':source[leaf].get('enum_titles',[None]*len(source[leaf]['enum']))[i],
                                          'Description':source[leaf].get('enum_descriptions',[None]*len(source[leaf]['enum']))[i],})
            else:
                print("No codelist for enum list" + str(source[leaf]['enum']))

        if 'properties' in source[leaf].keys():
            walk(source[leaf]['properties'])
        if 'items' in source[leaf].keys():
            if 'properties' in source[leaf]['items'].keys():
                walk(source[leaf]['items']['properties'])

with open('schema.json','r') as schemaFile :
    schema = json.loads(schemaFile.read())
    walk(schema['properties'])
    walk(schema['definitions'])