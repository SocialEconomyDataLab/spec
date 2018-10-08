"""
A helper script for schema development. Extracts codelists from enum sections.
"""

import json
import csv
from compiletojsonschema.compiletojsonschema import CompileToJsonSchema

def writeCodelist(source):
    with open("codelists/"+ source['codelist'],"w") as codelistcsv:
        writer = csv.DictWriter(codelistcsv, fieldnames=['Code','Title','Description'])
        writer.writeheader()
        for i in range(len(source['enum'])):
            writer.writerow({'Code':source['enum'][i],
                              'Title':source.get('enum_titles',[None]*len(source['enum']))[i],
                              'Description':source.get('enum_descriptions',[None]*len(source['enum']))[i],})


def walk(source): 
    for leaf in list(source):
        if 'enum' in source[leaf].keys():
            if 'codelist' in source[leaf].keys():
                writeCodelist(source[leaf])
            else:
                print("No codelist for enum list" + str(source[leaf]['enum']))

        if 'properties' in source[leaf].keys():
            walk(source[leaf]['properties'])
        if 'items' in source[leaf].keys():

            try:
                if 'enum' in source[leaf]['items'].keys():
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
                    
            except:
                pass
            if 'properties' in source[leaf]['items'].keys():
                walk(source[leaf]['items']['properties'])

with open('schema.json','r') as schemaFile :
    
    compiler = CompileToJsonSchema('schema.json')
    schema = compiler.get()
    walk(schema['properties'])
    walk(schema['definitions'])
    writeCodelist(schema['definitions']['InvestmentPurpose']['items'])