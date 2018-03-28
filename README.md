# Template App

**Phonegap** template for create projects with npm libraries that uses *ES6* Features (**JavaScript**)


### Steps
 
+ `git clone git@github.com:saczuac/phonegap-es6-kit.git`
+ `mv phonegap-template project-name`
+ `cd project-name`
+ `git remote rm origin` => Change origin to the remote repo
+ Edit **package.json** => 
   + **name** => Must be sluggable name like: hello-world
   + **description**
   + **author**
+ Edit **config.xml** =>
   + **widget** => id="change.me.please"
   + `<name>`
   + `<description>`
   + `<author>`


### Running

+ `npm start` => Executes build of the **/src** folder: Creates *index.js* and *index.js.map* file into **www/js/** folder
+ `npm run build-android` => Executes build for android platform
+ Plug device via **USB**
+ `adb devices` => If this command shows your device plugged then last step:
+ `cordova run android --device`
+ 

### Commands

+ `./template create-page -t "hello"` => Creates the file Hello.js and Hello.css in ./src/pages/Hello/ folder (creates it if it does not exists in the filesystem)
+ When you create a page with the previuos command you must:
    + Set this page in "config.js" file (var pages), e.g.:

```javascript

const Config = {
    init() {
    	this.serverUrl = 'http://localhost:8000' // URL where server app is running
    	this.timeout = 3 // Number of seconds before a timeout function is triggered
    	this.connTries = 3
    	this.validStorage = 1800 //Number of seconds the caché storage from APIs is valid
    	this.resources = [ // Resources to binding the APIs
    		// 'resources',
    		// 'from',
    		// 'server',
    		'notification',
    	]

        this.pages = [ // The name of page must be the same of the folder and the js page file, example if you put 'Search' as a page here, module will lookup for pages/Search/Search.js
            'Search',
            'Hello', //Here!!!!
        ]

        this.search = false
        this.hasNotifications = false // If has notifications this app will trigger the notifications API
        this.aside = true // shows menu aside
        this.lockOrientation = true // Lock orientation of device or not
        this.productionJSPath = '/home/app/template-app/build' // Path to build assets "npm run build:production"
        this.recordsPerPage = 2 // Paginator Conf
    },
};

export default Config

```
    + Set the reference to this page in the "./src/pages/index.js" file like the above:
    
```javascript

import Home from 'pages/Home/Home';
import Menu from 'pages/Menu/Menu';
import Table from 'pages/Table/Table';
import Search from 'pages/Search/Search';
import Hello from 'pages/Hello/Hello';

export default {
	Table,
	Search,
	Menu,
	Home,
	Hello
};

```

