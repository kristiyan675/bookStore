# Ngapp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.9.

# Angular App with json-server Mock API

This project demonstrates how to set up an Angular application and use `json-server` to create a mock API with a JSON database.
 
## Prerequisites

Before you begin, make sure you have the following software installed on your system:

- [Node.js](https://nodejs.org/) (for npm)
- [Angular CLI](https://angular.io/guide/setup-local)
- [json-server](https://github.com/typicode/json-server)

## Getting Started

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/kristiyan675/bookStore.git

2. Navigate to folder

   ```bash
   cd bookstore

3. Install dependencies

   ```bash
   npm install

4. Make sure you don't have any services running on port 3000 and run the json-server

   ```bash
   npm run server

5. Make sure you don't have any services running on port 4200 and run the app in a new terminal

   ```bash
   npm run start


## Future Improvements
   - Add more validations for the book's ISBN number is a unique number that is assigned to every published book and has 13 digits
   - Add additional validation for the url of the book cover
   - Make design more responsive for different layouts
   - Move the sorting and search-bar elements into separate components
   - Add inline styling for the elements
   - Change book title regex to allow more different characters besides letters (e.g. numbers)
