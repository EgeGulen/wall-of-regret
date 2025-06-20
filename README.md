# Wall of Regrets - A Full-Stack Application

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)

A modern, full-stack application where users can anonymously post their regrets, tagged with their location and a timestamp. This project evolved from a simple prototype into a secure, feature-rich platform with a focus on a clean user experience and a robust backend architecture.

---

### ✨ Key Features

* **User Authentication:** Secure user registration and login system using JWT (JSON Web Tokens). Passwords are an-one-way hashed with `bcrypt`.
* **Geolocation Tagging:** Every regret is tagged with the user's location upon submission. The application gracefully handles cases where location access is denied.
* **Reverse Geocoding:** Raw coordinates (latitude, longitude) are automatically converted into human-readable **city names** by querying the free OpenStreetMap Nominatim API.
* **Anonymous Posting:** Users have the option to post regrets under their username or as "Anonymous" via a simple checkbox, giving them full control over their privacy.
* **Dynamic UI/UX:** A completely redesigned user interface with a modern, responsive theme. Features a custom, non-blocking notification system instead of native browser alerts.
* **RESTful API:** A well-structured backend API built with NestJS to manage all data operations.

### 📸 Project Screenshot

*(Buraya uygulamanın ekran görüntüsünü ekleyebilirsin. Örn: `![Project Screenshot](screenshot.png)`)*
![Project Screenshot](https://i.imgur.com/gK9Q2eK.png) 

---

### 🛠️ Technology Stack

#### **Backend**
* **Framework:** NestJS (Node.js)
* **Database:** SQLite (managed via TypeORM)
* **Authentication:** Passport.js (`passport-jwt` strategy)
* **Password Hashing:** `bcrypt`
* **Validation:** `class-validator`

#### **Frontend**
* **Framework:** Angular
* **Styling:** Modern CSS with CSS Variables
* **HTTP Client:** Angular's `HttpClient` for API communication
* **State Management:** Local `localStorage` for JWT, component-level state for UI.

---

### 📂 Project Structure

The project is organized into two main folders: `frontend` and `backend`.

* **`backend/`**: Contains the NestJS application.
    * `src/auth/`: Manages user registration, login, and JWT strategy.
    * `src/regrets/`: Manages all CRUD operations for regrets.
    * `wall-of-regret.db`: The SQLite database file where all data is stored.
* **`frontend/`**: Contains the Angular application.
    * `src/app/pages/`: Contains the main page components (`login`, `register`, `dashboard`).
    * `src/app/services/`: Contains reusable logic, like the `AuthService`.

---

### 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

#### **Prerequisites**
You need to have Node.js and npm installed on your machine. It's also recommended to install the Angular CLI globally:
```sh
npm install -g @angular/cli

Installation & Setup
Clone the repository:

git clone [https://github.com/your-username/your-repository-name.git](https://github.com/your-username/your-repository-name.git)
cd your-repository-name

Setup the Backend:

Navigate to the backend folder: cd backend

Install NPM packages:

npm install

Start the development server (it will automatically create the wall-of-regret.db file):

npm run start:dev

The backend will be running on http://localhost:3000.

Setup the Frontend:

Open a new terminal and navigate to the frontend folder: cd frontend

Install NPM packages:

npm install

Important: Before running, ensure the API URLs in src/app/pages/dashboard/dashboard.component.ts point to the correct backend address (http://localhost:3000).

Start the development server:

ng serve

Open your browser and navigate to http://localhost:4200.

📄 License
This project is licensed under the MIT License - see the LICENSE.md file for details.

✍️ Author