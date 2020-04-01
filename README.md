# 350-Final
## CMPT 350 2020 Winter Final Project

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How to run this project
first you need to create a local version of our repo, on the command line cd
into your favourite directory and run:
```
git clone https://github.com/deeox2/350-Final.git
```
after that completes you'll need to install all of the nodeJS modules that the
projects depends on. This can be done by running the following commands
```
cd 350-final/hello-world/
npm install
```
then, just to be safe you should run the following command to fix and vulnerabilities
```
npm audit fix
```
both these will take about 30-45 seconds each
now you're ready to start using the project!

you're going to need two command line tabs/windows in order to run both of our
layers
In the project directory on the first command line, run the following commands:
```
flask run
```
this will start up the back end server
next, in the second tab/window run:
```
npm start
```
this will launch the front end react app. after a few seconds the app will
launch your browser and open up our website automatically.

you are now free to interact with the forum!


<details>
<summary>Here's some npm and react info that may be useful!</summary>
### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
</details>
