import Application from 'Application'
import Home from 'pages/Home';

/* 
    Phonegap Confs
*/

window.app = {

    initialize() { this.bindEvents() },

    bindEvents() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener("backbutton", this.onBackButton, false);
    },

    onDeviceReady() {
        Application.init();
    },

    onBackButton(){
        if (Application.current.page == pages.Home) {
            navigator.app.exitApp();
        } else {              
            Application.back();
        }
    }
};

window.app.initialize();


