const path = require('path');
const fs = require('fs');
const postcss = require('postcss');
const parentSelector = require('postcss-parent-selector');
const config = require('../src/lib/config');

const preCss = path.join(config.productionJSPath, 'files', 'css', 'pre-index.css');
const postCss = path.join(config.productionJSPath, 'files', 'css', 'index.css');

const handleError = err => {
    if (err) {
        throw err;
    }
};

fs.readFile(preCss, (err, css) => {
    postcss([
        parentSelector({
            selector: '#root'
        })
    ])
    .process(css, { from: preCss, to: postCss })
    .then(result => {
        const newCss = result.css.replace(/\/static\//g, '/files/');
        fs.writeFile(postCss, newCss, handleError);
        if ( result.map ) fs.writeFile(`${postCss}.map`, result.map, handleError);
    });
});
