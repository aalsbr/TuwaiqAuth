import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box,  Link, Container, Typography } from '@mui/material';

// layouts
// components
import Page from '../components/Page';
import { RegisterForm } from '../components/authentication/register';
import logo from '../assets/img/logo.png'


// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));



const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function Register() {
  return (
    <RootStyle title="Register | TuwaiqAuth">
   

     


      <Container>
        <ContentStyle>
          <Box sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
            <img src={logo} width={100} height={100} />

            Register in  TuwaiqAuth
            </Typography>
          </Box>

       
          <RegisterForm />

      

        
            <Typography variant="subtitle2" sx={{ mt: 3, textAlign: 'center' }}>
              Already have an account?&nbsp;
              <Link to="/login" component={RouterLink}>
                Login
              </Link>
            </Typography>
     
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
