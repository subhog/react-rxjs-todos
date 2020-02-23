module.exports = {
  "name": "react-rxjs-todos",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "clsx": "1.1.0",
    "immer": "5.3.6",
    "node-uuid": "1.4.8",
    "react": "16.12.0",
    "react-dom": "16.12.0",
    "react-router-dom": "5.1.2",
    "rxjs": "6.5.4",
    "todomvc-app-css": "2.3.0",
    "todomvc-common": "1.0.5"
  },
  "devDependencies": {
    "react-scripts": "3.4.0"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject",
    "publish": "./publish.sh"
  },
  "homepage": "https://rxjs-cn.github.io/react-rxjs-todos/",
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all",
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
    ]
  }
}
