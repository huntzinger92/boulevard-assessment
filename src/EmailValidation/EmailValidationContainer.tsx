import { useState } from 'react';
import { IFormattedValidationResult } from './types';
import { ValidationForm } from './ValidationForm';
import { ValidationQueryHistory } from './ValidationQueryHistory';
import { Box, Typography } from '@mui/material';
import * as styles from './EmailValidation.styles';

/**
 * a container that renders both the validation query form and the history of validation queries
 */
export const EmailValidationContainer = () => {
    const [queryHistory, setQueryHistory] = useState<IFormattedValidationResult[]>([]);

    /**
     * a handler for updating the query history with a new email validation result
     *
     * note that we add new result to the beginning of list so history is mapped out from newest to oldest
     */
    const addQueryResultToHistory = (newResult: IFormattedValidationResult) =>
        setQueryHistory((prev) => [newResult, ...prev]);

    return (
        <Box sx={styles.emailValidationContainer}>
            <Typography variant='h2' textAlign='center'>
                Email Verification
            </Typography>
            <ValidationForm addQueryResultToHistory={addQueryResultToHistory} />
            <ValidationQueryHistory queryHistory={queryHistory} />
        </Box>
    );
};
