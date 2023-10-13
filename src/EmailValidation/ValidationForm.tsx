import {
    Alert,
    Box,
    Button,
    CircularProgress,
    FormControl,
    Input,
    InputLabel,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { IEmailValidationResult, IFormattedValidationResult } from './types';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import * as styles from './EmailValidation.styles';
import axios from 'axios';

const fetchValidation = async (email: string, onSuccessCallback: (newResult: IEmailValidationResult) => void) => {
    const baseUrl = 'https://www.disify.com/api/email';
    const url = `${baseUrl}/${email}`;
    const result = await axios.get<IEmailValidationResult>(url);
    onSuccessCallback(result.data);
    return result.data;
};

export interface IValidationFormProps {
    addQueryResultToHistory: (newResult: IFormattedValidationResult) => void;
}

/**
 * the form that allows user to query for validation of a given email address
 */
export const ValidationForm = ({ addQueryResultToHistory }: IValidationFormProps) => {
    const theme = useTheme();
    const isAboveSmallScreen = useMediaQuery(theme.breakpoints.up('sm'));

    const [currentEmail, setCurrentEmail] = useState('');
    const [submitClicked, setSubmitClicked] = useState(false);

    /**
     * passing this callback to the fetching function,
     * as react-query's onCompleted callback is deprecated in favor of this pattern
     */
    const onSuccessCallback = (newResult: IEmailValidationResult) => {
        // the api doesn't give us a unique key, so use current time for unique id
        const uniqueKey = new Date().toISOString();
        addQueryResultToHistory({
            key: uniqueKey,
            email: currentEmail,
            ...newResult,
        });
        // reset form
        setCurrentEmail('');
        setSubmitClicked(false);
    };

    const { isFetching, error } = useQuery<IEmailValidationResult>({
        queryKey: ['email-validation-query'],
        queryFn: () => fetchValidation(currentEmail, onSuccessCallback),
        enabled: submitClicked,
    });

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCurrentEmail(e.target.value);
    };

    const handleValidateEmailQuery = async (e: FormEvent) => {
        // this prevents page from reloading on form submit
        e.preventDefault();
        setSubmitClicked(true);
    };

    return (
        <Box sx={styles.validationFormWrapper}>
            <form
                onSubmit={handleValidateEmailQuery}
                style={isAboveSmallScreen ? styles.formContainer : styles.mobileFormContainer}
            >
                <FormControl sx={styles.formInput}>
                    <InputLabel htmlFor='email-input'>Email address</InputLabel>
                    <Input
                        id='email-input'
                        placeholder='validate_this_email@gmail.com'
                        onChange={handleEmailChange}
                        value={currentEmail}
                    />
                </FormControl>
                <Button type='submit' disabled={!currentEmail}>
                    Validate Email
                </Button>
            </form>
            {isFetching && <CircularProgress sx={styles.loadingSpinner} />}
            {!!error && <Alert severity='error'>An error occurred while attempting to fetch email validation.</Alert>}
        </Box>
    );
};
