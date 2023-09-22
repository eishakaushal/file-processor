# Challenge

This is a Node.js based solution to the challenge, which reads a list of values and IDs from a file or stdin, processes the data, and outputs the IDs associated with the X-largest values.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- [Node.js](https://nodejs.org/) installed on your computer.

## Installation

1. Run `npm install -g`

## Usage

To run the program, use the `run` command followed by the options:

- `-f <file-path>`: Specify the absolute path of the input file.
- `-X <X-value>`: Specify the value of X (a required option).

If you want to provide data manually via stdin, simply run `run -X <X-value>` and enter data manually.

## Tests

To run the tests, run `npm run test`
