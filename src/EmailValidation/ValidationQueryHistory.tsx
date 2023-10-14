import { Alert, Box, Card, Checkbox, FormControlLabel, Typography } from '@mui/material';
import { IFormattedValidationResult } from './types';
import * as styles from './EmailValidation.styles';

/**
 * this component leverages Checkbox's styling while also removing interactive styling so that it is truly readOnly
 */
const ReadOnlyFormControlCheckbox = ({ label, checked }: { label: string; checked: boolean }) => {
    return (
        <FormControlLabel
            label={label}
            sx={{ cursor: 'unset' }}
            control={
                <Checkbox
                    checked={checked}
                    sx={{ cursor: 'unset' }}
                    readOnly
                    disableFocusRipple
                    disableRipple
                    disableTouchRipple
                />
            }
        />
    );
};

export interface IValidationQueryHistoryProps {
    /**
     * the history of email validation queries
     */
    queryHistory: IFormattedValidationResult[];
}

/**
 * the component responsible for rendering the history of email validation queries
 */
export const ValidationQueryHistory = ({ queryHistory }: IValidationQueryHistoryProps) => {
    return (
        <Box>
            {queryHistory.length === 0 && <Alert severity='info'>No query history available.</Alert>}
            {queryHistory.map(({ disposable, key, format, dns, domain, email, whitelist }) => (
                <Card key={key} sx={styles.historyContainer}>
                    <Typography>{`Email: ${email}`}</Typography>
                    <Box sx={styles.historyData}>
                        {domain !== undefined && <Typography>{`Domain: ${domain}`}</Typography>}
                        {disposable !== undefined && (
                            <ReadOnlyFormControlCheckbox label='Disposable' checked={disposable} />
                        )}
                        {dns !== undefined && <ReadOnlyFormControlCheckbox label='DNS' checked={dns} />}
                        <ReadOnlyFormControlCheckbox label='Format' checked={format} />
                        {whitelist !== undefined && (
                            <ReadOnlyFormControlCheckbox label='Whitelist' checked={whitelist} />
                        )}
                    </Box>
                </Card>
            ))}
        </Box>
    );
};
