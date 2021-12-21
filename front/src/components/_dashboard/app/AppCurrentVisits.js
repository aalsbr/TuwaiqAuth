import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { useTheme, styled } from '@mui/material/styles';
import { Card, CardHeader } from '@mui/material';
// utils
import { fNumber } from '../../../utils/formatNumber';
//
import { BaseOptionChart } from '../../charts';
import axios from 'axios';
import { useEffect, useState } from 'react';

// ----------------------------------------------------------------------

const CHART_HEIGHT = 372;
const LEGEND_HEIGHT = 72;

const ChartWrapperStyle = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(5),
  '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible'
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    alignContent: 'center',
    position: 'relative !important',
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`
  }
}));

// ----------------------------------------------------------------------

const CHART_DATA = [4344, 5435]

export default function AppCurrentVisits() {

  const [doneList ,setDoneList] = useState([""])
  
  const getdata  = ()=>{

    axios.get("http://localhost:8080/orders/numberdone",{
      headers: {
        "x-access-token": localStorage.getItem("token"),
      }

    }).then((res) => {
    if(res.data.data){
      setDoneList([res.data.data,res.data.pending])  
  
    }
  });
  }

  useEffect(()=>{
   getdata()
  },[])




  const theme = useTheme();

  const chartOptions = merge(BaseOptionChart(), {
    colors: [
      theme.palette.primary.main,
      theme.palette.warning.main,
  
    ],
    labels: ['Done', 'Pending'],
    stroke: { colors: [theme.palette.background.paper] },
    legend: { floating: true, horizontalAlign: 'center' },
    dataLabels: { enabled: true, dropShadow: { enabled: false } },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: (seriesName) => `#${seriesName}`
        }
      }
    },
    plotOptions: {
      pie: { donut: { labels: { show: false } } }
    }
  });

  return (
    <div style={{width:300}} >
    <Card>
      <CardHeader title="Ordrs" />
      <ChartWrapperStyle dir="ltr">
        <ReactApexChart type="pie" series={doneList} options={chartOptions} height={250} />
      </ChartWrapperStyle>
    </Card>
    </div>
  );
}