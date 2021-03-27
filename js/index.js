// Variables requiring node modules to be installed
const inquirer = require('inquirer');
const fs = require('fs');

inquirer
  .prompt([
    {
      type: 'input',
      message: 'What is the title of your README?',
      name: 'title',
    },
    {
      type: 'editor',
      message: 'Give a short decscription of your project:',
      name: 'description',
    },
    {
      type: 'editor',
      message: 'Give the steps required to install your project:',
      name: 'install',
    },
    {
      type: 'list',
      message: 'Choose a license:',
      choices: [
        "No License",
        "GNU GPLv3",
        "MIT License"
      ],
      name: 'license',
    },
    {
      type: "editor",
      message: "Provide instructions and examples for use:",
      name: "usage"
    },
    {
      type: "editor",
      message: "Enter instructions for making contributions:",
      name: "contributions" 
    },
    {
      type: "editor",
      message: "Enter test instructions:",
      name: "test" 
    },
    {
      type: "input",
      message: "Please enter your GitHub username:",
      name: "github" 
    },
    {
      type: "input",
      message: "Please enter your email address:",
      name: "email" 
    },
  ])
  .then((responses) => {
    
    let licInfo = "This project does not have a license.";
    let showLic = "None";
    if(responses.license === "MIT License"){
      licInfo = "This project uses a MIT License.";
      showLic = "MIT";
    }else if(responses.license === "GNU GPLv3"){
      licInfo = "This project uses a GNU GPLv3 License.";
      showLic = "GNU GPLv3";
    }

    // Use ${responses.<name>} to access users answers
    const infoDisplay = `# ${responses.title} ![License badge](https://img.shields.io/badge/license-${showLic}-blue.svg)
${responses.description}
## Table of Contents:
1. [Installation](#installation)
2. [Usage](#usage)
3. [License](#license)
4. [Contributing](#contributing)
5. [Tests](#tests)
6. [Questions](#questions)
## Installation
${responses.install}
## Usage
${responses.usage}
## License
${licInfo}
## Contributing
${responses.contributions}
## Tests
${responses.test}
## Questions
GitHub: [${responses.github}](https://github.com/${responses.github})
Additional questions? Email me at ${responses.email}
    `;
  fs.writeFile('README2.md', infoDisplay, (err) =>
    err ? console.log(err) : console.log('Successfully created README!')
    );   
});