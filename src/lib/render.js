import Application from 'Application';

const render = (content, el = Application.containers.root) => {
    if (typeof content === 'string') {
        el.innerHTML = content;
        return;
    }
    el.innerHTML = '';
    el.appendChild(content);
};

export default render;
