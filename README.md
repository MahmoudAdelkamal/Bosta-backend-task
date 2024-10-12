# Library Management System

## Overview

The Library management System is an application that allows users to manage books, including adding new books, updating book details, borrowing books and returning them back.This project is built using NestJS, typeorm and postgres.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Docker
- Docker Compose
### Installation

## Installation using Docker

1. Clone the repository:
   - `git clone https://github.com/your-username/book-management-system.git`
   - `cd book-management-system`

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
