# Express Project Setup

## Project Overview
This is an Express.js project with TypeScript support. Below are the steps to install, set up, and run the project.

## Prerequisites
Ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (Recommended: LTS version)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## Installation
1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd <project-directory>
   ```

2. Install dependencies:
   ```sh
   npm install
   ```
   or
   ```sh
   yarn install
   ```

## Running the Project

### Development Mode
To start the development server with live reload using `nodemon`, run:
   ```sh
   npm run dev
   ```

### Building the Project
To compile TypeScript files to JavaScript, run:
   ```sh
   npm run build
   ```

### Starting the Production Server
After building the project, start the server with:
   ```sh
   npm start
   ```

## Project Structure
```
/project-root
│   package.json
│   tsconfig.json
│   .gitignore
│
├───src
│   │   index.ts
│   ├───routes
│   ├───controllers
│   ├───middlewares
│   ├───models
│
├───dist (Generated after build)
```

## Environment Variables
Create a `.env` file in the root directory and define the required variables:
```
PORT=3000
DB_URI=mongodb://localhost:27017/your-database
```

## License
This project is licensed under the MIT License.

