# Sea Catch Adventure Frontend
Welcome to the frontend repository of Sea Catch Adventure, a catch game and leaderboard web application built with HTML, CSS, and JavaScript.

## Introduction
Sea Catch Adventure is a web application designed to provide users with an entertaining catch game experience while also allowing them to compete for high scores on a global leaderboard.


## Sea Catch Adventure Backend
For the backend functionality of Sea Catch Adventure, please refer to the [Sea Catch Adventure Backend Repository](https://github.com/MathieuParadis/catcher-game-api).

The backend repository contains the server-side code built with Ruby on Rails, including API endpoints, database management, and other backend functionalities.


## Installation and Setup
Before running the frontend app, ensure that the backend server is running in the development environment. The frontend app communicates with the backend API endpoints to fetch data and submit scores. If the backend server is not running, the frontend may not function as expected.

To run the backend server in development mode, navigate to the backend repository and start the server using the following command:
```bash
	rails server -p 3000
```


1. Clone this repository to your local machine
```
	git clone https://github.com/MathieuParadis/catcher-game.git
```

2. Navigate to the project directory
```bash
  cd catcher-game
```

3. Install the package dependencies by running
```
	npm install
```

4. Start the server by running
```
	npm start
```

5. Open your web browser and navigate to `http://localhost:3001`.


## Technologies Used
* ReactJS
* HTML5
* CSS3
* Tailwind CSS


## Folder Structure
- `src/`: Contains the source code for the React components and application logic.
  - `components/`: Contains React components for the catch game and leaderboard.
- `App.js`: Main React component for rendering the application.
- `index.js`: Entry point for the React application.
- `public/`: Contains the `index.html` file and other static assets.


## Enhancements
### Real-Time Score Updates
Integrate WebSocket communication using libraries like Socket.io or GraphQL subscriptions to provide real-time score updates.
