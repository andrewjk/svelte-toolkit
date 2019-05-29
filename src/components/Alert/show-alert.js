import Alert from './Alert';

export default function showAlert(props) {
    const alert = new Alert({
        target: document.body,
        props,
        intro: true
    });
}
