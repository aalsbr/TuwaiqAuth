// material
import { styled } from '@mui/material/styles';
import {  Stack,  Container, Typography } from '@mui/material';

import Page404 from './Page404';
import Loading from './Loading';

// components
import Page from '../components/Page';
import LoginComp from 'src/components/authentication/login/LoginComp';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';

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

export default function LoginPublic() {

  const [page,setPage] = useState(true)
  const [loading,setLoading] = useState(true)
  const { id } = useParams();
  

  useEffect(()=>{
    axios
    .get("http://localhost:8080/orders/getallcompany")
    .then((response) => {
      let obj =   response.data.data.find(o => o.company === id);
      if(obj) setPage(false)
      setLoading(false)

    })


  },[])


  if (loading) return  <Loading/>

  if(page) return <Page404/>



  return (
    <RootStyle title="Login | TuwaiqAuth">
    

  
      <Container maxWidth="sm">
        <ContentStyle>
          <Stack sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Sign in to Using TuwaiqAuth
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>Enter your details below.</Typography>
          </Stack>

          <LoginComp />

        
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
