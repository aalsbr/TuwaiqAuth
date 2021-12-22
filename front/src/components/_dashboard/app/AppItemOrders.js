import { Icon } from '@iconify/react';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
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
  color: theme.palette.warning.darker,
  backgroundColor: theme.palette.warning.lighter
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
  color: theme.palette.warning.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.warning.dark, 0)} 0%, ${alpha(
    theme.palette.warning.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------


export default function AppItemOrders() {

  const [orderList ,setOrderList] = useState(0)
  
  const getdata  = ()=>{

    axios.get("/orders/numberoforder",{
      headers: {
        "x-access-token": localStorage.getItem("token"),
      }

    }).then((res) => {
    if(res.data.data){
      setOrderList(res.data.data)  
  
    }
  });
  }
  
  useEffect(()=>{
   getdata()
  },[])
  return (
    <RootStyle>
      <IconWrapperStyle>
        <Icon icon={shoppingBagFill} width={34} height={34} />
      </IconWrapperStyle>
      <Typography variant="h3">{fShortenNumber(orderList)}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Auth Orders
      </Typography>
    </RootStyle>
  );
}
