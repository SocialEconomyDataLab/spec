Getting Started
========
The Social Investment Data Lab Specification defines the definitions, data models and guidance required to make data on social investment interoperable.

The Specification is being designed to help people and organisations who want to:
* Encourage **increased transparency** and **sharing of data** on social investment
* Support **mass collaboration** around data
* Make two different systems **talk to one another**
* **Collect and analyse** data from many different places

The Specification comprises:
* **This Documentation**, which describes the elements of the Specification, and gives guidance on how data can be published in the correct format.
* **The** [Schema](schema), which is a technical description of the fields that are included in the Specification, and is a developer-friendly structure for working with published data based on JSON Schema.
* **Codelists**: lists of classifications used to categorise data.

## What qualifies as social investment?
The Social Investment Data Lab Specification doesn’t seek to impose a strict definition of social investment that published data should meet. That decision can be made by the data holders themselves.

Participants in the social investment market may have different concepts of what can be considered as social investment, or ‘true’ social investment.

A broad understanding is, however, useful as a point of reference. The suggested definition is agnostic about who the investing and recipient organisations are, with the focus instead being on the purpose of the investment itself.

```eval_rst

.. admonition:: Social Investment

  The **investment** of money with the expectation that a **social benefit** as well as an **economic return** will be gained.

```

This differs from conventional investment in that it is anticipated that a social benefit will be realised through the use of the money. It also differs from philanthropically-motivated grantmaking as an economic return is expected. The economic return does not necessarily have to be profitable, and could be simply expected to cover the cost of the initial outlay.

Social investment, therefore, does not have to be socially-motivated. It may be the case that the investor’s motivation is simply to gain an economic return (e.g. in the case of mainstream financial institutions), with the investee’s motivation in accessing the finance being guided by the aim of delivering a social benefit. 

## Building blocks

A Social Investment Data Lab Specification document is made up of a number of sections which detail the entities that can be described using the specification, and the properties it recognises.

The fundamental building block of the Social Investment Data Lab Specification is a **deal**. Deals have a number of direct properties and a number of related entities, including the organisations involved, classifications, financing and transactions, which in turn have properties.

For a full list of properties and entities referred to by the specification, read the [Schema](schema).

### Financial elements
Deals may comprise one or more forms of finance, typically a **grant**, a **loan**, and/or **equity**.

Grants are a form of non-repayable finance, while loans and equity are usually paid back by the recipient, often with interest and/or dividends.

Deals with multiple elements of repayable and non-repayable finance are sometimes referred to as "blended finance".

```eval_rst

.. admonition:: For example

  Example 1. A social investment deal worth £20,000 made up of one element:  
    * A £20,000 loan from a funding organsiation, to be repaid over 10 years at 4.5% interest.

  Example 2. A social investment deal worth £35,000 is made up of:  
    * £15,000 of share capital raised by the recipient organisation through equity from a community shares offer; and,
    * a £15,000 match funded equity invested *pari passu* in the same community shares offer by the funding organisation.  
    * a £5,000 business development grant from a funding organisation.  

  Example 3. A social investment deal worth £50,000 is made up of:  
    * a £10,000 grant from Funder A, which has been used as leverage for  
    * a £40,000 loan from Funder B, repaid over 5 years at 3% interest.  

```
### Organisations, people and beneficiaries  

A deal is entered into by a number of parties, typically the **funding** organisation (or organisations, one of whom is the **arranging** organisation) and the **recipient** organisation (or organisations).

Each of the funding organisations provide one or more elements of the deal's finance, and the equity element may be provided by a large number of organisations and individual **people** (for example, a community shares issue).

While it is possible to uniquely [identify](../identifiers) most organisations, identifying individual people who have made investments would probably break data privacy laws (not to mention the amount of effort it would take to do so).

### Classifications

### Transactions
