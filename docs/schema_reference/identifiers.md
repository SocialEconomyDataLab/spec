# Identifiers

Identifiers are an important part of any dataset. They let a computer uniquely identify and refer to specific deals, organisations, geographical areas and so on.

<!--- TODO:
Ultimately, change the organisation in the example below to the Social Economy Civic Data Trust
--->
```eval_rst

.. admonition:: Why identifiers matter

  While a human being may be good at recognising that "POWER TO CHANGE", "Power to Change", and "power-to-change" all refer to the same organisation, computers find this a lot trickier. Machine-readability requires using a common marker to refer to the same entity and distinguish it from others, called an **identifier**.

```

The Social Investment Data Specification asks you to give identifiers to:

* [Deals](deal-identifier);  
* [Organisations](organisation-identifier);  
* Transactions;  
* and other unique elements in your data.  

## Identifier basics
### What is an identifier?
For identifiers to be useful, they should aim to be **unique** and **persistent**, so that they don't become confused with other identifiers and don't change unexpectedly.

You may already have identifiers in your own data. For example, a number for each application or financed deal that was created when you received the application or agreed the deal. These are **internal identifiers** which are useful as part of your published data.

*However*, because there might be an overlap between the internal identifiers that you use, and the internal identifiers that another funder uses, you will need to add a **prefix** to avoid this possible clash and ensure better interoperability.

But, in preference to internal identifiers are **commonly-used identifiers** from maintained registers, which provide a ready-made alternative that supports joined-up data and make analysis more complete. Most organisations will be registered on some sort of official register (such as Companies House) and this makes the job of adding commonly-used unique and persistent identifiers easier.

### Prefixes
Because more than one publisher may happen to use the same internal identifier to refer to different organisations or deals that they both hold information for, prefixes are important in helping to tell them apart when it comes to joining up datasets from many publishers by adding an extra element of "uniqueness" to an identifier.

So while '10001' is not a particularly unique identifier for a deal, a version which combines a publisher prefix with the internal number is e.g. ``ABC-10001``.

```eval_rst
.. _deal-identifier:
```
## Deal identifier
To create deal identifiers:

```eval_rst
.. _organisation-identifier:
```
## Organisation identifier
Most organisations have some sort of official registration number that can be used to uniquely identify them and to look up their details from an official register or public list.

There are two parts to an organisation identifier:

* **A list code** prefix that describes the list the identifier is taken from
* **An identifier** taken from that list.

```eval_rst
.. admonition:: For example

  A funding organisation registered in England and Wales to the Charity Commission of England and Wales with the charity number ``1159982`` will use the prefix ``GB-CHC``, which is the **list code** for the charity register.

  This gives the unique **organisation identifier** of ``GB-CHC-1159982``. This makes sure it is distinguished from any other list with the same code in it.
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
The following identifier lists are often used in Social Investment Data Standard publication:
* [GB-COH](http://org-id.guide/list/GB-COH) - UK Company Number
* [GB-CHC](http://org-id.guide/list/GB-CHC) (England and Wales), [GB-SC](http://org-id.guide/list/GB-SC) (Scotland), [GB-NIC](http://org-id.guide/list/GB-NIC) (Northern Ireland) - Charity Numbers
* [GB-MPR](http://org-id.guide/list/GB-MPR) - Mutuals Public Register
* [GB-LAE](http://org-id.guide/list/GB-LAE) (England), [GB-LAS](http://org-id.guide/list/GB-LAS) (Scotland), [GB-PLA](http://org-id.guide/list/GB-PLA) (Wales)  - Local authorities

The list is in a general order of priority. If it is possible to use a Company Number, this would be preferred to using a Charity Number. If an organisation appears on the Mutuals Public Register, it is also likely to have a Company Number, which would also be preferred.

If you have a registered number from some other scheme, including overseas registrars, check the [org-id.guide](http://org-id.guide/) for a code to use. If the code you need is not listed, contact the support team.

### Creating internal identifiers
If you do not have any commonly used codes for an organisation, then using internal identifiers in such a way that they can be uniquely distinguished from other published data is the way forward.

* Use your publisher prefix and any internal identifier you have for this organisation in the format {publisher prefix}-{internal identifier}, e.g. `ABC-123456`.

* If you use a database that records details of organisations in a separate lookup table, this may provide an persistent identifier you can use.

* If you only record data in a spreadsheet, and don't assign organisations an identifier of any sort, you could use a spreadsheet formula to turn the organisation name into an identifier (e.g. removing spaces and lowercasing the name) in the format {publisher prefix}-{internal identifier}, e.g. `ABC-organisationname`.
