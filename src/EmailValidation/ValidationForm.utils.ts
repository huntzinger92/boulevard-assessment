import { IEmailValidationResult } from './types';

/**
 * type guard since we can't pass a generic to fetch
 */
export const validateResultType = (result: unknown): result is IEmailValidationResult => {
    const castedResult = result as IEmailValidationResult;
    return 'format' in castedResult;
};

export const fetchValidation = async (
    email: string,
    onSuccessCallback: (newResult: IEmailValidationResult) => void
) => {
    const baseUrl = 'https://www.disify.com/api/email';
    const url = `${baseUrl}/${email}`;
    const result = await fetch(url, { method: 'GET' });
    const data = await result.json();
    if (validateResultType(data)) {
        onSuccessCallback(data);
    }
    return data;
};
