const { spawnSync } = require("child_process");

describe("Integration Tests", () => {
  it("should handle reading from a file", () => {
    const scriptPath = "./main/index.js"; 

    // Define the test input data file
    const inputFile = "test_input.txt";

    // Create a temporary test input file
    const inputData =
      "1426828011 9\n1426828028 350\n1426828037 25\n1426828056 231\n1426828058 109\n1426828066 111\n";
    require("fs").writeFileSync(inputFile, inputData);

    // Set the value of X
    const maxCount = 3;

    // Run script using spawnSync
    const result = spawnSync(
      "node",
      [scriptPath, "-x", maxCount, "-f", inputFile],
      {
        encoding: "utf-8",
      }
    );

    // Capture the output and exit code
    const output = result.stdout;
    const exitCode = result.status;

    // Clean up: Remove the temporary test input file
    require("fs").unlinkSync(inputFile);

    // Assert that the exit code is 0 (success)
    expect(exitCode).toBe(0);

    // Assert the output matches the expected result (in ascending order)
    expect(output.trim().split("\n")).toEqual([
      "1426828028",
      "1426828056",
      "1426828066",
    ]);
  });

  it("should handle reading from stdin with manual data entry", () => {
    const scriptPath = "./main/index.js"; 

    // Define the test input data
    const inputData =
      "1426828011 9\n1426828028 350\n1426828037 25\n1426828056 231\n1426828058 109\n1426828066 111\n";

    // Set the value of X
    const maxCount = 3;

    // Run script using spawnSync and provide input through stdin
    const result = spawnSync("node", [scriptPath, "-x", maxCount], {
      input: inputData,
      encoding: "utf-8",
    });

    // Capture the output and exit code
    const output = result.stdout;
    const exitCode = result.status;

    // Assert that the exit code is 0 (success)
    expect(exitCode).toBe(0);

    // Assert the output matches the expected result (in ascending order)
    expect(output.trim().split("\n")).toEqual([
      "1426828028",
      "1426828056",
      "1426828066",
    ]);
  });
});
