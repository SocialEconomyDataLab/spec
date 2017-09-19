# Identifiers

```eval_rst

.. admonition:: Why identifiers matter

  Identifiers are an important part of any dataset. They let a computer uniquely identify and refer to specific deals, organisations, geographical areas and so-on.

  While a human being may be good at recognising that "POWER TO CHANGE", "Power to Change", and "power-to-change" all refer to the same organisation, computers find this a lot trickier.

```

The Social Investment Data Specification asks you to give identifiers to:

* [Deals](deal-identifier);  
* [Organisations](organisation-identifier);  
* Transactions;  
* and other unique elements in your data.  

## Identifier basics
### What is an identifier?
An identifier is a unique code that

You may already have identifiers in your own data. For example, an number for each application or financed deal that was created when you received the application or agreed the deal. These are **internal identifiers** which are useful as part of your published data.

*However*, because there might be an overlap between the internal identifiers that you use, and the internal identifiers that another funder uses, you will need to add a **prefix** to avoid this possible clash.

### Prefixes


```eval_rst
.. _deal-identifier:
```
## Deal identifier
To create deal identifiers:


```eval_rst
.. _organisation-identifier:
```
## Organisation identifier
Most organisations have some sort of official registration number that can be used to uniquely identify them and to look up their details from an official registers or public list.

There are two parts to an organisation identifier:

* **A list code** prefix that describes the list the identifier is taken from
* **An identifier** taken from that list.

```eval_rst

.. admonition:: For example

  A funding organisation registered in England and Wales to the Charity Commission of England and Wales with the charity number '1159982' will use the prefix ``GB-CHC``.

  This gives the unique organisation identifier of ``GB-CHC-1159982``.

```

### Choose the best identifier

Some organisations have more than one identifier: they might be a charity **and** a company (charitable companies), or a charity **and** an educational establishment.

In these cases, it's important to know which identifier to pick so that users of data have the best possible chance of understanding that two grants have been made to the same organisation.

[org-id.guide](http://org-id.guide) ranks identifier lists by relevance and quality to help you pick the best identifier.

```eval_rst

.. hint:: Relevance and quality defined:

  * **Relevance**: are you likely to find the organisation you are looking for in this list?
  * **Quality**: are the identifiers in this list stable and linked to open, accessible contextual data, and can they be easily mapped to other identifiers.
```

Search on [org-id.guide](http://org-id.guide) for identifier sources for [UK organisations](http://org-id.guide/?structure=&coverage=GB&subnational=&sector=), [UK charities](http://org-id.guide/?structure=charity&coverage=GB&sector=), or [any other organisation type](http://org-id.guide/).

### Commonly used identifier lists

The following identifier lists are often used in Social Investment Data Standard publication. They are listed here in rough order of priority (e.g. if you already know the company number, use this in preference to the charity number).

* [GB-COH](http://org-id.guide/list/GB-COH) - UK Company Number
* [GB-CHC](http://org-id.guide/list/GB-CHC) (England and Wales), [GB-SC](http://org-id.guide/list/GB-SC) (Scotland), [GB-NIC](http://org-id.guide/list/GB-NIC) (Northern Ireland) - Charity Numbers
* [GB-EDU](http://org-id.guide/list/GB-EDU) and [GB-UKPRN](http://org-id.guide/list/GB-UKPRN) - Education establishments
* [GB-LAE](http://org-id.guide/list/GB-LAE) (England), [GB-LAS](http://org-id.guide/list/GB-LAS) (Scotland), [GB-PLA](http://org-id.guide/list/GB-PLA) (Wales)  - Local authorities

If you have a registered number from some other scheme, including overseas registrars, check the [org-id List Locator](http://org-id.guide/) for a Registration Agency Code to use. If the Registration Agency Code you need is not listed, contact the support team.

If you do not have any external registration numbers for the organisation, use your organisation prefix and any internal identifier you have for this organisation.

If you use a database that records details of organisations in a separate lookup table, this may provide an identifier you can use.

If you only record data in a spreadsheet, and don't assign organisations an ID, you could use a spreadsheet formula to turn the organisation name into an identifier (e.g. removing spaces and lowercasing the name). The support team can provide guidance on this.
