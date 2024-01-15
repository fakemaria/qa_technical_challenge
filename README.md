<details>
<summary><h1> FCM Technical Challengue details</h1></summary>   
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
</details>

# General assumptions

As this exercise serves as a Proof of Concept (POC), it has been determined that our company is involved in building shopping websites, and the Swag Lab utilized here contains vanilla data. Consequently, the entire exercise has been conducted with the understanding that the data can vary, including changes in products, the number of products, names, descriptions, and their prices.

In this context, I have developed a set of agnostic tests that can be executed on the same platform with different datasets. The primary objective is to integrate these tests into a Continuous Integration/Continuous Deployment (CI/CD) pipeline, aligning with Left Shift testing practices. This entails running automated tests whenever a change is made to the core of our platform and is pushed to the main branch. Furthermore, the same set of tests is executed in a pre-production stage with real data, thereby closing the loop on CI/CD circle practices.

The project can be set up to leverage GitHub Actions, ensuring that every time the code is pushed to the main branch, the tests are automatically executed. If the code fails to meet the quality gates criteria, it should not be allowed to merge into the main branch.

Additionally, the current project is integrated with Cypress Cloud (details below).

# Test Cases
## Pre-requisites:
    1. Except User Story 1, the rest of test cases will use the username standard_user    
    2. After each test case, the user will reset the app and log out    

## User Story 1: Log in in Swag Labs

### TC1: 
    Given the standar_user    
    When typing the username and password in Swag Labs login page               
    And clicking on Login button           
    Then I can log in         
    And I can log out              
### TC2: 
    Given the locked_out user          
    When typing the username and password in Swag Labs login page           
    And clicking on Login button            
    Then a validation is raised with the string "Epic sadface: Sorry, this user has been locked out."       
### TC3:
    Given the problem_user          
    When typing the username and password in Swag Labs login page          
    And clicking on Login button           
    Then I can log in           
    And I can log out            
### TC4:
    Given the performance_glitch_user                
    When typing the username and password in Swag Labs login page          
    And clicking on Login button             
    Then I can log in           
    And I can log out                

## User Story 2: Open the products and get the information

### TC5: 
    Given I am logged in Swag Labs as standard_user          
    When I click on every item on the page           
    Then I can access it owns details              
    And I can return back to the landing page               

## User Story 3: Add products to cart

### TC6:
    Given I am logged in Swag Labs as standard_user             
    When I click on add to cart from products page            
    Then items are added to the cart              
    And shopping cart badge has a value               
    And button has changed from "Add to cart" to "Remove"                

### TC7:
    Given I am logged in Swag Labs as standard_user               
    When I click on add to cart from each Product details page of each item              
    Then items are added to the cart              
    And shopping cart badge has a value            
    And button has changed from "Add to cart" to "Remove"                   

## User Story 4: Review products added to the cart and able to remove them

### TC 8: 
    Given I am logged in Swag Labs as standard_user              
    When I click on add to cart each item from product details page               
    Then items are added to the cart             
    And user can remove them from the product details page              
    And shopping cart badge status returns back to its initial status               
### TC 9: 
    Given I am logged in Swag Labs as standard_user                 
    When I click on add to cart from each item description page              
    Then items are added to the cart               
    And user can remove them from the product details page              
    And shopping cart badge status returns back to its initial status                
### TC 10: 
    Given I am logged in Swag Labs as standard_user                
    When I click on add to cart each item from product details page                             
    Then items are added to the cart                     
    And user can remove them from the shopping cart                   
    And shopping cart badge status returns back to its initial status                      

## User Story 5: User can use the sorting of the webpage

### TC 11:
    Given I am logged in Swag Labs as standard_user            
    When I navigate to products page            
    Then items are sortered in alphabetical order order by name            
    And when clicking on sort by Name (Z to A)              
    Then items are sortered in reverse alphabetical order by name         
    And when clicking on sort by Price (Low to High)            
    Then items are sortered by price from lowest to highest         
    And when clicking on sort by Price (High to Low)              
    Then items are sortered by price from highes to lowest              

## User Story 6: User can reset app status to its initial settings

### TC 12:
    Given I am logged in Swag Labs as standard_user      
    When I click on add to cart each item from product details page     
    Then items are added to the cart     
    And user can click on reset app status from the menu sidebar      
    Then app is status goes back to its initial settings and shopping cart badge status returns back to its initial status      

## User Story 7: User is able to see the same information in both products page and each product

### TC 13: 
    Given I am logged in Swag Labs as standard_user     
    When I check name, description, price and image from all items in product page     
    And click on each item on the page      
    Then items details page shows the same name, description, price and image     

## User Story 8: User is able to see added products to the shopping cart

### TC 13: 
    Given I am logged in Swag Labs as standard_user          
    When I add all items from product page    
    Then I can see the numbers of items added in the shopping badge icon         
    And when I click on first item on products page      
    Then I can see the numbers of items items added in the shopping badge icon      
    And when I click on the shopping badge icon              
    Then I can see the numbers of items added in the shopping badge icon      

## User Story 9: User is able to see that products added to the shopping cart matches 

### TC 14: 
    Given I am logged in Swag Labs as standard_user                   
    When I add all items from product page             
    Then when I navigate to cart page I can checkout              
    And when clicking on continue without entering any information                 
    Then a validation is raised "Error: First Name is required"                   
    And  filling first name and clicking on continue            
    Then a validation is raised "Error: Last Name is required"              
    And filling last name and clicking on continue             
    Then a validation is raised "Error: Postal Code is required"                               
    And filling all fields and clicking on continue             
    Then the page Checkout overview is displayed     
    And Payment information displays the selected payment method      
    And Shipping information displays "Free Pony Express Delivery!"      
    And Item total value matches the sum of all items added to the basket
    And taxes displayes a 8% of the item total rounded up to the second decimal
    And total displayes the sum of item total plus taxes
    And when clicking on finish
    Then confirmation messages are shown with the text "Thank you for your order!" and "Your order has been dispatched, and will arrive just as fast as the pony can get there!"


## User Story 10: User is able to see that products added to the shopping cart matches 

### TC 15: 
    Given I am logged in Swag Labs as standard_user          
    When I add all items from product page    
    Then when I navigate to cart page I can check that name, description and price matches product page         
    And all elements in shopping cart are not empty and are visible     


# How to Run the Tests

## run test in isolation

yarn run cypress open 

This will open cypress GUI and test can be run from there. To run a singles test for debugging purposes the property .only can be added to each (it).

## run the whole suite from terminal in headless mode

yarn run cypress run

1. Browser Selection:
- To specify a browser add that option "--browser browsername"
  - The list of brosers available are:
   a electron   
   b chrome  
   c chromium   
   d chrome:canary   
   e edge   
   f firefox   
2. Specifying a Specific Test File:
   - To run a specific test file: yarn run cypress run --spec path/to/your/test/file.spec.js
     

## run the whole suite from terminal in Cypress cloud in headless mode

Same rules regarding browser selection or specifying a test file applies from previous example.

npx cypress run --record --key 74b72177-1741-4496-a2c2-3d48c0467867

results can be seen in: https://cloud.cypress.io/projects/8bqc3b/runs?branches=%5B%5D&committers=%5B%5D&flaky=%5B%5D&page=1&status=%5B%5D&tags=%5B%5D&timeRange=%7B%22startDate%22%3A%221970-01-01%22%2C%22endDate%22%3A%222038-01-19%22%7D

# Git Commands
During the whole exercise, I use source control GUI on VS Code and Github Dersktop    
However, these are the commands to use git from command line

To set up the project:

    1. git init
    2. Add my github repo as a remote: git remote add origin https://github.com/fakemaria/qa_technical_challenge
    3. Verify that the remote has been added: git remote -v
    4. Setup my local branch to track a remote branch: git branch -M main and git push -u origin main

To create a branch from main

    1. git checkout main
    2. create a new branch: git branch branch_name
    3. swith to the new branch: git checkout branch_name

To commit changes:

    1. To add changes to the staging area: git add . , where . is for all files or can be replaced with the only items I want to commit
    2. To commit the changes: git commit -m "Commit message goes here"

To push changes to remote:

    1. git push origin branch_name

# Problems

Log in page was the tricky part of the exercise, as I was getting a 401 error that broke the test. Even adding commands to ignore the    
error in Cypress, I got that error. It seems that switching to Edge browser make it work. 

# Regression testing after finishing the code

## Cypress cloud

![image](https://github.com/fakemaria/qa_technical_challenge/assets/67930710/0e463f6a-8b66-4a27-af9f-64cd94f46dcb)

https://cloud.cypress.io/projects/8bqc3b/runs/3/overview?roarHideRunsWithDiffGroupsAndTags=1

## Local run

![image](https://github.com/fakemaria/qa_technical_challenge/assets/67930710/f9a04c1a-cffd-4be4-b399-64554c5e1247)
