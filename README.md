## Project Background

Technical spec      |   Back-end track
Language            |   Node.js
Problem             |   **Exchange Rate**

### Requirement: 
1. Create a **service** that gives the 
    1. latest exchange rate
    2. historical exchange rate 
    for the currency
2. Please use **three tier network architecture** in this challenge.

## Solution
A Node.js application is created providing web-ui, and API service.

For web-ui, users can ask for 
> (1) latest exchange rate        at  /currency/current
> (2) historical exchange rate    at  /currency/historical

For API, users can ask for
> (1) latest exchange rate        at  /api/current/:from/:to
> (2) historical exchange rate    at  /api/historical/:from/:to/:date
> Please reference to `API Guide` section

## TODO

## API Guide