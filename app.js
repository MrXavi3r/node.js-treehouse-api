//['xavierritch2', 'chalkers', 'davemcfarland']

const profile = require('./profile')


//stores arguments passed to command line in an array for use in command line 
const users = process.argv.slice(2);

//loops over users array and passes arguments to get function in profile.js
users.forEach(profile.get);
