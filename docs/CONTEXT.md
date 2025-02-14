# Real Estate Management App

A full-stack MERN application designed for efficient property management, featuring AI-powered sorting, advanced search capabilities, and bulk property uploads.

## Tech Stack

- **Frontend**: Next.js (React)
- **Backend**: Express.js
- **Database**: MongoDB

## Core Features

- 🤖 AI-powered property sorting
- 🔍 Advanced search and filter functionality
- 📊 Bulk property upload via Excel
- ✨ Intuitive property management interface

## Application Flow

### 1. Authentication

- **Welcome Screen**

  - Clean, intuitive interface
  - Sign Up/Login options

- **User Authentication**
  - Email-based registration
  - Secure login system

### 2. Dashboard

- **Main Features**
  - AI-sorted property listing
  - Quick-add property interface
  - Property management tools
- **Search & Filter**
  - Reference Number search
  - Property Name search
  - Price-based filtering
  - button to go to the bulk upload page

### 3. Property Management

#### Single Property Operations

- Quick property addition
- Edit existing properties
- Delete properties

#### Bulk Operations

- Excel file upload support
- Automated data processing
- Data validation

## API Endpoints

### Authentication

http
POST /api/auth/signup # User registration
POST /api/auth/login # User login

### Property Management

POST /api/properties # Add new property
GET /api/properties # Get all properties
PUT /api/properties/:id # Update property
DELETE /api/properties/:id # Delete property

### Search & Filter

GET /api/properties/search?query=<name|reference_number> # Search properties
GET /api/properties/filter?price=<min-max> # Filter by price

### Bulk Upload

POST /api/properties/upload # Excel file upload

## Feature Summary

✅ AI-Powered Property Sorting

- Intelligent organization of property listings
- Priority-based display

✅ Property Management

- Quick property addition
- Edit/Delete capabilities
- Bulk upload via Excel

✅ Search & Filter

- Reference number search
- Property name search
- Price-based filtering

## Getting Started

1. Clone the repository
2. Install dependencies
3. Set up environment variables
4. Run the development server

For detailed setup instructions, please refer to the [Installation Guide](./INSTALLATION.md).
