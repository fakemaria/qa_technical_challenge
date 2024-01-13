# FCM Digital - QA Technical challenge
Welcome to the FCM Digital QA team technical challenge, the objective of this challenge is to learn more about the way you work. There is no single solution, so don't worry, just do the best you can. 

## Challenge information
You will have to create a fork of this repository on which you will work. Once you complete the challenge, you will contact us via email and we will proceed to review it.

## Goals
Given some user stories witch their acceptance criterias:
 1. Write the test cases in the README.md file, [Test Cases](#test-cases) section.
 2. Create a project using YARN.
 3. Install Cypress using YARN.
 4. Implement in Cypress as many tests as test cases have been defined to be validated automatically. Upload to your fork all the code structure needed to run the tests as well as the instructions so that they can be easily executed (write the instructions on the README.md file, [How to Run the Tests](#how-to-run-the-tests) section).
 5. Write the git commands used during the challenge in the README.md file, [Git Commands](#git-commands) section.
 6. Write down the problems you have encountered during the challenge in the README.md file, [Problems](#problems) section.

# Challenge
## Challenge URL
https://www.saucedemo.com

## User Story 1
As a Swag Labs admin, I need to access/logout the platform with the 4 different user types.

## Acceptance Criterias 1
Ensure the Swag Labs admins are able to:
1. Log in/Log out to Swag Labs (standard_user)
2. Not logging in to Swag Labs and getting an error (locked_out_user)
3. Log in/Log out to Swag Labs (problem_user)
4. Log in/Log out to Swag Labs (performance_glitch_user)

## User Story 2
As a Swag Labs standard_user, I need to open the products detail page in the Swag Labs ordering platform so that get more information about the products

## Acceptance Criterias 2
Ensure the Swag Labs standard_user are able to:
1. Log in to Swag Labs
2. Navigate in the Products page
3. Able to access to the products details view

## User Story 3
As a Swag Labs standard_user, I need to add to cart products in the Swag Labs ordering platform so that I can buy it

## Acceptance Criterias 3
Ensure the Swag Labs standard_user are able to:
1. Log in to Swag Labs
2. Navigate in the Products page
3. Able to add to cart product(s) to buy
4. Navigate into the Products details page
5. Able to add to cart product(s) to buy

## User Story 4
As a Swag Labs standard_user, I need to review my previous added to cart products in the Swag Labs ordering platform so that I can remove it

## Acceptance Criterias 4
Ensure the Swag Labs standard_user are able to:
1. Log in to Swag Labs
2. Navigate in the Products page
3. Able to add to cart product(s) to buy
3. Able to remove product(s)
4. Navigate into the Products details page
5. Able to remove product(s)
6. Navigate into the shopping cart
7. Able to remove product(s)

## User Story 5
As a Swag Labs standard_user, I need to sort products in the Swag Labs ordering platform so that I can find what I'm looking for easily

## Acceptance Criterias 5
Ensure the Swag Labs standard_user are able to:
1. Log in to Swag Labs
2. Navigate in the Products page
3. Able to sort product(s) in different ways

## User Story 6
As a Swag Labs standard_user, I need to reset the app status in the Swag Labs ordering platform so that I can reset the app to its initial settings

## Acceptance Criterias 6
Ensure the Swag Labs standard_user are able to:
1. Log in to Swag Labs
2. Navigate in the menu page
3. Able to reset app state

## User Story 7
As a Swag Labs standard_user, I need to see the product information in the product page and product details page in the Swag Labs ordering platform so that I can know what I'm buying

## Acceptance Criterias 7
Ensure the Swag Labs standard_user are able to:
1. Log in to Swag Labs
2. Navigate in the Products page
3. Able to see all the product information (image, title, description, price)
4. Navigate into the Products details page
5. Able to see all the product information (image, title, description, price)

## User Story 8
As a Swag Labs standard_user, I need to see the shopping cart with the number of products added in the Swag Labs ordering platform so that I can to know the status of the same

## Acceptance Criterias 8
Ensure the Swag Labs standard_user are able to:
1. Log in to Swag Labs
2. Navigate in the Products page
3. Able to see the shopping cart with the number of products added
4. Navigate into the Products details page
5. Able to see the shopping cart with the number of products added
6. Navigate into the shopping cart
7. Able to see the shopping cart with the number of products added

## User Story 9
As a Swag Labs standard_user, I need to see all the product added to the shopping cart in the Swag Labs ordering platform so that I can to know what I am going to buy

## Acceptance Criterias 9
Ensure the Swag Labs standard_user are able to:
1. Log in to Swag Labs
2. Navigate into the shopping cart
3. Able to see all the products information what I am going to buy (qty, name, description, price)

## User Story 10
As a Swag Labs standard_user, I need to buy all the product added to the shopping cart in the Swag Labs ordering platform

## Acceptance Criterias 10
Ensure the Swag Labs standard_user are able to:
1. Log in to Swag Labs
2. Navigate into the shopping cart
3. Able to Checkout
4. Able to complete a form with my personal data
5. Able to see an overview about my order (qty, name, description, unit price, payment information, shipping information, item total price, tax, total price)
6. Able to see a confirmation page

# Test Cases
User Story 1: Log in in Swag Labs

TC1: 
    Given the standar_user  
    When typing the username and password in Swag Labs login page
    And clicking on Login button
    Then I can log in 
    And I can log out
TC2: 
    Given the locked_out user  
    When typing the username and password in Swag Labs login page
    And clicking on Login button
    Then a validation is raised with the string "Epic sadface: Sorry, this user has been locked out."
TC3:
    Given the problem_user  
    When typing the username and password in Swag Labs login page
    And clicking on Login button
    Then I can log in 
    And I can log out
TC4:
    Given the performance_glitch_user  
    When typing the username and password in Swag Labs login page
    And clicking on Login button
    Then I can log in 
    And I can log out

User Story 2: Open the products and get the information

TC5: 
    Given I am logged in Swag Labs as standard_user
    When I click on every item on the page
    Then I can access it owns details
    And I can return back to the landing page

User Story 3: Add products to cart

TC6:
    Given I am logged in Swag Labs as standard_user
    When I click on add to cart from products page
    Then items are added to the cart
    And shopping cart badge has a value
    And button has changed from "Add to cart" to "Remove" 

TC7:
    Given I am logged in Swag Labs as standard_user
    When I click on add to cart from each Product details page of each item
    Then items are added to the cart
    And shopping cart badge has a value
    And button has changed from "Add to cart" to "Remove" 

User Story 4: Review products added to the cart and able to remove them

TC 8: pending to write that
    Given I am logged in Swag Labs as standard_user
    When I click on add to cart from each Product details page of each item
    Then items are added to the cart
    And shopping cart badge has a value
    And button has changed from "Add to cart" to "Remove" 


# How to Run the Tests
yarn run cypress run -> to run the whole suite

# Git Commands
Section to add the git commands used during the challenge

# Problems
Section to write down problems you have encountered during the challenge
