# Gemini Project Guide

This document provides a guide for interacting with the project, based on an analysis of its structure and code.

## Project Overview

This is a TypeScript-based backend project using Node.js and Express. It follows a modular architecture with a clear separation of concerns.

### Key Technologies

- **Framework:** Express
- **Database:** PostgreSQL with TypeORM
- **Authentication:** JWT (JSON Web Tokens) with `jsonwebtoken`
- **Password Hashing:** `bcrypt`
- **Validation:** `celebrate` with Joi
- **Dependency Injection:** `tsyringe`
- **Language:** TypeScript

### Project Structure

The project is organized into three main directories under `src`:

- `@config`: Contains configuration files for the database, hashing, JWT, etc.
- `modules`: Contains the core application logic, divided into modules such as `users` and `apis`. Each module typically contains:
    - `controllers`: Handle HTTP requests and responses.
    - `services`: Contain the business logic.
    - `repositories`: Abstract the data access layer.
    - `entities`: Define the database models (TypeORM entities).
    - `routers`: Define the API routes.
- `shared`: Contains code shared across modules, such as middleware, error handling, and dependency injection setup.

### Coding Style and Conventions

- **Dependency Injection:** The project heavily uses `tsyringe` for dependency injection. Services, repositories, and other dependencies are injected into classes using the `@injectable()` and `@inject()` decorators.
- **Services:** Business logic is encapsulated in services. Services are responsible for orchestrating the application's functionality.
- **Controllers:** Controllers are responsible for handling HTTP requests and responses. They delegate the business logic to services.
- **Repositories:** Data access is abstracted through repositories. This project uses a generic `RepositoryProvider` which is then specialized for each entity.
- **Error Handling:** A custom `AppError` class is used for application-specific errors. A global error handler middleware catches and processes these errors.
- **Validation:** Request validation is performed in the router files using `celebrate` and `Joi`.
- **Authentication:** Authentication is handled by a dedicated `AuthMiddleware` which verifies JWTs.
- **Database Entities:** TypeORM entities are used to define the database schema.

## How to Interact with the Project

When making changes to the project, please adhere to the following guidelines:

- **Follow the existing structure:** When adding new features, create new modules or add to existing ones, following the established pattern of controllers, services, repositories, and entities.
- **Use dependency injection:** Use `tsyringe` to inject dependencies into your classes.
- **Use services for business logic:** Keep your business logic in services, and your controllers thin.
- **Use repositories for data access:** Interact with the database through repositories.
- **Use the `AppError` class for errors:** Throw `AppError` for application-specific errors.
- **Add validation for all new routes:** Use `celebrate` and `Joi` to validate incoming requests.
