const path = require('path');
const fs = require('fs');
const config = require('../src/lib/config');
const ncp = require('ncp').ncp;
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');

const files = {
    js: '',
    css: ''
};

const staticPath = path.join(__dirname, '..', 'build', 'static');

const staticDirs = fs.readdirSync(staticPath);
staticDirs.forEach(dir => {
    if (dir === 'js' || dir === 'css') {
        const finalFiles = fs.readdirSync(path.join(staticPath, dir));
        files[dir] = finalFiles[0];
    }
});

const buildFolder = path.join(config.productionJSPath, 'files');


rimraf(buildFolder, err => {
    if (err) {
        return console.error(err);
    }

    mkdirp(buildFolder, (err) => {
        if (err) {
            return console.error(err);
        }
                
        ncp(staticPath, buildFolder, err => {
            if (err) {
                return console.error(err);
            }

            const renameFiles = type => {
                ncp(
                    path.join(buildFolder, type, files[type]),
                    path.join(buildFolder, type, `${type === 'css' ? 'pre-' : ''}index.${type}`),
                    err => {
                        if (err) {
                            return console.error(err);
                        }
                    }
                );
            }

            renameFiles('js');
            renameFiles('css');

        });
    });
});
