import { render } from '@testing-library/svelte';

import WizardNav from '../../src/navigation/WizardNav/WizardNav.svelte';

test('wizard nav creation', () => {
    const { container, getByText } = render(WizardNav, {
        id: 'wizardnav',
        itemCount: 10
    });

    expect(container.querySelector('#wizardnav')).toBeInTheDocument();
});
