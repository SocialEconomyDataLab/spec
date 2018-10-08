# Schema reference

The Social Economy Data Lab Specification is maintained using [JSON Schema](http://json-schema.org). The Schema is the authoritative source for the specification, and defines the structure of an individual deal so that it can be annotated and validated.

When publishing an individual deal or a number of deals, these deals should be packaged into a single, valid JSON file in an array of `deals`. 

These `field names` for properties are important for ensuring that data is published in a machine-readable format. The title gives a human-readable form, with information about each of the properties included in description.

## Structure

Each entry in SEDL is structured as a deal, consisting of one or more offers, projects and investments. In some cases, a deal will contain just a single project and investment. In other cases, a large number of the available one-to-many relationships will be required.

* Deals
  * Recipient Organisation & Arranging Organisation
  * Offers
  * Project
    * Assets
    * Locations
  * Investments
    * Grant
    * Equity
    * Credit

## Sections

### Deal

```eval_rst

.. jsonschema:: ../../schema/schema.json
   :pointer: 
   :collapse: recipientOrganization,arrangingOrganization,offers,investments/grants,investments/equity,investments/credit,projects
```
 
### Offer

```eval_rst
.. json-value:: ../../schema/schema.json
   :pointer: /properties/offers/description

.. jsonschema:: ../../schema/schema.json
   :pointer: /definitions/Offer
```

### Project

```eval_rst
.. json-value:: ../../schema/schema.json
   :pointer: /properties/projects/description

.. jsonschema:: ../../schema/schema.json
   :pointer: /definitions/Project
```


### Grant


```eval_rst
.. json-value:: ../../schema/schema.json
   :pointer: /properties/investments/properties/grants/description

.. jsonschema:: ../../schema/schema.json
   :pointer: /definitions/Grant
   :collapse: fundingOrganization
```

 
### Credit

```eval_rst

.. json-value:: ../../schema/schema.json
   :pointer: /properties/investments/properties/credit/description

.. jsonschema:: ../../schema/schema.json
   :pointer: /definitions/Credit
   :collapse: fundingOrganization
```

### Equity

```eval_rst

.. json-value:: ../../schema/schema.json
   :pointer: /properties/investments/properties/equity/description

.. jsonschema:: ../../schema/schema.json
   :pointer: /definitions/Equity
   :collapse: fundingOrganization
```

### Organization

The organization object is based on the schema.org Organization and [PostalAddress](https://schema.org/PostalAddress) types, with the addition of fields for describing UK Charity and Company Numbers, and providing information on the type of structure of the organization. 

```eval_rst
.. jsonschema:: ../../schema/schema.json
   :pointer: /definitions/Organization
   :collapse: location
```

### Location

The location block provides a range of ways of expressing the location of an organization or project. Not all need to be used in every case. 

```eval_rst
.. jsonschema:: ../../schema/schema.json
   :pointer: /definitions/Location
   :collapse: 
```

### Interest Rate

```eval_rst
.. jsonschema:: ../../schema/schema.json
   :pointer: /definitions/InterestRate
   :collapse: 
```

## Codelists

A codelist consists of:

* **A code**. A code should always be written in data in exactly the way it is given here. We use a mix of English language words, camelCase strings, and symbols (e.g. GBP for Great British Pound Stering, or £). We have chosen codes assuming that in some spreadsheet data entry approaches, codes may be displayed directly to users, and as such, they should be reasonably intelligible. In one case (organizationType) the codes therefore include both a symbol and an extended label. Consuming applications may wish to strip the second part of these strings when processing the data. 

* **A title**. These are the labels that should be displayed in a user interface whenever possible. Titles may be translated and displayed in different languages if required. 

* **A description**. This provides details on when the code should be used. Not all our codes have descriptions at present.

### AssetStatus

```eval_rst

   .. csv-table::
      :header-rows: 1
      :class: codelist-table
      :file: ../../schema/codelists/assetStatus.csv

```

### AssetType


```eval_rst

   .. csv-table::
      :header-rows: 1
      :class: codelist-table
      :file: ../../schema/codelists/assetType.csv

```

### ClassificationScheme


```eval_rst

   .. csv-table::
      :header-rows: 1
      :class: codelist-table
      :file: ../../schema/codelists/classificationScheme.csv

```

### EquityType


```eval_rst

   .. csv-table::
      :header-rows: 1
      :class: codelist-table
      :file: ../../schema/codelists/equityType.csv

```

### InterestRate


```eval_rst

   .. csv-table::
      :header-rows: 1
      :class: codelist-table
      :file: ../../schema/codelists/interestRate.csv

```

### InvestmentPurpose


```eval_rst

   .. csv-table::
      :header-rows: 1
      :class: codelist-table
      :file: ../../schema/codelists/investmentPurpose.csv

```

### InvestmentStatus


```eval_rst

   .. csv-table::
      :header-rows: 1
      :class: codelist-table
      :file: ../../schema/codelists/investmentStatus.csv

```

### MatchFundingStatus


```eval_rst

   .. csv-table::
      :header-rows: 1
      :class: codelist-table
      :file: ../../schema/codelists/matchFundingStatus.csv

```

### OfferType


```eval_rst

   .. csv-table::
      :header-rows: 1
      :class: codelist-table
      :file: ../../schema/codelists/offerType.csv

```

### OrganizationType


```eval_rst

   .. csv-table::
      :header-rows: 1
      :class: codelist-table
      :file: ../../schema/codelists/organizationType.csv

```

### ProjectStatus


```eval_rst

   .. csv-table::
      :header-rows: 1
      :class: codelist-table
      :file: ../../schema/codelists/projectStatus.csv

```

### Status


```eval_rst

   .. csv-table::
      :header-rows: 1
      :class: codelist-table
      :file: ../../schema/codelists/status.csv

```

### TaxRelief


```eval_rst

   .. csv-table::
      :header-rows: 1
      :class: codelist-table
      :file: ../../schema/codelists/taxRelief.csv

```

### TaxReliefStatus


```eval_rst

   .. csv-table::
      :header-rows: 1
      :class: codelist-table
      :file: ../../schema/codelists/taxReliefStatus.csv

```

### ValuationMethod


```eval_rst

   .. csv-table::
      :header-rows: 1
      :class: codelist-table
      :file: ../../schema/codelists/valuationMethod.csv

```