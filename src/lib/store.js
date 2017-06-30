import 'whatwg-fetch';
import localforage from 'localforage';

const baseUrl = 'http://localhost:8000/';
// let baseUrl = 'http://proyectos.gobdigital.gba.gob.ar/';
// const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
// baseUrl = proxyUrl + baseUrl
const apiUrl = `${baseUrl}api/`;

const headers = {};
// headers['Token'] = '78b1e6d775cec5260001af137a79dbd5';

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

                        localforage.setItem(url, response.data);
                        $("#loader").hide();
                        return response;
                    }).
                    catch(ex => console.error('Error in store: ', ex));
            }
            $("#loader").hide();
            return value;
        })
    };

const getResource = (resource) => get(`${apiUrl}${resource}/`);

const resources = [
    'project',
];

const Store = {
    baseUrl
};

resources.forEach(resource => {
    Store[resource] = (id) => getResource(`${resource}/${id}`);
    Store[`${resource}s`] = () => getResource(`${resource}`);
});

export default Store;
