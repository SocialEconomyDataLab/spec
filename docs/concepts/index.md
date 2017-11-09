Getting Started
========
## What is social investment?
Broadly, it is the investment of money with the aim of providing a social benefit as well as an economic return.

Social investors usually provide finance to not-for-profit or impact-focused organisations, such as charities, social enterprises, community businesses and co-operatives.

Social benefits could include the creation of jobs in an economically disadvantaged area, provision of third-sector healthcare services to those in need, or producing goods with a limited negative impact on the environment. Forms of social finance can include lending, share equity, crowdfunding and social impact bonds.

The Social Investment Data Labs Specification does not strictly define what qualifies as social investment.

## Building blocks

A Social Investment Data Labs Specification document is made up of a number of sections which detail the entities that can be described using the specification, and the properties it recognises.

The fundamental building block of the Social Investment Data Labs Specification is a **deal**. Deals have a number of direct properties and a number of related entities, including the organisations involved, classifications, financing and transactions, which in turn have properties.

For a full list of properties and entities referred to by the specification, read the Schema.

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
