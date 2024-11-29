
# Dashboard for Announcements and Exams

A web-based dashboard designed for managing announcements and exams with real-time notifications. This project features a React-based frontend and a Node.js backend, leveraging modern technologies like WebSocket, Redux, and MongoDB for a seamless user experience.

## Features

- **Announcements Management**: Add, edit, and delete announcements.
- **Exams Management**: Add, edit, and delete exams.
- **Real-Time Notifications**: Receive notifications instantly when a new exam is added.
- **Multi-Language Support**: Switch between English (EN) and Arabic (AR) for a localized experience.
- **Authentication**: Secure login and logout functionality.
- **Responsive Design**: Optimized for various screen sizes.

---

## Frontend

The frontend is developed using **React** with **TypeScript** for type safety and maintainability.

### Structure

- **`__testing__`**: Contains unit tests using Jest.
- **`Components`**: Reusable React components.
- **`Config`**: WebSocket configuration for real-time notifications.
- **`Context`**: 
  - **AnnouncementContext**: Manages state for announcements.
  - **ExamContext**: Manages state for exams.
  - **AuthenticationContext**: Handles authentication-related states.
- **`Hooks`**: 
  - Custom hooks for animations, authentication, and i18n translation.
- **`Layouts`**: Main layout used throughout the application.
- **`Locals`**: JSON files for translations (English and Arabic).
- **`Modals`**: TypeScript interfaces and models for consistent data typing.
- **`Pages`**: Contains all application pages.
- **`Redux`**:
  - Redux store and reducers for announcements and exams.
  - Context is used for authentication state management.
- **`Utils`**: Utility files, including reusable configurations like color palettes.

### Technologies Used

- **React**: Component-based frontend library.
- **Redux**: State management for announcements and exams.
- **TypeScript**: Static typing for JavaScript.
- **WebSocket**: Real-time communication.
- **i18n**: Localization and translation support.

---

## Backend

The backend is built using **Node.js**, **Express**, and **MongoDB**, following the **three-layer architecture** for clean separation of concerns.

### Structure

- **`Models`**: MongoDB schemas for announcements and exams.
- **`Controllers`**: 
  - Contains validation and non-database logic.
  - Separate controllers for announcements and exams.
- **`Repositories`**: Database operations, including add, get, update, and delete.
- **`Middlewares`**: 
  - Reusable code with access to `req` and `res`.
  - Includes error handlers for announcements and exams.
- **`MongoDB_connection`**: Handles database connectivity logic.
- **`Routes`**: 
  - Routes for announcements and exams.
- **`Utils`**: Reusable code without `req` and `res` access, such as validation logic.
- **`__tests__`**: Test files for the backend.
- **`Error`**: Contains a class for error handling.

### Technologies Used

- **Node.js**: JavaScript runtime for backend development.
- **Express**: Web framework for building APIs.
- **MongoDB**: NoSQL database for data storage.
- **Jest**: Testing framework for unit tests.
- **WebSocket**: Real-time notification delivery.

---

## How to Use

### Prerequisites

Ensure you have the following installed:
- Node.js
- npm or yarn

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/alimagdi12/exam-task.git
   ```
2. Navigate to the project directory.

### Run the Frontend

1. Navigate to the frontend directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Run the Backend

1. Navigate to the backend directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```

---

## Usage

1. Open the application in your browser.
2. Click the **Login** button to access the dashboard.
3. Use the **Navbar**:
   - **Toggle Sidebar**: Expand or collapse the sidebar.
   - **Language Selector (EN/AR)**: Switch between English and Arabic.
   - **Notification Icon**: View real-time notifications.
   - **User Icon**: Log out.
4. Manage **Announcements**:
   - Click the **+** icon in the announcement section to add announcements.
   - Edit or delete existing announcements.
5. Manage **Exams**:
   - Click the **+** icon in the exam section to add exams.
   - Edit or delete existing exams.
   - Receive notifications upon adding an exam.

---

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

---

## License

This project is licensed under ali magdi.

---

## Contact

For inquiries or feedback, please contact [alimagdi12367@gmail.com](mailto:alimagdi12367@gmail.com).
