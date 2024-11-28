import { render, screen } from '@testing-library/react/pure';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { Loader } from '../src/components/Loader';

describe('Loader Component', () => {
	it('renders without crashing', () => {
		render(<Loader />);
		const loader = screen.getByLabelText(/loading/i);
		expect(loader).toBeDefined();
		const hiddenText = screen.getByText(/loading.../i);
		expect(hiddenText).toBeDefined();
	});
});
