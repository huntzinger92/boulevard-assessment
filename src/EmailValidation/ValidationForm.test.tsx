import { ValidationForm, IValidationFormProps } from './ValidationForm';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

describe('ValidationForm', () => {
    // mock fetch to not make a real network call
    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () =>
                Promise.resolve({ domain: 'domain', dns: true, whitelist: true, format: true, disposable: true }),
        })
    ) as jest.Mock;
    // props
    const mockAddQueryResultToHistory = jest.fn();
    const defaultProps: IValidationFormProps = {
        addQueryResultToHistory: mockAddQueryResultToHistory,
    };
    // react query provider
    const queryClient = new QueryClient();
    const wrapper = ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('renders input', () => {
        render(<ValidationForm {...defaultProps} />, { wrapper });
        expect(screen.getByRole('textbox')).toBeDefined();
    });
    it('renders submit button', () => {
        render(<ValidationForm {...defaultProps} />, { wrapper });
        expect(screen.getByText('Validate Email')).toBeDefined();
    });
    it('submit button is disabled by default', () => {
        render(<ValidationForm {...defaultProps} />, { wrapper });
        expect(screen.getByText('Validate Email')).toBeDisabled();
    });
    it('entering an email address enables button', async () => {
        render(<ValidationForm {...defaultProps} />, { wrapper });
        userEvent.type(screen.getByRole('textbox'), 'my-email');
        await waitFor(() => expect(screen.getByText('Validate Email')).toBeEnabled());
    });
    it('renders loading state on submit', async () => {
        render(<ValidationForm {...defaultProps} />, { wrapper });
        userEvent.type(screen.getByRole('textbox'), 'my-email');
        await waitFor(() => expect(screen.getByText('Validate Email')).toBeEnabled());
        userEvent.click(screen.getByText('Validate Email'));
        await waitFor(() => expect(screen.getByRole('progressbar')).toBeDefined());
    });
});
