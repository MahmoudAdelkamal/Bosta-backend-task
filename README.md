# Library Management System

## Overview

The Library management System is an application that allows users to manage books, including adding new books, updating book details, borrowing books and returning them back.


## Features implemented : 
1. Creating restful apis using nodejs, nestjs, postgres and typeorm.
2. Writing unit testing using jest.
3. Dockerizing the app using docker-compose.

### Prerequisites

Make sure you have the following installed:

- Docker
- Docker Compose
### Installation

## Installation using Docker

1. Clone the repository:
   - `git clone (https://github.com/MahmoudAdelkamal/Bosta-backend-task)

2. Build and start the application using Docker Compose:
   - `docker-compose up --build`

3. Access the application at:
   - [http://localhost:3000](http://localhost:3000)

## API Documentation

### Books API
## API Documentation for Book Section
### 1. Get All Books

- **Endpoint:** `GET /books`
- **Description:** Retrieves a list of all books.
- **Responses:**
  - **200 OK:** Returns an array of book objects.

### 2. Create a Book

- **Endpoint:** `POST /books`
- **Description:** Creates a new book.
- **Request Body:**
  ```json
  {
    "title": "string",
    "author": "string",
    "publishedDate": "string",
    "availableQuantity": "number"
  }



### 3. update a Book

- **Endpoint:** `PATCH /books`
- **Description:** updates an existing book.
- **Request Body:**
  ```json
  {
    "id": 1,
    "title": "string",
    "author": "string",
    "publishedDate": "string",
    "availableQuantity": "number"
  }
  }


### Borrower API
## API Documentation for Borrower Section

### 1. Get All Borrowers

- **Endpoint:** `GET /borrowers`
- **Description:** Retrieves a list of all borrowers.
- **Responses:**
  - **200 OK:** Returns an array of borrower objects.

### 2. Create a Borrower

- **Endpoint:** `POST /borrowers`
- **Description:** Creates a new borrower.
- **Request Body:**
  ```json
  {
    "name": "string",
    "email": "string"
  }
### 3. update a Borrower

- **Endpoint:** `PATCH /borrowers`
- **Description:** updates an existing borrower details.
- **Request Body:**
  ```json
  {
    "id": 1,
     "name": "",
     "email": ""
  }


## API Documentation for Borrowing Transaction Section

### 1. Checkout a Book

- **Endpoint:** `POST /borrowing-transactions/checkout`
- **Description:** Checks out a book for a borrower.
- **Request Body:**
  ```json
  {
    "borrowerId": "number",
    "bookId": "number",
    "dueDate": "2024-10-20"  // Format: YYYY-MM-DD
  }

### 2. Return a Book

- **Endpoint:** `POST /borrowing-transactions/return/:transactionId`
- **Description:** returns a book from a borrower back to the library.
- **Request Body:**
  ```json
  {
     "transactionId": 5
  }
