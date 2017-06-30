# Template App

**Phonegap** template for create projects with npm libraries that uses *ES6* Features (**JavaScript**)


### Steps
 
+ `git clone git@10.25.253.3:DPD/phonegap-template.git`
+ Edit **package.json** => 
   + **widget** => id="change.me.please"
   + **name**
   + **description**
   + **author**
+ Edit **config.xml** =>
   + `<name>`
   + `<description>`
   + `<author>`


### Running

+ `npm run build` => Executes build of the **/src** folder: Creates *index.js* and *index.js.map* file into **www/js/** folder
+ `cordova platform add android@5.1.1`
+ Plug device via **USB**
+ `adb devices` => If this command shows your device plugged then last step:
+ `cordova run android --device`
