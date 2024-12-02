# Sport Event Management Front-End

This project is the front-end part of an application designed for a sports organization to manage event registrations. The app allows organizers to manage events and participants, simplifying the registration process. The front-end is built using **React.js** and **Vite**, with a clean and modern design using **Tailwind CSS**.

## Features

### Organizer Features:
- **Manage Events**: Create, modify, and delete sports events.
- **Manage Registrations**: Create and modify registrations for each participant.
- **Generate a List of Registrants**: View and print the list of participants for each event.

### Authentication and Authorization:
- **Protected Routes**: Certain routes are protected and require authentication to access.
- **JWT Authentication**: The front-end communicates with a back-end API that uses JWT tokens for securing routes.

## Technologies Used

- **React.js**: The core library used to build the user interface.
- **React Router**: Used for defining nested routes and handling navigation between different pages.
- **React Hook Form**: A library used for handling form validation and submission with minimal re-renders.
- **Tailwind CSS**: A utility-first CSS framework for fast UI design and customization.
- **Axios**: For making HTTP requests to the back-end API.
- **Lucide React**: A set of icons used throughout the application.

## Installation

To get started with the front-end of the project, follow these steps:

### 1. Clone Repository

-->bash
git clone https://github.com/SalBouhamidi/Sporto-FrontEnd.git
 

### 2. Install dependencies:

npm install

### 3.Run Your Server: 

npm run dev
The application will be available at http://localhost:3000 in your browser.



## Usage
Once the app is running, you can access the following features:

## Event Management: 
    Organizers can view the list of events, create a new event, and update or delete existing events.
## Registration Management: 
    Organizers can view participants for each event, register new participants, and update registration details.

## Authentication 
To protect routes, user authentication is required.

## Protected Routes:
Only authenticated users can access event management and participant registration features.

## Deployment
This application uses Docker to create containerized images for both front-end and back-end services. The following steps outline how to deploy the application:

# Docker Setup
Generate Docker images for the front-end and back-end by creating Dockerfile for each service.
Connect both containers via a Docker network to enable communication between the front-end and back-end.

## Build and Run with Docker:
To build and run the application using Docker, follow these steps:

### Build the Docker images:
docker-compose build

### Start the application:
docker-compose up



Made by Salima Bouhamidi


