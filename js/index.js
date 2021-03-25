// Variables requiring node modules to be installed
const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");
const http = require('http');
const PDFDocument = require('pdfkit');

const hostname = '127.0.0.1';
const port = 3000;

// Require axios
const axios = require("axios");

// Code to generate server
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

// User quesions array
const questions = [{
        type: "input",
        name: "github",
        message: "Enter your GitHub Username"
    },
    {
        type: "input",
        name: "email",
        message: "Enter your e-mail address"
    },
    {
        type: "input",
        name: "repo",
        message: "Enter the name of your GitHub repository"
    },
    {
        type: "input",
        name: "projectTitle",
        message: "Enter the title of your project"
    }
];

// Prompt user for questions using inquirer
inquirer.prompt(questions).then(answers => {
    // call getGitHubProfileInfo function
    console.log(JSON.stringify(answers, null, '  '));
    getGitHubProfileInfo(answers.github, answers.email, answers.repo, answers.projectTitle);

});

// Function for retrieving user GitHub Profile information based on their responses
async function getGitHubProfileInfo(user, email, repo, title) {

    // Use axios to make an API call to retrieve the user's GitHub information
    const { data } = await axios.get(
        `https://api.github.com/users/${user}`
    );

    data.email = email;

    // Generate a URL for their GitHub profile based on the response
    const repoURL = `https://github.com/${user}/${repo}`;

    console.log("Data: ", data);
    console.log("Reo URL: ", repoURL);
    console.log("Project title: ", title);

    // Turn the results into a string
    const stringData = JSON.stringify(data, null, '  ');

    // Variable containing code for readme template to be generated
    const result = `
# Title: ${title} 
## Description 
## Table of Contents
## Installation
## Usage
## License
## Contributing
## Tests
## Questions
* User GitHub profile picture:
![alt text](${data.avatar_url} "User GitHub Profile Picture")
* User GitHub profile username: [${data.login}](${data.html_url})
* User GitHub email: [${data.email}](mailto:${data.email})
* User GitHub repository: ${repoURL}
`;

    // Log results
    console.log(result);

    // Write to a readme file
    fs.writeFile("readmetemplate.md", result, function(err) {
        if (err) return console.log(err);
    });

    console.log(data.avatar_url);

    // Close server when complete
    server.close();
}