/* eslint no-process-exit: 0 */
/* eslint no-bitwise: 0 */
/* eslint no-sync: 0 */
/* eslint no-console: 0 */

const spawn = require('child_process').spawn;
const path = require('path');
const fs = require('fs');
const os = require('os');



String.prototype.capitalize = function() {
    return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};

const validateName = (val) => {
    if (val == undefined || val == "") {
    	console.error('Debe ingresar el nombre de la página con la opción "-t" o "--title"');
    	process.exit(1);
    }
    return val
};

const create = (name) => {
	return `import Application from 'Application';
import h from 'hyperscript';
import render from 'lib/render';
import pages from 'pages';
import Config from 'lib/config';
import 'pages/${name}/${name}.css';

const ${name} = {
    name: '${name}',
    
    init() {
        //init here
        this.registerEvents();
    },

    registerEvents() {
        // register events here
    },

    render() {

        const html =
            h('div', [
                pages.Menu.draw(Config.aside),
                h('h1', '${name}')
            ])

        render(html, Application.containers.root);
    }
};

export default ${name};`
    	}


module.exports = {
    name: 'create-page',
    description: 'Crear página de la app',
    action: (options) => {
    	validateName(options.title)
    	const fileString = create(options.title.capitalize())
    	const filePath = path.join(__dirname, `../src/pages/${options.title.capitalize()}`);

    	if (!fs.existsSync(filePath)){
    	    fs.mkdirSync(filePath);
    	}

    	var fileStream = fs.createWriteStream(path.join(filePath, `${options.title.capitalize()}.js`), {flags: 'w'});
    	var fileStreamCss = fs.createWriteStream(path.join(filePath, `${options.title.capitalize()}.css`), {flags: 'w'});
		
		const echo = spawn('echo', [fileString], { stdio: 'pipe' });
		const echoCss = spawn('echo', [`/*\n    CSS Styles of ${options.title.capitalize()} Here! \n*/`], { stdio: 'pipe' });
		
		echo.stdout.pipe(fileStream);
		echoCss.stdout.pipe(fileStreamCss);

		echo.on('close', function (code) {
		    if (code == 0) 
                console.log(`✔ Página JS creada `);
		  	else
		  		console.log('Error al crear el archivo JS')
		});

		echoCss.on('close', function (code) {
		    if (code == 0) 
		  		console.log(`✔ Página CSS creada `);
		  	else
		  		console.log('Error al crear el archivo CSS')
		});
    },
    options: [
        ['-t --title [string]', 'Nombre de la página', validateName]
    ]
};