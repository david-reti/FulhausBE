# Fulhaus Technical Assessment - Backend - David Reti

This is the backend component of my technical assessment for Fulhaus. It is mostly self-contained, however it does need an existing MongoDB instance to connect to. Before the application can be started, some configuration needs to be done:

## Setup

After cloning the repository:

- Create your `.env` file in the application's root directory - this is where the database connection string and port number need to be placed. An example file can be found at [./samples/.env.sample](./samples/.env.sample)
- Install dependencies by running `npm i` in the app's root directory

## Usage

The application has two scripts configured:

- Run in development: `npm run dev` - this will start the server and enable live reloading when source files are edited
- Run unit tests: `npm test` - this will run all the unit tests for this app and display the results

## Endpoints

Currently, basic CRUD operations for supported for the acronym resource. These are:

- `GET /acronym`: return a list of acronyms, sorted by acronym name
    - ### Query Params:
        - `limit`: the maximum number of objects per page (integer)
        - `page`: the page of query results to show (integer)
        - `search`: case insensitive string of acronym to find (string)
    - ### Returns:
        - `page`: the current page being shown (integer)
        - `objects`: the number of results being shown (integer)
        - `next`: if there are more objects that can be shown, this is the URL to show them - otherwise null
        - `results`: list of objects representing the acronyms that have been found

- `POST /acronym`: create a new acronym 
- `PATCH /acronym`: update an existing acronym
- `DELETE acronym`: delete an existing acronym
