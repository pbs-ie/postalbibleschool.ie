# Contributing Guidelines

Thank you for your interest in contributing to this project! This document outlines the guidelines for version control, branching, merging, and coding standards to ensure smooth collaboration and maintain code quality.

For further details on documentation, check the [docs](./docs/) folder

---

## Version Control Workflow

This project uses **Git** for version control and is hosted on **GitHub**. Please follow the workflow outlined below for contributing.

### Branching Strategy

- **`main` Branch:**
  - The default branch.
  - Always contains stable and deployable code.
  - Direct commits to `main` are not allowed.
- **`staging` Branch:**
  - Development code on Live environment.
  - `staging` branch is deployed on a similar server as `main`.
  - Can be used to verify code changes on a live server by pushing development branch to this.
- **Feature Branches (`feature/`)**:
  - Used for developing new features.
  - Create branches from `main`.
  - Naming convention: `feature/feature-name`
    - Example: `feature/user-authentication`
- **Bugfix Branches (`bugfix/`)**:
  - Used for fixing bugs.
  - Create branches from `main` or a release branch (if applicable).
  - Naming convention: `bugfix/bug-description`
    - Example: `bugfix/login-error`
- **Hotfix Branches (`hotfix/`)**:
  - Used for urgent production fixes.
  - Create branches from `main`.
  - Naming convention: `hotfix/issue-description`
    - Example: `hotfix/payment-issue`

### Workflow Steps

1. **Sync `main` with Remote:**
   Always pull the latest changes from the `main` branch before starting any new work:

   ```bash
   git checkout main
   git pull origin main
   ```

2. **Create a Branch:**
   Create a new branch for your work:

   ```bash
   git checkout -b branch-name
   ```

   Replace `branch-name` with your branch's name (e.g., `feature/add-search-bar`).

3. **Make Changes and Commit:**
   - Write clear and concise commit messages.
   - Follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) format.

     ```bash
     <type>[optional scope]: <description>

     [optional body]

     [optional footer(s)]
     ```

   - Example:

     ```bash
     git commit -m "feat: Add login functionality with form validation"
     ```

4. **Push Your Branch:**
   Push your branch to the remote repository:

   ```bash
   git push origin branch-name
   ```

5. **Create a Pull Request (PR):**
   - Go to the repository on GitHub.
   - Open a PR from your branch into `main`.
   - Add a detailed description of the changes and include relevant screenshots or references.

6. **Code Review:**
   - Request a review from at least one other developer.
   - Make changes if feedback is provided.

7. **Merge:**
   - Once approved, merge your branch into `main`.
   - Use the **Squash and Merge** strategy for a clean commit history.

---

## Coding Standards

### Backend (Laravel)

- Follow the [PSR-12 Coding Standard](https://www.php-fig.org/psr/psr-12/).
- Use **Eloquent** for database interactions unless raw queries are necessary.
- Follow the MVC (Model-View-Controller) structure.
- Write unit tests for critical functionality.
- Add comments and docblocks for complex methods.

### Frontend (React)

- Follow the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript).
- Use functional components with hooks.
- Avoid inline styles; use Tailwind CSS.
- Write reusable components whenever possible.
- Use TypeScript for type safety.

---

## Testing (Not implemented)

- Ensure all tests pass before creating a PR:

  ```bash
  npm run test
  php artisan test
  ```

- Add tests for new features and bug fixes.

---

## Pre-Commit Checklist

Before committing code, ensure the following:

1. All tests pass.
2. There are no unresolved merge conflicts.
3. [CHANGELOG.md](./CHANGELOG.md) is updated.

---

## Pull Request Guidelines

- Ensure your branch is up-to-date with `main` before opening a PR:

  ```bash
  git merge main
  ```

- Add a descriptive title and summary for the PR.
- Prefix with `FEATURE:` for a new feature or `BUGFIX:` for a fix.
- Use the Github templates but feel free to remove the irrelevant headings.
- Reference related issues or tasks using keywords (e.g., `Fixes #123`).

---

## Additional Tools

- **Continuous Integration (CI):**
  - All PRs must pass the CI pipeline before merging.
  - Github actions handles the CI.

---

Thank you for contributing! If you have any questions, feel free to reach out to the maintainers.
