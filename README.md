# Common Server - Backend API

Production-ready backend system with authentication and user management.

## Features

- Email-based authentication with OTP
- Admin login with static OTP
- User profile management with image upload
- JWT authentication
- Single users table for admin and web users

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Copy `.env.example` to `.env` and update:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=common_server_db
JWT_SECRET_KEY=your_secret_key
```

### 3. Start Server
```bash
npm run dev
```

Server runs at: http://localhost:3001

**Note**: Database and tables are auto-created on first run. Admin user is auto-created on first login.

## API Endpoints

### Admin APIs
```
POST   /admin/auth/login          - Admin login (email: admin@server.com, otp: 8055)
GET    /admin/auth/profile        - Get admin profile (auth required)
```

### Web User APIs
```
POST   /web/auth/send-signup-otp  - Send registration OTP
POST   /web/auth/signup           - Verify OTP and complete registration
POST   /web/auth/send-login-otp   - Send login OTP
POST   /web/auth/login            - Login with OTP
GET    /web/auth/profile          - Get user profile (auth required)
PUT    /web/auth/profile          - Update profile (auth required)
```

## API Examples

### Admin Login
```bash
curl -X POST http://localhost:3001/admin/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@server.com","otp":"8055"}'
```

### User Sign-Up
```bash
# 1. Send OTP
curl -X POST http://localhost:3001/web/auth/send-signup-otp \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","phone":"9876543210"}'

# 2. Verify OTP (check database for OTP)
curl -X POST http://localhost:3001/web/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","otp":1234}'
```

### User Login
```bash
# 1. Send OTP
curl -X POST http://localhost:3001/web/auth/send-login-otp \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com"}'

# 2. Login with OTP
curl -X POST http://localhost:3001/web/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","otp":1234}'
```

## Database Schema

### Users Table
```sql
users
├── id (VARCHAR 36, PK)
├── name (VARCHAR 255)
├── email (VARCHAR 255, UNIQUE)
├── phone (VARCHAR 20)
├── role (ENUM: 'admin', 'web_user')
├── profile_image (TEXT)
├── base_url (TEXT)
├── otp (INT)
├── access_token (TEXT)
├── created_by (VARCHAR 36)
├── updated_by (VARCHAR 36)
├── is_active (TINYINT)
├── is_deleted (TINYINT)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)
```

## Project Structure

```
common_server/
├── _config/              # Configuration files
├── _helpers/             # Utility functions
├── _middleware/          # Express middlewares
├── models/               # Database models
├── admin/                # Admin module
│   ├── controllers/
│   ├── services/
│   ├── routes/
│   └── validate_schema/
├── web/                  # Web user module
│   ├── controllers/
│   ├── services/
│   ├── routes/
│   └── validate_schema/
├── public/uploads/       # File uploads
├── routes/               # Route aggregator
└── server.js             # Entry point
```

## Scripts

```bash
npm start    # Start production server
npm run dev  # Start development server
```

## Environment Variables

```env
NODE_ENV=development
PORT=3001
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=common_server_db
JWT_SECRET_KEY=your_secret_key
TZ=Europe/London
IMAGE_BASE_URL=http://localhost:3001
MSG91_AUTH_KEY=your_msg91_key
MSG91_TEMPLATE_ID=your_template_id
ADMIN_EMAIL=admin@server.com
ADMIN_OTP=8055
```

## Tech Stack

- Node.js & Express
- MySQL & Sequelize ORM
- JWT for authentication
- Multer for file uploads
- Joi for validation
- Winston for logging

## License

ISC
