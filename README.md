# SundarGrove Mangrove Conservation Platform

## Overview
SundarGrove is a full-stack web application built to empower communities in mangrove conservation. Through a blend of technology, gamification, and collaboration, users can actively report threats, visualize mangrove regions, and track their eco-friendly contributions. The platform encourages participation by rewarding users with points and badges for positive actions, while admins oversee moderation and management to ensure data quality and engagement.

## Features
- **User Dashboard**: Guardians can register, log in, and manage their profile, including tracking points, badges, and report history. The dashboard is designed for clarity and motivation, showing progress and achievements.
- **Reporting**: Users can submit detailed reports of mangrove threats, upload images, and receive instant feedback via a built-in prediction API. The reporting flow is streamlined for quick and accurate submissions.
- **Map Visualization**: An interactive map displays mangrove regions and user reports, using color-coded pins to indicate status (pending, confirmed, flagged). Users can explore region-wise data and click markers for more details.
- **Gamification**: Earn points and badges for accepted reports and verified contributions. The leaderboard highlights top contributors, fostering friendly competition and community spirit.
- **Admin Panel**: Admins have access to a modern dashboard to manage users, moderate reports, and view platform statistics. All management tools are styled for clarity and usability.
- **Notifications**: Users receive real-time alerts for accepted reports, point awards, and other important actions, keeping them engaged and informed.
- **Responsive Design**: The UI is fully responsive, featuring modern styling, smooth animations, and an eco-friendly color palette for a pleasant user experience on any device.

## Tech Stack
- **Frontend**: Built with React and Redux for robust state management, styled using Tailwind CSS and Framer Motion for modern, animated interfaces. React-Leaflet powers the interactive map, and Vite ensures fast development and builds.
- **Backend**: Node.js and Express provide the API layer, with MongoDB and Mongoose for data storage and modeling. The backend handles authentication, report management, and user moderation.
- **Prediction API**: A Python-based service (Flask or FastAPI) processes uploaded images to predict mangrove threats, integrating machine learning for instant feedback.
- **Authentication**: Secure JWT-based authentication with role-based access control for Guardians and Admins.

## Key Files & Structure
```
frontend/
  src/
    components/
      User/        # Profile, Login, Register
      Reports/     # MyReports, CreateReport
      Home/        # Homepage, FloatingNavBar
      Admin/       # AdminManagement, ManageUsers, ModerateReports
      Leaderboard/ # Leaderboard
      map.jsx      # Map visualization
    assets/        # Images (SG-Logo, SG-1, SG-2, LOGO)
  public/
  package.json
  vite.config.js
backend/
  controllers/     # user.controller.js, predict.controller.js
  models/          # user.models.js
  routes/
  package.json
  config/

README.md
```

## How It Works
- **Reporting**: Users submit reports with images, which are sent to a prediction API for analysis. If accepted, users earn points and receive notifications. The reporting process is designed to be quick, accurate, and rewarding.
- **Profile**: User profiles display points, badges, and report counts, updating dynamically as users participate. Achievements and progress are highlighted to encourage ongoing engagement.
- **Admin**: Admins can verify or reject reports, manage user roles, and oversee platform activity. All management pages are styled for clarity, with intuitive controls and feedback.
- **Map**: Reports are visualized on an interactive map, with pins colored by status. Clicking a marker reveals detailed information about the report and region.


*SundarGrove empowers communities to protect mangroves through technology, gamification, and collaboration. Join us in making a positive impact on the environment!*


