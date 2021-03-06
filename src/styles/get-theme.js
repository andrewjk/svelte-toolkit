
export default function getTheme() {
    return props.map(p => getThemeValue(p)).filter(Boolean).join('\n');
}

function getThemeValue(name) {
    let value = getComputedStyle(document.documentElement).getPropertyValue(name);
    if (value) {
        return `${name}: ${value};`;
    }
}

const props = [
    '--element-margin',
    '--element-padding',
    '--border-radius',
    '--border-color',
    '--light-border-color',
    '--icon-size',
    '--font-size',
    '--font-size-small',
    '--font-size-large',
    '--font-size-title',
    '--line-height',
    '--body-back-color',
    '--body-text-color',
    '--light-back-color',
    '--middle-back-color',
    '--dark-back-color',
    '--link-color',
    '--link-hover-color',
    '--button-back-color',
    '--button-text-color',
    '--button-hover-color',
    '--list-back-color',
    '--list-text-color',
    '--select-color',
    '--select-text-color',
    '--focus-color',
    '--active-color',
    '--mark-back-color',
    '--mark-text-color',
    '--primary-color',
    '--primary-text-color',
    '--primary-hover-color',
    '--light-primary-color',
    '--light-primary-text-color',
    '--light-primary-border-color',
    '--info-color',
    '--info-text-color',
    '--info-hover-color',
    '--light-info-color',
    '--light-info-text-color',
    '--light-info-border-color',
    '--success-color',
    '--success-text-color',
    '--success-hover-color',
    '--light-success-color',
    '--light-success-text-color',
    '--light-success-border-color',
    '--warning-color',
    '--warning-text-color',
    '--warning-hover-color',
    '--light-warning-color',
    '--light-warning-text-color',
    '--light-warning-border-color',
    '--danger-color',
    '--danger-text-color',
    '--danger-hover-color',
    '--light-danger-color',
    '--light-danger-text-color',
    '--light-danger-border-color',
    '--confirm-color',
    '--confirm-text-color',
    '--confirm-hover-color',
    '--cancel-color',
    '--cancel-text-color',
    '--cancel-hover-color',
    '--disabled-color',
    '--disabled-text-color',
    '--header-back-color',
    '--header-text-color',
    '--header-line-height',
    '--footer-back-color',
    '--footer-text-color',
    '--footer-line-height',
    '--nav-bar-item-back-color',
    '--nav-bar-item-text-color',
    '--nav-bar-item-hover-back-color',
    '--nav-bar-item-hover-text-color',
    '--input-back-color',
    '--input-text-color',
    '--input-height',
    '--input-width',
    '--label-text-color',
    '--label-width',
];
