import Dialog from './Dialog';

export default function showDialog(props) {
    return new Promise((resolve) => {
        const propsWithCallback = Object.assign({}, props, { callback: resolve })
        const dialog = new Dialog({
            target: document.body,
            props: propsWithCallback,
            intro: true
        });
    });
}
