// material
import { Box, Grid, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import {
  AppNewUsers,
  // AppBugReports,
  AppItemOrders,
  AppWeeklySales,
  AppCurrentVisits,
 
} from '../components/_dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  return (
    <Page title="Dashboard | Minimal-UI">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome back</Typography>
        </Box>
        <Grid container spacing={10}>
        <Grid item xs={12} sm={6} md={3}>
          <AppNewUsers />
        </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWeeklySales />
            </Grid>
       
          <Grid item xs={12} sm={6} md={3}>
            <AppItemOrders />
          </Grid>
      
       
        </Grid>
        <br/>
        <Grid item xs={12} sm={6} md={3}>
        <AppCurrentVisits />
      </Grid>
      </Container>
    </Page>
  );
}
