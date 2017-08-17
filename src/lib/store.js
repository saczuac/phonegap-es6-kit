import 'whatwg-fetch';
import localforage from 'localforage';
import Config from 'lib/config';


const headers = {};

headers['X-Requested-With'] = 'XMLHttpRequest';

const get = (url) => {
        $("#loader").show();
        return localforage.
        getItem(url).
        then(value => {
            if (!value) {
                return fetch(url, { headers }).
                    then(response => response.json()).
                    then(response => {
                        if (response.error) {
                            console.log('Error: ', response.error);
                        }

                        localforage.setItem(url, response);
                        $("#loader").hide();    
                        return response;
                    }).
                    catch(ex => console.error('Error en store: ', ex));
            }
            $("#loader").hide(); 
            return value;
        })
    };

const getResource = (resource) => get(`${Config.serverUrl}/${resource}`);

const resources = [
    // 'service',
    // 'recomendationType',
    // 'historie',
    // 'prayer',
    // 'baptism',
    // 'masse'
];

let baseUrl = Config.serverUrl

const Store = {
    baseUrl
};

resources.forEach(resource => {
    Store[resource] = (id) => getResource(`${resource}s/${id}`);
    Store[`${resource}s`] = () => getResource(`${resource}s`);
});

export default Store;
