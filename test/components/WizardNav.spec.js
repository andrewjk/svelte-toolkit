import test from 'ava';
import WizardNav from '../../src/components/WizardNav/WizardNav.svelte';

test('wizard nav creation', t => {
    const target = document.createElement('div');
    const app = new WizardNav({
        target,
        props: {
            id: 'wizardnav',
            itemCount: 10
        },
    });

    const el = target.firstChild;
    t.is(el.id, 'wizardnav');
});
