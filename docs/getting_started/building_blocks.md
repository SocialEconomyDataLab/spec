# Building blocks

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
    * A £20,000 **loan** from a funding organisation, to be repaid over 10 years at 4.5% interest.

  Example 2. A social investment deal worth £35,000 is made up of:  
    * £15,000 of share capital raised by the recipient organisation through **equity** from a community shares offer; plus,
    * a £15,000 match-funded **equity** invested *pari passu* in the same community shares offer by a funding organisation; and,  
    * a £5,000 business development **grant** from another funding organisation.  

  Example 3. A social investment deal worth £50,000 is made up of:  
    * a £10,000 **grant** from Funder A, which has been used as leverage for:  
    * a £40,000 **loan** from Funder B, repaid over 5 years at 3% interest.  

```
### Organisations

A deal is entered into by a number of parties, typically the **funding** organisation (or organisations, one of whom may be an **arranging** organisation) and the **recipient** organisation (or organisations).

Each of the funding organisations provide one or more elements of the deal's financial elements. The equity element may be provided by a number of different organisations. Some deals may have a principal partner who takes the role of arranging the deal.

Recipient organisations receive the finance and are typically responsible for ensuring that any terms (such as repayment) are met, though it may be backed by another party.

### Purpose

Recipient organisations have at their core a social mission. They make use of social investment, and other forms of finance, to ensure that they are able to carry out activities that serve this mission.

Usually, in seeking a social investment deal, recipients have a **purpose** in mind. It may be that they are a community business requiring significant equity capital in order to purchase premises in order to start trading, or it may be that they require loan financing in order to pay suppliers and ensure that they are able to grow.

### Transactions
