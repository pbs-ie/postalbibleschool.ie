# Frontend Setup Guide

This guide explains how to set up the React frontend for development. Follow these steps to ensure the application runs smoothly in your local environment.

---

## Prerequisites

Ensure you have the following installed on your system:

- Node.js (version 20.11 or higher)
- npm or Yarn
- Git

---

## Installation Steps

### 1. Clone the Repository

Use SSH to clone the repository:

```bash
git clone git@github.com:pbs-ie/postalbibleschool.ie.git
cd postalbibleschool.ie
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

- Create a `.env` file in the root directory.
- Add necessary environment variables as required by the application:

- Check `.env.example` for a list of required variables.

---

## Running the Application

### Start the Development Server

Run the following command to start the React development server:

```bash
npm run dev-local
```

Access the application at [http://localhost:8000](http://localhost:8000).

---

## Building for Production

To create a production-ready build of the application:

```bash
npm run build
```

The optimized build will be available in the `build/` directory.

---

## Testing the Setup

### Run Tests

Run the following command to execute unit and integration tests:

```bash
npm test
```

### Verify Backend Integration

- Ensure the `APP_URL` in the `.env` file points to the correct backend URL.
- Test API calls and confirm successful responses.

---

## Troubleshooting

- **Issue:** `npm start` fails.
  - **Solution:** Ensure Node.js and npm are installed correctly and dependencies are installed.

- **Issue:** API calls fail.
  - **Solution:** Verify that the backend server is running and the `REACT_APP_API_BASE_URL` is set correctly.

- **Issue:** Missing environment variables.
  - **Solution:** Check `.env.example` and ensure all required variables are added.

---

## Additional Notes

- Use [React DevTools](https://react.devtools) for debugging React components.
- For advanced configuration, refer to the [React documentation](https://reactjs.org/docs/).
- Contact the project maintainer for unresolved issues.
