# Bicycle Store API

The **Bicycle Store API** is a RESTful service designed for managing bicycles, handling customer orders, and calculating store revenue. It is developed using **Node.js**, **Express**, and **MongoDB** to provide a robust and scalable backend.

---

## Overview

This project provides essential functionality for a bicycle store, including:

- Managing bicycle products (CRUD operations).
- Processing customer orders with stock validation.
- Calculating total revenue generated from orders.
- Providing robust error handling and clear API responses.

The application is structured using a modular approach for easy scalability and maintenance.

---

## Installation and Setup

### Prerequisites

Ensure the following are installed:
- **Node.js** (v16+)
- **MongoDB** (local or cloud instance)

### Clone the Repository

```bash
git clone https://github.com/aamamun24/Bicycle-Store.git
cd bicycle-store-api
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file in the root directory with the following keys:

```env
PORT=5000
DATABASE_URL=your_mongodb_connection_string
```

### Start the Application

For production:
```bash
npm run start:prod
```

For development (with live reload):
```bash
npm run start:dev
```

The API will be available at `http://localhost:5000`.

---

## Features

### Product Management
- Add, update, delete, and retrieve bicycle details.
- Search bicycles by name, brand, or type.
- Manage stock and pricing.

### Order Management
- Place orders with validation for product availability and stock adjustments.
- Retrieve all orders with populated product details.
- View individual order details.

### Revenue Calculation
- Calculate the store's total revenue using the `/api/orders/revenue` endpoint.

---

## API Endpoints

### Products
- **Create Product:** `POST /api/products`
- **Retrieve All Products:** `GET /api/products`
- **Retrieve Product by ID:** `GET /api/products/:id`
- **Update Product:** `PUT /api/products/:id`
- **Delete Product:** `DELETE /api/products/:id`

### Orders
- **Place Order:** `POST /api/orders`
- **Calculate Revenue:** `GET /api/orders/revenue`

---