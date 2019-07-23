# Capital One built this project to help the users of this API. We are no longer actively enhancing this API. We have archived the project as of Jul 23 2019 where it will be available in a read-only state.

## Capitalone OAO Demo app

A simple starter project demonstrating on how to use capitalone public api to create an account.

| **Note** | As of 08/15/2017, Bank Account Starter API has released a version 2 which is the only version supported in Production. The reference application code built against version 1 (branch: bas-v1) is preserved for history only and should not be used past 08/15/2017. 'master' branch is updated to use version 2 of BAS API. |
| ---- | ---- |

### Usage
- Clone or fork this repository
- Make sure you have [node.js](https://nodejs.org/) installed version 5+
- Make sure you have NPM installed version 3+
- `WINDOWS ONLY` run `npm install -g webpack webpack-dev-server typings typescript` to install global dependencies
- run `npm install` to install dependencies
- `WINDOWS ONLY` run `npm run typings-install` to install typings
- run `npm start` to fire up dev server
- open browser to [`http://localhost:8001`](http://localhost:8001)

### Debug
Although the reference application doesn’t write a formal log file, it does write all of the received JSON responses to the terminal window; you can use this information to match what you’re seeing in the app’s UI with the data the API is returning.
- ```DEBUG=http npm start``` : starts the app in debug mode where you can see the request/responses from the app to api

## Contributors
We welcome your interest in Capital One’s Open Source Projects (the “Project”). Any Contributor to the Project must accept and sign a CLA indicating agreement to the license terms. Except for the license granted in this CLA to Capital One and to recipients of software distributed by Capital One, You reserve all right, title, and interest in and to your Contributions; this CLA does not impact your rights to use your own contributions for any other purpose.

##### [Link to CLA] (https://docs.google.com/forms/d/19LpBBjykHPox18vrZvBbZUcK6gQTj7qv1O5hCduAZFU/viewform)

This project adheres to the [Open Source Code of Conduct][code-of-conduct]. By participating, you are expected to honor this code.

[code-of-conduct]: https://developer.capitalone.com/single/code-of-conduct/

### Contribution Guidelines
We encourage any contributions that align with the intent of this project and add more functionality or languages that other developers can make use of. To contribute to the project, please submit a PR for our review. Before contributing any source code, familiarize yourself with the Apache License 2.0 (LICENSE.txt), which controls the licensing for this project.
