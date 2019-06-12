import Info from './Info.svelte';

export default function showInfo(props) {
    return new Promise((resolve) => {
        const propsWithCallback = Object.assign({}, props, { callback: resolve })
        const dialog = new Info({
            target: document.body,
            props: propsWithCallback,
            intro: true
        });
    });
}
