import { render } from '@testing-library/svelte';

import Breadcrumb from '../../src/components/Breadcrumb/Breadcrumb.svelte';
import BreadcrumbItem from '../../src/components/Breadcrumb/BreadcrumbItem.svelte';

test('breadcrumb creation', () => {
    const { container, getByText } = render(Breadcrumb, { id: 'breadcrumb' });

    expect(container.querySelector('#breadcrumb')).toBeInTheDocument();
});
