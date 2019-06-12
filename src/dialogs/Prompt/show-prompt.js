import Prompt from './Prompt.svelte';

export default function showPrompt(props) {
    return new Promise((resolve) => {
        const propsWithCallback = Object.assign({}, props, { callback: resolve })
        const dialog = new Prompt({
            target: document.body,
            props: propsWithCallback,
            intro: true
        });
    });
}
