# JukaiNLP Web
<p align="center"><img src="https://github.com/hshindo/jukainlp-web/blob/master/jukainlp-web.png" width="200"></p>

## Setup
```
npm install -g npm
npm install -g babel webpack webpack-dev-server
```

Then, clone the repository.
```
git clone https://github.com/hshindo/jukainlp-web.git
```

Install dependencies for `node_modules` listed in package.json.
```
npm install
```

## Start
```
npm start
```
Open your browser: `localhost:7777` provided by `webpack-dev-server`.

## Directory tree
```
.
├── node_modules
├── public
|   ├── javascripts
|   |   ├── lib
|   |   |   ├── annotation_log.js
|   |   |   ├── configuration.js
|   |   |   ├── dispatcher.js
|   |   |   ├── head.load.min.js
|   |   |   ├── jquery.min.js
|   |   |   ├── jquery.svg.min.js
|   |   |   ├── jquery.svgdom.min.js
|   |   |   ├── url_monitor.js
|   |   |   ├── util.js
|   |   |   ├── visualizer.js
|   |   |   ├── webfont.js
|   |   ├── adjust-dom-size.js
|   |   ├── websocket-func.js
|   └── stylesheets
|   |   ├── static
|   |   |   ├── fonts
|   |   |   |   ├── Astloch-Bold.ttf
|   |   |   |   ├── Liberation_Sans-Regular.ttf
|   |   |   |   ├── PT_Sans-Caption-Web-Regular.ttf
|   |   ├── jukainlp-app.css
|   |   ├── style-vis.css
|   └── favicon.png
|   └── index.html
├── src
|   ├── actions
|   |   ├── index.js
|   ├── components
|   |   ├── AppMenuBar.js
|   |   ├── JukaiApp.js
|   |   ├── MenuAnalPart.js
|   |   ├── MenuLangPart.js
|   |   ├── MenuTransPart.js
|   |   ├── StatusBar.js
|   ├── reducers
|   |   ├── index.js
|   ├── index.js
├── .gitignore
├── package.json
├── README.md
├── screenshot.png
├── webpack.config.js
```

- ./node_modules: node package modules which are used for React, Material UI and so on. They are automatically installed by `$ npm install` according to **package.json**.

- ./public/javascripts/lib: JavaScript library files necessary for customized **Brat** Annotation Tool in the right side. `visualizer.js` is modified for additional view setting. *Modifications* are commented with the word `suisun`.

- ./public/javascripts/adjust-dom-size.js: a JavaScript file that performs additional responsiveness for UI.

- ./public/javascripts/websocket-func.js: that's a **main** JavaScript file for websocket communication and functionalities.

- ./public/stylesheets/static/fonts: font files which are referred by **Brat** Annotation Tool. *Deprecated* now as `Noto` font is used for customized annotation viewer.

- ./public/stylesheets/jukainlp-app.css, style-vis.css: stylesheet files for detailed decoration of components.

- ./public/favicon.png: an image file for web icon.

- ./public/index.html: a **main** HTML page.

- ./src: a folder for **React** components and `Redux` reducers.

- package.json:  a package handler of JSON format which lists dependencies for the project.

- webpack.config.js: a configuration file for `webpack-dev-server` which provides **React** environment.
