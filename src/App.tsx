import Container from '@mui/material/Container';
import { EmailValidationContainer } from './EmailValidation/EmailValidationContainer';

export default function App() {
    return (
        <Container maxWidth='sm'>
            <EmailValidationContainer />
        </Container>
    );
}
