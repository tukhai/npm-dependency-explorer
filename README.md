## Introduction

This project is a part of React Frontend Quiz

You’ll be building an application that functions as a dependency explorer for packages in public npm registry. 
<br><br>
The application will list all the unique dependencies, including sub-dependencies of a given package.
<br><br>
For example, react has 4 main dependencies, i.e. loose-envify, object-assign, prop-types,
scheduler. The application is supposed to fetch the dependencies of all these packages too. Eventually, there
should be 6 unique dependencies displayed for react.

#### Technical Requirements
- You can build the application for web or mobile using React or React Native.

- You can retrieve the package dependencies information using this endpoint ht<span>tp</span>s://npm-registry-
proxy.glitch.me/{packageName}/latest, e.g. https://npm-registry-proxy.glitch.me/react/latest

- You can retrieve the list of suggested package for a given search string using this endpoint
ht<span>tp</span>s://npm-registry-proxy.glitch.me/search/suggestions?q={search}, e.g.
https://npm-registry-proxy.glitch.me/search/suggestions?q=reac.

- Your solution is only required to work in the latest stable version of Chrome at time of interview so you may
use anything native to the browser (i.e. no need to include polyfills).

- You are free to use external libraries as you would in production. Choice of third-party plugins (if any) will also be part of the evaluation, so explain in comment whenever possible to justify your inclusion.

- The only requirement for layout is to roughly follow the structure of the given mockup. Feel free to add your
own touch, the user experience will be part of the evaluation.

- You should assume that your solution is meant for production use by real users and will be maintained by
your colleagues.

- Feel free to justify any assumption made in comments.


## Project Accessing

### Deployment

This project has been deployed at: [https://npm-dependency-explorer-app.herokuapp.com/](https://npm-dependency-explorer-app.herokuapp.com/) <br>
Please visit the url to access the project.

### Project clone
Alternatively, you can clone this project code. <br>
Make sure node and npm are installed in your local machine: `brew install node` <br><br>
In the project root directory, you can run it in 1 of the following modes: <br>

`npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

`npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!


## Explaination

### Page /package-overview: How to get all the dependencies?
The main logic for this is, we'll fetch multiple APIs by layers. For example package "react" (0th layer) has 4 direct dependencies: [loose-envify, object-assign, prop-types, scheduler], which is considered 1st layer.
<br><br> 
We'll get all dependencies' names of each package in 1st layer, filter all the packages that has already been fetched in the above layers (0th & 1st) to get 2nd layer, which contains [js-tokens, react-is].
<br><br>
Continuing to do the same thing for 2nd layer, we'll get 3rd layer with no package (empty array). Once we get to the empty array, we'll stop this fetching process.

### Can not access private package info
One problem is the private package like, for example [https://npm-registry-proxy.glitch.me/@sindresorhus/is/latest](https://npm-registry-proxy.glitch.me/@sindresorhus/is/latest) <br>
can not be accessed. It's solved by checking if the package name contain "@" to know if it's private or not. If private, we'll accounce to user that "private package" can not be accessed.