export type IEmailValidationResult = {
    format: boolean;
    domain: string;
    disposable: boolean;
    dns: boolean;
    whitelist: boolean;
};

export interface IFormattedValidationResult extends IEmailValidationResult {
    /**
     * client side code needs to supply unique key for safe react mapping
     */
    key: string;
    /**
     * the email queried for by the user
     */
    email: string;
}
