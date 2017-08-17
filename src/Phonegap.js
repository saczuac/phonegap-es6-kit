import Application from 'Application'
import Config from 'lib/config'
import Home from 'pages/Home';

/* 
    Phonegap Confs
*/

window.app = {

    initialize() { this.bindEvents() },

    bindEvents() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        // document.addEventListener('offline', this.onOffline, false);
        document.addEventListener("backbutton", this.onBackButton, false);
    },

    onDeviceReady() {
        Config.init();
        Application.init();
    },

    onOffline() {
        // navigator.notification.alert(
        //     'Su dispositivo necesita tener conexión a internet para reproducir',
        //     () => null,
        //     'Error en la conexión', 'Reintentar');
    },

    onSlowNetwork() {
        // navigator.notification.alert(
        //     'La conexión es demasiado lenta, considere utilizar 3G o 4G',
        //     () => null,
        //     'Error en la conexión', 'Reintentar');
    },

    onBackButton(){
        if (Application.current.page == Home) {
            navigator.app.exitApp();
        } else {              
            Application.back();
        }
    }
};

window.connFlag = true;
window.app.initialize();