import Application from 'Application';

/**
 * Método para renderizar genérico
 * @param  {Snabbdom | html} content Contenido a renderizar
 * @param  {HTMLDom} el Elemento en el cual montar el contenido
 * @return {Boolean} Result
 */
const render = (content, el = Application.containers.root) => {
    if (typeof content === 'string') {
        el.innerHTML = content;

        return;
    }

    el.innerHTML = '';
    el.appendChild(content);
};

export default render;
