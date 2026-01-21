📊 Expense Tracker REST API

A secure and scalable Expense Tracking REST API built using Node.js, Express, and MongoDB, featuring JWT-based authentication, user-level data isolation, and analytical reports.

🚀 Features

User registration and login with JWT authentication

Secure, protected routes using Bearer Token middleware

Add, update, delete, and view expenses

User-level data isolation (users can only access their own data)

Category-wise expense reports

Monthly expense summary reports

API documentation using Swagger (OpenAPI 3.0)

Deployed on Render with MongoDB Atlas

🧱 Tech Stack

Backend: Node.js, Express.js

Database: MongoDB, MongoDB Atlas

Authentication: JWT, bcrypt

Validation: express-validator

API Documentation: Swagger (swagger-ui-express)

Testing: Postman, Swagger UI

Deployment: Render

Version Control: Git, GitHub

📁 Project Structure
expense-tracker-api/
│
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── expenseController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── validators.js
│   ├── models/
│   │   ├── User.js
│   │   └── Expense.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── expenseRoutes.js
│   └── app.js
│
├── server.js
├── swagger.js
├── .env
├── .gitignore
├── package.json
└── README.md

🔐 Authentication Flow

User registers or logs in

Server returns a JWT token

Token is sent in request headers:

Authorization: Bearer <JWT_TOKEN>


Protected routes validate the token via middleware

📘 API Documentation (Swagger)

Once the server is running, access Swagger UI:

/api-docs


Example (Production):

https://<your-render-url>/api-docs


Swagger allows interactive testing of all APIs, including authenticated routes.

🔧 API Endpoints Overview
Auth

POST /api/auth/register – Register a new user

POST /api/auth/login – Login and receive JWT

Expenses

POST /api/expenses – Add expense

GET /api/expenses – Get all expenses

PUT /api/expenses/:id – Update expense

DELETE /api/expenses/:id – Delete expense

Reports

GET /api/expenses/reports/category – Category-wise report

GET /api/expenses/reports/monthly – Monthly report

(All expense routes are protected)

🧪 Testing the API
Using Swagger

Login via /api/auth/login

Copy the JWT token

Click Authorize in Swagger

Paste:

Bearer <JWT_TOKEN>


Test protected endpoints

Using Postman

Set Authorization → Bearer Token

Paste JWT token

Send requests to API endpoints

⚙️ Environment Variables

Create a .env file in the root directory:

PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret


⚠️ .env is excluded using .gitignore

🌍 Deployment

The application is deployed on Render with MongoDB Atlas.

Automatic deployment via GitHub integration

Environment variables managed securely

Production-ready setup

🧠 Learning Outcomes

REST API design and best practices

JWT authentication & authorization

Middleware-based security

MongoDB aggregation pipelines

MVC architecture

Cloud deployment workflow

📌 Author

Tanu Shri
GitHub: https://github.com/TannuShri

⭐ If you like this project

Give it a ⭐ on GitHub — it motivates continuous improvement!
