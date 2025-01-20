# Game Tracker

This website serves as a library for tracking game progression. It addresses the problem of managing multiple gaming platforms with different game libraries, which can make it confusing to keep track of owned games across various applications. The webpage allows users to create a personalized list of games they have played, are currently playing, or plan to play. Additionally, users can rate games, turning the platform into a review site of sorts. For each game, it is possible to add notes about gameplay or personal thoughts.

## Features
 - Browse through all existing games in the RAWG database.
 - Save games to a local cache with information such as progress and score.
 - View all saved games along with their associated information.
 - Export and Import data as a JSON file.

## How to Run
 1. Close the repository: `git clone https://github.com/egrythor/Game-Tracker.git`
 2. Navigate to the project folder: `cd '.\Game Tracker\'`
 3. Install dependencies: `npm install` or `yarn install`
 4. Start the app: `npm run dev` or `yarn run dev`

## Backend
This project uses a local backend server. To use it:
 1. Navigate to the `backend` folder: `cd .\backend\`
 2. Install server dependencies: `npm install` or `yarn install`
 3. Start the server: `node server.js` (default port: 3001)

## Environment Variables
This project uses the RAWG API, which you can access at [RAWG API DOCS](https://rawg.io/apidocs).
Create an `.env` file in the root directory and include the following line:
VITE_CLIENT_ID=your-api-key-here

## Future Plans
 - Allow users to add games without requiring a rating.
 - Enable progress and score updates directly from the list.
 - Remove sorting options above the list.
 - Improve the order in which unrated games are displayed.
 - Add the ability to delete games directly from the list.
 - Implement a "revert change" functionality.
 - Complete the import subpage functionality.
 - Limit activity logging to the last three changes.
 - Create a detailed log of changes made to the site.
 - Add a "source" subpage.
 - Perform comprehensive tests.