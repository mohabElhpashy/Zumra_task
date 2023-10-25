# Zumra Front-End Task

## Description

This project involves building a user management dashboard that allows administrators to view, add, edit, and delete user profiles. The application has both frontend and backend components. The frontend is built using Vue.js and Nuxt.js, while the backend API is developed using Node.js with Nest.js.


## how to run 

1. yarn install 

2. yarn dev

## How to Use

Follow these steps to set up and run the project:

1. Clone the repository:

2. Ensure that port 3000 is not being used by another service.

3. Change your current directory to the project folder:

4. Install project dependencies:

5. Start the development server:

6. Open your web browser and navigate to `http://localhost:3000` to access the user management dashboard.

## Testing

You can run unit tests by executing the following command:

yarn install

yarn  test


## Features

### 1. User List Page

- Displays a list of user profiles fetched from the backend API.
- Implements pagination and sorting for the user list.
- Provides a button to delete a user profile.

### 2. User Details Page

- Creates a page to display detailed information about a selected user.
- Allows editing user details and saving changes.
- Implements form validation for user edits.

### 3. User Addition Page

- Designs a form to add a new user profile with fields such as name, email, and role.
- Validates the form inputs and provides appropriate feedback.
- After successful addition, redirects back to the user list.

### 4. Authentication

- Implements a simple authentication mechanism for accessing the dashboard.
- Creates a login page with username and password fields.
- Upon successful login, stores a token (fake or mock) to simulate authentication.

### 5. Navigation

- Sets up a navigation menu to switch between the user list, user details, and user addition pages.


