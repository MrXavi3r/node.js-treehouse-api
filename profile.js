//we need a simple way to look at a user's badge count and javascript points
// solution: use node.js to connect to Treehouse API to get profile information

//require https
const https = require("https");
//require http for status codes
const http = require("http");

//function to print message to console
printMessage = (username, badgeCount, points) => {
  const message = `${username} has ${badgeCount} total badge(s) and ${points} points in JavaScript`;
  console.log(message);
};

printError = (error) => {
  console.error(error.message);
};

function get(username) {
  try {
    //connect to API URL {https://teamtreehouse.com/xavierritch2.json}
    const request = https.get(
      `https://teamtreehouse.com/${username}.json`,
      (response) => {
        if (response.statusCode === 200) {
          let body = "";
          //read the data
          response.on("data", (data) => {
            body += data.toString();
          });

          response.on("end", () => {
            try {
              //parse the data
              const profile = JSON.parse(body);
              //print the data
              printMessage(
                username,
                profile.badges.length,
                profile.points.JavaScript
              );
            } catch (error) {
              printError(error);
            }
          });
        } else {
          const message = `There was an error getting the profile for ${username} (${
            http.STATUS_CODES[response.statusCode]
          })`;
          const statusCodeError = new Error(message);
          printError(statusCodeError);
        }
      }
    );
  } catch {
      //need to find out why this code block below doesn't run
    request.on("error", (response) => {
      console.error(
        `Problem with request: ${http.STATUS_CODES[response.statusCode]}`
      );
    });
  }
}

module.exports.get = get;
