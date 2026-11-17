# E-Commerce Web Application

A full-stack E-Commerce web application developed using React and Spring Boot. The application allows users to browse products, view product details, add new products, and upload product images.

## Features

- **Product Listing:** Displays available products with their details.
- **Product Management:** Supports adding new products.
- **Image Upload:** Allows product images to be uploaded and displayed.
- **REST API Integration:** Connects the React frontend with the Spring Boot backend.
- **Database Integration:** Stores product information and image data.
- **Dynamic Frontend:** Fetches and displays product information from the backend.

## Technologies Used

| Category | Technologies |
|---|---|
| Frontend | React.js, JavaScript, HTML, CSS |
| Build Tool | Vite, npm |
| Backend | Java, Spring Boot |
| Database | H2 Database |
| ORM | Spring Data JPA, Hibernate |
| API Communication | REST APIs, Axios |
| Testing | Postman |
| Version Control | Git, GitHub |

## Project Structure

ecommerce-web-application/
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
└── backend/
    ├── src/
    │   └── main/
    │       ├── java/
    │       └── resources/
    └── pom.xml
```

## Prerequisites

- Java 17 or compatible version
- Node.js and npm
- Maven
- IDE such as Spring Tool Suite or IntelliJ IDEA

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/sn3hamishra/ecommerce-web-application.git
```

### 2. Run the Backend

Navigate to the backend directory:

```bash
cd backend
```

Build the application:

```bash
mvn clean install
```

Start the Spring Boot application:

```bash
mvn spring-boot:run
```

The backend runs on:

```text
http://localhost:8080
```

### 3. Run the Frontend

Open another terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm run dev
```

The frontend runs on:

```text
http://localhost:5173
```

## Application Workflow

1. The React frontend sends requests to the Spring Boot REST APIs.
2. The backend processes product-related requests.
3. Spring Data JPA interacts with the database.
4. Product information is returned to the frontend.
5. Uploaded product images are stored and retrieved through backend APIs.

## Future Enhancements

- User authentication and authorization.
- Shopping cart and checkout functionality.
- Online payment integration.
- Order management.
- Product search and filtering.

## Project Status

Developed as a full-stack learning project to gain practical experience in React, Spring Boot, REST API integration, database management, and frontend-backend communication.
