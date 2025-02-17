# My U Library

My U Library is a Node.js-based library management system with authentication and authorization using JWT. It allows users to check out and return books while ensuring secure access control.

## Getting Started

### Prerequisites
- Node.js (v14.x or higher)
- MongoDB (running instance)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/tu-usuario/my-u-library.git
   cd my-u-library
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and configure the following environment variables:
   ```
   JWT_SECRET=your_jwt_secret
   MONGO_URI=your_mongodb_connection_string
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### API Usage

#### Authentication
The API uses Bearer Token for authentication. Include the token in the `Authorization` header of your requests:

```
Authorization: Bearer <your_token_here>
```

#### Endpoints
- **Add a New Book** (Librarian only):
  ```
  POST /api/books
  Headers: 
    Authorization: Bearer <token>
    Content-Type: application/json
  Body:
    {
      "title": "Book Title",
      "author": "Author Name",
      "publishedYear": 2021,
      "genre": "Genre",
      "stock": 5
    }
  ```

- **Get All Books**:
  ```
  GET /api/books
  ```

- **Checkout a Book**:
  ```
  POST /api/loans/checkout
  Headers: 
    Authorization: Bearer <token>
    Content-Type: application/json
  Body:
    {
      "bookId": "<book_id>"
    }
  ```

- **Return a Book**:
  ```
  POST /api/loans/return
  Headers: 
    Authorization: Bearer <token>
    Content-Type: application/json
  Body:
    {
      "loanId": "<loan_id>"
    }
  ```

## Contributing
Feel free to open issues or create pull requests if you find any bugs or have suggestions for improvements.

## License
This project is licensed under the MIT License.

---
