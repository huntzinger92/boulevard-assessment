import { CSSProperties } from 'react';

export const historyContainer = {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    marginTop: '15px',
    marginBottom: '15px',
    padding: '10px',
};

export const historyData = { display: 'flex', flexDirection: 'row', gap: '15px', alignItems: 'center' };

export const formContainer = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '15px',
};

export const mobileFormContainer: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
};

export const submitButton = { maxWidth: '150px ' };

export const formInput = {
    maxWidth: '350px',
    margin: 'auto',
};

export const emailValidationContainer = { marginTop: '50px', display: 'flex', flexDirection: 'column', gap: '15px' };
