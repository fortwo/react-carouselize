# Contributing

All forms of contribution are welcome, from issue reports to PRs and documentation.

* If you open an issue and are interested in working on a fix, please let us know.
* Make sure there's an issue open for any work you take on and intend to submit as a pull request.
* Make sure to write documentation for all new features and changes.
* Ensure all the examples work correctly after your changes.

**Thanks for your interest!**

## How to contribute
### Prerequisites

[Node.js](http://nodejs.org/) >= 6 must be installed.

### Installation

- Running `npm install` in the component's root directory will install everything you need for development.

### Demo Development Server

- `npm start` will run a development server with the component's demo app at [http://localhost:3000](http://localhost:3000) with hot module reloading.

### Running Tests

- `npm test` will run the tests once.

- `npm run test:coverage` will run the tests and produce a coverage report in `coverage/`.

- `npm run test:watch` will run the tests on every change.

### Building

- `npm run build` will build the component for publishing to npm and also bundle the demo app.

- `npm run clean` will delete built resources.
