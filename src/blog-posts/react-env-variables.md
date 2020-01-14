---
path: /blog/react-envvariables
date: 2020-01-13
tags: [react, env, config]
title: Using Environment Variables in the Client Side of your Create React App
summary: Custom environment variables are a convenient way to allow other developers to customize use of your app for their deployment, keep separate configurations for your dev, production and test environments separate and keeping your private API keys off of GitHub.  However when you are setting up a framework for building client side rendered apps, like the team behind Create React App were you can't just have a copy of the process.env object from Node on the client side.  Allowing that would expose way too much about the server the app is running on to clients!  This presents a possible security risk.
---

# Using Environment Variables in the Client Side of your Create React App
Custom environment variables are a convenient way to allow other developers to customize use of your app for their deployment, keep separate configurations for your dev, production and test environments separate and keeping your private API keys off of GitHub.  

However when you are setting up a framework for building client side rendered apps, like the team behind Create React App were you can't just have a copy of the process.env object from Node on the client side.  Allowing that would expose way too much about the server the app is running on to clients!  This presents a possible security risk.

How Create React App tackles this problem is by only exposing a small subset of environment variables to the client.  Namely general variables like NODE_ENV, PUBLIC_URL in addition to any variable starting with "REACT_APP_" all other variables will be ignored.   Additionally Create React App will pull from environment variables from the .env files in the root of your project.  We can test this like this...
 1.  Add 2 variables to a file called .env in the root of your project
  ``` 
  ./.env
  REACT_APP_PUBLIC_FOO=FOO
  PRIVATE_BAR=BAR
 ```
 
 2. Add this line to the render method of your App.js
  ```javascript
  render(){
	retrun <h1>{process.env.REACT_APP_PUBLIC_FOO} {process.env.PRIVATE_BAR}</h1>
}
 ```
 
 That's it, open up your browser to localhost:3000 or whatever you defined PORT as.  Nottice you will only see a header with the text "FOO" this is because PRIVATE_BAR is private it will still be available to your Node process if you are using [dotenv](https://www.npmjs.com/package/dotenv), but your client app will have no access to those secret variables!