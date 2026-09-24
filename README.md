# Unit tests for registration form and Roman numeral converter

This project is more practice for unit tests using the [Jest testing framework](https://jestjs.io/). The tests for user registration forms are a combination of a previous project and verify both password and emails meet the criteria. The other test is made to verify that a Roman numeral converter gives valid results.

## User registration form tests

The two parameters needing to be verified are emailValid and passwordValid. The first determines if an email input is a valid email address (based on a beautifully horrible regular expression). The second determines if a password input meets the following criteria: contains at least, 8 characters, one lowercase letter, one uppercase letter, one numerical digit, one symbol (!@#$%^&*) and does not contain invalid characters (spaces and other symbols not listed).

The tests were designed to include multiple test-cases for each different aspects of the parameters. Similarly the error message changes appropriately for different kinds of failures. 

## Tests for Roman numeral converter

These tests are made to validate the results of a Roman numeral converter which can convert standard Arabic numbers to both old and new Roman numerals (old Roman numerals are strictly addition eg. 4 is IIII). the tests were designed to test correct output along with general functionality.
