import Alert from './Alert.svelte';

export default function showAlert(props) {
    const alert = new Alert({
        target: document.body,
        props,
        intro: true
    });
}
