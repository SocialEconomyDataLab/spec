# Codelists

Codelists provide codes and titles which ensure that data from different publishers can be made **comparabale** and **interoperable**.

There are two approaches to the use of codelists within the Specification: **open** and **closed** codelists.

* Open codelists provide a number of **suggested** values that will find matched usage across a wide range of publishers, but are ultimately not exhaustible. These codelists can therefore be extended by a publisher (or group of publishers) as needed by providing additional codes and titles.
* Closed codelists **limit** usage to those codes and titles in the pre-defined list. Though a closed codelist can be changed in future versions to include more codes, publishers can use only those values presented in the current version.

## Open codelists

### Activities
Describes the activities that an organisation undertakes, for example, the type of trading activities they engage in. These activities may or may not relate to the purposes of the deal investment.

```eval_rst
.. csv-table::
   :header-rows: 1
   :file: ../../schema/codelists/activities.csv
```

### Purpose
Describes how the investment will be used by the recipient organisation.

```eval_rst
.. csv-table::
   :header-rows: 1
   :file: ../../schema/codelists/purpose.csv
```

## Closed codelists
### Asset Lock
An asset lock is a legal clause that ensures that an organisations assets (retained surplus or residual value) are preserved for the benefit of the community or public, and cannot be appropriated for the personal gain of members or shareholders. An asset lock may be formally incorporated into the structure of an organisation according.

```eval_rst
.. csv-table::
   :header-rows: 1
   :file: ../../schema/codelists/assetLock.csv
```

### Loan Type
Describes the type of loan that forms part of a deal.

```eval_rst
.. csv-table::
   :header-rows: 1
   :file: ../../schema/codelists/loanType.csv
```

### Organisation Type
An organisation may be classified according to its type, which usually relates to its legal status. Some organisations may be registered with Companies House or with the Financial Conduct Authority, which would indicate their legal status.

```eval_rst
.. csv-table::
   :header-rows: 1
   :file: ../../schema/codelists/organizationType.csv
```

### Status
Describes the status of an investment.

```eval_rst
.. csv-table::
   :header-rows: 1
   :file: ../../schema/codelists/status.csv
```
