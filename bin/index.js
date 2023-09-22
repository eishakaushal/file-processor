#!/usr/bin/env node
const yargs = require("yargs");
const fs = require("fs");

//Time Complexity: O(N * log(N))
    //Reading Input Data: Reading data line by line has a time complexity of O(N), where N is the number of lines in the input data.
    //Parsing and Sorting: Parsing and sorting the data requires O(N * log(N)) time complexity, where N is the number of lines.

//Memory Complexity: O(N)
    //Reading Input Data: The program reads data line by line and stores it temporarily in memory. The memory usage for this part is O(N), where N is the number of lines.
    //Parsing and Sorting: Storing the value-ID pairs in memory and sorting them requires additional memory. The memory usage for this part is also O(N), where N is the number of lines.

// Define command-line options
const argv = yargs
  .option("file", {
    alias: "f",
    description: "Specify the absolute path of the input file",
    type: "string",
  })
  .option("x", {
    alias: "X",
    description: "Specify the value of X",
    type: "number",
    demandOption: true,
  }).argv;

const filePath = argv.file;

// Function to read data from a file or stdin
function readData(callback) {
  if (filePath) {
    // Read from the specified file if provided
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        console.error(`Error reading file: ${err.message}`);
        process.exit(1);
      }
      callback(data);
    });
  } else {
    // Read from stdin if no file path is provided
    let inputData = "";
    process.stdin.setEncoding("utf8");
    process.stdin.on("readable", () => {
      const chunk = process.stdin.read();
      if (chunk !== null) {
        inputData += chunk;
      }
    });
    process.stdin.on("end", () => {
      callback(inputData);
    });
    // Handle interactive input, e.g., when data is entered manually
    process.stdin.resume();
  }
}

// Function to process data and find IDs associated with the X-largest values
function processInputData(data) {
  // Split the input data into lines
  const lines = data.split("\n");
  const valueIdPairs = [];
  for (const line of lines) {
    const [id, value] = line.trim().split(" ");
    // Convert the value to a number
    const numericValue = parseInt(value);
    if (!isNaN(numericValue)) {
      valueIdPairs.push({ value: numericValue, id });
    }
  }
  // Sort the value-ID pairs in descending order based on values
  valueIdPairs.sort((a, b) => b.value - a.value);
  // Get the top X value-ID pairs
  const topXValueIdPairs = valueIdPairs.slice(0, argv.x);
  // Extract the IDs from the top X value-ID pairs
  const resultIds = topXValueIdPairs.map((pair) => pair.id);
  // Output the IDs for the top X values
  resultIds.forEach((id) => console.log(id));
}

// Start reading data and processing it
readData((data) => {
  processInputData(data);
});

module.exports = {
  readData,
  processInputData,
};
