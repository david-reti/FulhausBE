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

Currently, basic CRUD operations for supported for the acronym resource. All requests and responses are JSON objects with the supplied parameters. These are:

- `GET /acronym`: return a list of acronyms, sorted by acronym name
    - ### Query Params
        - `limit`: the maximum number of objects per page (integer)
        - `page`: the page of query results to show (integer)
        - `search`: case insensitive string of acronym to find (string)
    - ### Returns
        - `page`: the current page being shown (integer)
        - `objects`: the number of results being shown (integer)
        - `next`: if there are more objects that can be shown, this is the URL to show them - otherwise null (URL | null)
        - `results`: list of objects representing the acronyms that have been found (Acronym[])
        - status 200 (OK)

- `POST /acronym`: create a new acronym
    - ### Body Params
        - `acronym`: the name of the acronym to add (string)
        - `definition`: the definition of the acronym being added (string)
    - ### Returns
        - `message`: a message indicating the status of the operation (string)
        - status 201 (Created)

- `PATCH /acronym`: update an existing acronym
    - ### Body Params
        - `acronym`: the name of the acronym to update - required (string)
        - `definition`: the definition to update (string)
    - ### Returns
        - `message`: a message indicating the status of the operation (string)
        - status 200 (OK)

- `DELETE /acronym`: delete an existing acronym
    - ### Body Params
        - `acronym`: the name of the acronym to delete (string)
    - ### Returns
        - `message`: a message indicating the status of the operation (string)
        - status 200 (OK)

### Errors

In case there is an error, all the endpoints will include an array titled `errors` in the response, and this will contain a list of all the errors that occured.
