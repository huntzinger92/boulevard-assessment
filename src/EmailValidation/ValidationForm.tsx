import { Button, FormControl, Input, InputLabel, useMediaQuery, useTheme } from '@mui/material';
import { IFormattedValidationResult } from './types';
import { ChangeEvent, FormEvent, useState } from 'react';
import * as styles from './EmailValidation.styles';

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

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCurrentEmail(e.target.value);
    };

    const handleValidateEmailQuery = async (e: FormEvent) => {
        // this prevents page from reloading on form submit
        e.preventDefault();
        // TO DO: do real query here, handle loading and error states
        const uniqueKey = new Date().toISOString();
        addQueryResultToHistory({
            disposable: Math.random() < 0.5,
            key: uniqueKey,
            format: Math.random() < 0.5,
            domain: 'some-domain',
            dns: Math.random() < 0.5,
            email: currentEmail,
        });
        setCurrentEmail('');
    };

    return (
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
    );
};
