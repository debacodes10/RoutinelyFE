# Routinely

Routinely is a mobile app designed to help students manage their college life efficiently and stay up to date with university work. The app enables students to track and schedule lectures, set reminders for assignments and submissions, and add quick notes for easy reference.

## Tech Stack

### Frontend
- **React Native** – for building the mobile app

### Backend
- **Node.js** – server-side runtime
- **Express.js** – web framework for Node.js
- **MongoDB** – NoSQL database for storing user data

### Authentication & Storage
- **Supabase** – for authentication and managing storage buckets

## Features
- **Lecture Scheduling:** Track and schedule lectures seamlessly
- **Assignment Reminders:** Set reminders for assignments and submissions
- **Quick Notes:** Add small notes to keep track of important tasks
- **Cross-Platform Support:** Currently optimized for iOS, with planned support for Android

## Installation & Setup

### Prerequisites
- **Node.js** (>=16.x)
- **Yarn** (Recommended for package management)
- **React Native CLI** (for running on a simulator/device)

### Clone the Repository
```sh
  git clone https://github.com/debacodes10/RoutinelyFE.git
  cd RoutinelyFE
```

### Install Dependencies
```sh
  yarn install
```

### Setup Environment Variables
1. Rename `.env.example` to `.env`
2. Fill in your own Supabase credentials and server details

### Run the App
#### iOS (Mac required for development)
```sh
  yarn run ios
```

#### Android (Planned support in future updates)
```sh
  yarn run android
```

## Contributing
Contributions are welcome! Feel free to open issues and pull requests to improve the project.

## License
This project is licensed under the **MIT License**. See [LICENSE](LICENSE) for more details.

## Contact
For questions or feedback, reach out to me on GitHub or at [mdebadyuti10@gmail.com](mailto:mdebadyuti@gmail.com).

