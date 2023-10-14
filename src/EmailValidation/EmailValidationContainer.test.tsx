import { EmailValidationContainer } from './EmailValidationContainer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

describe('EmailValidationContainer', () => {
    // mock fetch to not make a real network call
    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () =>
                Promise.resolve({ domain: 'domain', dns: true, whitelist: true, format: true, disposable: true }),
        })
    ) as jest.Mock;
    // react query provider
    const queryClient = new QueryClient();
    const wrapper = ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('renders fetched response', async () => {
        render(<EmailValidationContainer />, { wrapper });
        userEvent.type(screen.getByRole('textbox'), 'foo');
        await waitFor(() => expect(screen.getByText('Validate Email')).toBeEnabled());
        userEvent.click(screen.getByText('Validate Email'));
        // fetched data displayed
        await waitFor(() => expect(screen.getByText('Domain: domain')).toBeDefined());
        // user entered email is displayed
        expect(screen.getByText('Email: foo')).toBeDefined();
    });
});
