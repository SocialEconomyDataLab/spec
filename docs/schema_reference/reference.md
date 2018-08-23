# Schema reference

The Social Economy Data Lab Specification is maintained using [JSON Schema](http://json-schema.org). The Schema is the authoritative source for the specification, and defines the structure of an individual deal so that it can be annotated and validated.

When publishing an individual deal or a number of deals, these deals should be packaged into a single, valid JSON file.

These `field names` for properties are important for ensuring that data is published in a machine-readable format. The title gives a human-readable form, with information about each of the properties included in description.


## Structure

The [full structure of the JSON schema](../_static/docson/index.html#../../_static/schema.json$$expand) is show below. <script src="../_static/docson/widget.js" data-schema="../schema.json"> </script>

## Deal

```eval_rst

.. jsonschema:: ../../schema/schema.json
   :pointer: 
   :collapse: recipientOrganization,arrangingOrganization,offers,investments/grants,investments/equity,investments/credit,projects
```
 
## Offer

```eval_rst
.. json-value:: ../../schema/schema.json
   :pointer: /properties/offers/description

.. jsonschema:: ../../schema/schema.json
   :pointer: /definitions/Offer
```


## Grants


```eval_rst
.. json-value:: ../../schema/schema.json
   :pointer: /properties/investments/properties/grants/description

.. jsonschema:: ../../schema/schema.json
   :pointer: /definitions/Grant
   :collapse: fundingOrganization
```

 
## Credit

```eval_rst

.. json-value:: ../../schema/schema.json
   :pointer: /properties/investments/properties/credit/description

.. jsonschema:: ../../schema/schema.json
   :pointer: /definitions/Credit
   :collapse: fundingOrganization
```

## Equity

```eval_rst

.. json-value:: ../../schema/schema.json
   :pointer: /properties/investments/properties/equity/description

.. jsonschema:: ../../schema/schema.json
   :pointer: /definitions/Equity
   :collapse: fundingOrganization
```

## Organization

The organization object is based on the schema.org Organization and [PostalAddress](https://schema.org/PostalAddress) types, with the addition of fields for describing UK Charity and Company Numbers, and providing information on the type of structure of the organization. 

```eval_rst
.. jsonschema:: ../../schema/schema.json
   :pointer: /definitions/Organization
   :collapse: location
```

## Location

The location block provides a range of ways of expressing the location of an organization or project. Not all need to be used in every case. 

```eval_rst
.. jsonschema:: ../../schema/schema.json
   :pointer: /definitions/Location
   :collapse: 
```

## Interest Rate

```eval_rst
.. jsonschema:: ../../schema/schema.json
   :pointer: /definitions/InterestRate
   :collapse: 
```