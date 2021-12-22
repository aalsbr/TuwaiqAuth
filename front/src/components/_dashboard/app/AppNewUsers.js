import { Icon } from '@iconify/react';
import userIcon from '@iconify/icons-el/user';
// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
import { useEffect, useState } from 'react';
import axios from 'axios';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.info.darker,
  backgroundColor: theme.palette.info.lighter
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  color: theme.palette.info.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.info.dark, 0)} 0%, ${alpha(
    theme.palette.info.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------


export default function AppNewUsers() {
   const [userList ,setUserList] = useState(0)
  
  const getdata  = ()=>{

    axios.get("http://137.184.157.109:8080/numberofusers",{
      headers: {
        "x-access-token": localStorage.getItem("token"),
      }

    }).then((res) => {
    if(res.data.data){
      setUserList(res.data.data)  
  
    }
  });
  }

  useEffect(()=>{
   getdata()
  },[])






  return (
    <RootStyle>
      <IconWrapperStyle>
        <Icon icon={userIcon} width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h3">{fShortenNumber(userList)}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Users
      </Typography>

    </RootStyle>
  );
}
