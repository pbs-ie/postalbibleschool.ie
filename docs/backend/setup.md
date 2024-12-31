# Backend Setup Guide

This guide explains how to set up the Laravel backend for development. Follow these steps to ensure the application runs smoothly in your local environment.

---

## Prerequisites

Ensure you have the following installed on your system:

- PHP (version 8.1 or higher)
- Composer
- MySQL or a compatible database
- Node.js and npm (for frontend asset compilation, if required)
- Redis, Memcached (optional, for caching and queues)
- Git

---

## Installation Steps

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <project-directory>
```

### 2. Install PHP Dependencies

```bash
composer install
```

### 3. Set Up Environment Variables

- Copy the example `.env` file:

  ```bash
  cp .env.example .env
  ```

- Update the `.env` file with your local settings, including:
  - App configuration
  - Database credentials
  - Mail configuration (SendInBlue/Brevo)
  - Payment configuration (Paypal)
  - Authentication credentials (Auth0)
  - Filemaker credentials

### 4. Generate Application Key

```bash
php artisan key:generate
```

### 5. Set Up the Database

- Create a database for the application.
- Run migrations:

  ```bash
  php artisan migrate
  ```

### 6. Install Node.js Dependencies

```bash
npm install
```

### 7. Compile Frontend Assets

```bash
npm run dev
```

---

## Running the Application

### Development Server

Start the Laravel development server:

```bash
php artisan serve
```

Access the application at [http://localhost:8000](http://localhost:8000).

### Queue Worker (if applicable)

If your application uses queues, start the worker:

```bash
php artisan queue:work
```

---

## Testing the Setup (Not implemented)

### Run Unit and Feature Tests

```bash
php artisan test
```

### Verify Frontend and Backend Integration

- Open the application in your browser.
- Ensure database connections, APIs, and assets are working correctly.

---

## Troubleshooting

- **Issue:** Missing PHP extensions.
  - **Solution:** Ensure required extensions (e.g., `mbstring`, `openssl`, `pdo`) are installed.

- **Issue:** `npm run dev` fails.
  - **Solution:** Check the Node.js and npm versions, and ensure dependencies are installed.

- **Issue:** Database migrations fail.
  - **Solution:** Verify your `.env` database credentials and ensure the database is running.

---

## Additional Notes

- For advanced configuration, refer to the [Laravel documentation](https://laravel.com/docs/9.x).
- Contact the project maintainer for unresolved issues.
