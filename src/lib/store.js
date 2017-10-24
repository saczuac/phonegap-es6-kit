import 'whatwg-fetch';
import localforage from 'localforage';
import Config from 'lib/config';
import {showAlert, showLoader, hideLoader} from 'lib/util';

const headers = {
    //'HEADER': 'VALUE'
}

if (Config.serverUrl == undefined)
    Config.init()

const get = (url) => {
    showLoader()
    return localforage.
        getItem(url).
            then(value => {
                if (!value) {
                    return fetch(url, { headers }).
                        then(response => response.json()).
                        then(response => {
                            Config.connTries = 3
                            localforage.setItem(url, [response, new Date()]);
                            hideLoader()  
                            return response
                        }).
                        catch(ex => {
                            if (Config.connTries > 0) {
                                showAlert('Problemas en la conexión con el servidor', () => { 
                                    setTimeout(() => get(url), Config.timeout * 1000)
                                })
                                Config.connTries -= 1
                            }

                        });
                }

                let storageDate = value[1]
                let currentDate = new Date()
                storageDate.setSeconds(storageDate.getSeconds() + Config.validStorage)

                if (currentDate > storageDate) {
                    if (navigator.connection.type != Connection.NONE) {
                        localforage.removeItem(url)
                        return get(url)
                    }
                }

                hideLoader()
                return value[0]
            })
};

const getResource = (resource) => get(`${Config.serverUrl}/${resource}/`);

let baseUrl = Config.serverUrl

const Store = {
    baseUrl
};


Config.resources.forEach(resource => {
    Store[resource] = (id) => getResource(`api/${resource}s/${id}`);
    Store[`${resource}s`] = () => getResource(`api/${resource}s`);
});

if (Config.search)
    Store['search'] = (query) => getResource(`api/search/${query}`);

export default Store;
