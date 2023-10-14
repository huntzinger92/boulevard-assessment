import { ValidationQueryHistory, IValidationQueryHistoryProps } from './ValidationQueryHistory';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('ValidationQueryHistory', () => {
    const defaultProps: IValidationQueryHistoryProps = {
        queryHistory: [
            {
                key: 'key',
                disposable: true,
                dns: true,
                domain: 'firstDomain',
                format: true,
                whitelist: true,
                email: 'firstEmail',
            },
            {
                key: 'key1',
                disposable: true,
                dns: true,
                domain: 'secondDomain',
                format: true,
                whitelist: true,
                email: 'secondEmail',
            },
        ],
    };
    const renderedData = ['firstDomain', 'firstEmail', 'secondDomain', 'secondEmail'];
    it.each(renderedData)('renders expected domain and email data', (datum) => {
        render(<ValidationQueryHistory {...defaultProps} />);
        expect(screen.getByText(datum, { exact: false })).toBeDefined();
    });
    it('renders checkboxes as checked when data properties are true', () => {
        render(<ValidationQueryHistory {...defaultProps} />);
        const allCheckboxes = screen.getAllByRole('checkbox');
        allCheckboxes.forEach((checkbox) => {
            expect(checkbox).toBeChecked();
        });
    });
    it('renders checkboxes as NOT checked when data properties are false', () => {
        render(
            <ValidationQueryHistory
                queryHistory={[
                    {
                        key: 'key',
                        disposable: false,
                        dns: false,
                        domain: 'firstDomain',
                        format: false,
                        whitelist: false,
                        email: 'firstEmail',
                    },
                ]}
            />
        );
        const allCheckboxes = screen.getAllByRole('checkbox');
        allCheckboxes.forEach((checkbox) => {
            expect(checkbox).not.toBeChecked();
        });
    });
    it('renders a warning message when no entries are present', () => {
        render(<ValidationQueryHistory queryHistory={[]} />);
        expect(screen.getByText('No query history available.')).toBeDefined();
    });
});
