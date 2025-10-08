
# 🧰 Elzero Backend

This is a **backend API** project built with **NestJS**, **TypeORM**, and **PostgreSQL**.  
The goal of this project is to provide a clean and secure authentication and user management system.

---

## 🚀 Tech Stack

- **NestJS** (Node.js Framework)  
- **TypeScript**  
- **TypeORM**  
- **PostgreSQL**  
- **JWT** Authentication  
- **Bcrypt** for password hashing  
- **Swagger / OpenAPI** for API documentation  

---

## ✨ Features

- 📝 User registration  
- 🔐 Login with JWT token  
- 🔄 Password reset  
- 🧭 Role-based access control  
- 🧪 Input validation and error handling  
- 📜 API documentation using Swagger  
- 🧼 Secure password storage (bcrypt)  

---

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Abdelrahman-Yaser/elzero-backend.git
````

2. **Navigate to the project folder**

   ```bash
   cd elzero-backend
   ```

3. **Install dependencies**

   ```bash
   npm install
   ```

4. **Create a `.env` file** in the root directory and add your environment variables:

   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=postgres
   DB_PASS=password
   DB_NAME=elzero_db
   JWT_SECRET=your_jwt_secret
   ```

5. **Run the project**

   ```bash
   npm run start:dev
   ```

6. **Access Swagger Docs**

   ```
   http://localhost:3000/api/docs
   ```

---

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

---

## 🛡️ Security Notes

* Do not return sensitive fields such as `password` in API responses.
* Always validate and sanitize user input.
* Protect Swagger UI in production with authentication.
* Use JWT tokens with expiration and proper role checks.
* Avoid SQL injection by relying on TypeORM’s query builder and parameterized queries.

---

## 📚 API Documentation

Once the server is running, visit:

```
http://localhost:3000/api/docs
```

You can view all available endpoints, their request/response models, and test them directly.

---

## 👨‍💻 Author

* **Abdelrahman Yaser**
* GitHub: [@Abdelrahman-Yaser](https://github.com/Abdelrahman-Yaser)

---

## 📜 License

This project is licensed under the **MIT License**.
Feel free to use it for personal or commercial projects.

```

---

لو حبيت أزود عليه سكشن خاص بـ “Endpoints Examples” (زي login/register response) أقدر أضيفه لك.  
تحب أضيف أمثلة للـ API endpoints؟ 🔥📡
```
