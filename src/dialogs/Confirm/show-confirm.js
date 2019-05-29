import Confirm from './Confirm';

export default function showConfirm(props) {
    return new Promise((resolve) => {
        const propsWithCallback = Object.assign({}, props, { callback: resolve })
        const dialog = new Confirm({
            target: document.body,
            props: propsWithCallback,
            intro: true
        });
    });
}
