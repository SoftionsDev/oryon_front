import { Grid, styled,  } from '@mui/material';
import { Fragment } from 'react';


const ContentBox = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
}));

const Analytics = () => {
  

  return (
    <Fragment>
      <ContentBox className="analytics">
        <Grid container spacing={3}>
          

         
        </Grid>
      </ContentBox>
    </Fragment>
  );
};

export default Analytics;
