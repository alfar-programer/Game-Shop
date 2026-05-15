# NexusPay Gaming Top-up Platform MVP

This is a modern React + Vite application featuring a premium admin dashboard with dark gaming neon aesthetics, built with Tailwind CSS, Framer Motion, and Firebase.

## Setup Instructions

1. **Prerequisites**: Make sure you have Node.js installed.
2. **Install Dependencies**: 
   If they weren't installed automatically, open a terminal in the project directory and run:
   ```bash
   npm install
   ```

3. **Firebase Configuration**:
   - Go to [Firebase Console](https://console.firebase.google.com/) and create a project.
   - Enable **Firebase Authentication** (Email/Password).
   - Enable **Firestore Database** (Create Database in test mode or with appropriate security rules).
   - In your Firebase Project Overview, add a Web App to get your config object.
   - Open `src/lib/firebase.js` and replace the placeholder `firebaseConfig` variables with your actual keys.

4. **Start the Development Server**:
   ```bash
   npm run dev
   ```

## Features Included
- **Authentication**: Fully functional Login and Register flow with real Firebase Auth and user profile storage in Firestore (`name`, `email`, `phone`, `createdAt`).
- **Dashboard Layout**: Protected routing keeping regular and non-authenticated users out. Premium dark-gaming responsive sidebar and top navigation.
- **System Overview**: Animated statistics for total registered users, fake revenue, and server loads.
- **Users Matrix**: Interactive, animated grid list of all registered users connecting to individual profiles.
- **Detailed User Profiles**: A single-user view replacing standard tables, displaying account metadata and actions.
- **Order Tracking**: Visual mockups for managing top-ups.
