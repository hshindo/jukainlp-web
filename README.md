# JukaiNLP Web

[Try online demo!](#none)

---

## Setup infrastructure

**First**, install `node.js` and `npm` as you'd use **React** in Node environment.

Install **Homebrew** package manager.
```julia
$ ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```
Update Homebrew to ensure that it is up-to-date.
```julia
$ brew update
```
Now, install **Node** (**npm** will be installed with node):
```julia
$ brew install node
```
※ It is recommended that you'd keep **npm** version *up-to-date* !
```julia
$ npm install -g npm
```

**Then**, it's time to make a Global Package installation.

Required packages are: `babel`, `webpack` and `webpack-dev-server`.
```julia
$ npm install -g babel webpack webpack-dev-server
```
So it's all set to provide fundamental environment for React.

---

## Run React App

Clone the source from Git repo. For example,
```julia
$ git clone https://suisun_312@bitbucket.org/suisun_312/new_jukainlp.git
```
Install dependencies for `node_modules` listed in **package.json**.
```julia
$ npm install
```
OK !

Finally, it's up to you for running **JukaiNLP** demo built with `React` and `Material UI`.
```julia
$ npm start
```
Open your browser and listen to **`localhost:7777`** which is running by `webpack-dev-server`.

---

## Manual for Customization

Directory tree for this project is as follows:
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

- **./node_modules**: node package modules which are used for React, Material UI and so on. They are automatically installed by `$ npm install` according to **package.json**.
- **./public/javascripts/lib**: JavaScript library files necessary for customized **Brat** Annotation Tool in the right side. `visualizer.js` is modified for additional view setting. *Modifications* are commented with the word `suisun`.
- **./public/javascripts/adjust-dom-size.js**: a JavaScript file that performs additional responsiveness for UI.
- **./public/javascripts/websocket-func.js**: that's a **main** JavaScript file for websocket communication and functionalities.
- **./public/stylesheets/static/fonts**: font files which are referred by **Brat** Annotation Tool. *Deprecated* now as `Noto` font is used for customized annotation viewer.
- **./public/stylesheets/jukainlp-app.css, style-vis.css**: stylesheet files for detailed decoration of components.
- **./public/favicon.png**: an image file for web icon.
- **./public/index.html**: a **main** HTML page.
- **./src**: a folder for **React** components and `Redux` reducers.
- **package.json**:  a package handler of JSON format which lists dependencies for the project.
- **webpack.config.js**: a configuration file for `webpack-dev-server` which provides **React** environment.

---

`License: MIT`
