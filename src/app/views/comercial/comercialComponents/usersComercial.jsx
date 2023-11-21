import { useState, useEffect } from 'react';
import { Grid, styled, Alert, AlertTitle } from '@mui/material';
import { getAllApiComercial,  } from '../../comercial/comercialComponents/servicesComercial';
import PaginatedTableComercial from 'app/components/paginatedtableComercial';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
  },
}));

function UserComercial() {
  const [state, setUserComercial] = useState([]);
  const [hasError, setError] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const getInfo = async () => {
      try {
        const data = await getAllApiComercial();
        setUserComercial(data);
        setRefresh(true);
        console.log(data);
      } catch (error) {
        setError(true);
        console.log(error);
      }
    };
    getInfo();
  }, [refresh]);

 

  const columnNames = [
    'Codigo de usuario',
    'Usuario',
    'Manager',
    'Tipo de meta',
    'Meta actual',
  ];
  return (
    <Container>
      {hasError && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Algo ha salido mal, intenta de nuevo
        </Alert>
      )}
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}></Grid>

        <Grid item xs={0} md={0}></Grid>
        <PaginatedTableComercial
          props={{
            columnNames,
            items: state,
          }}
        />
      </Grid>
    </Container>
  );
}

export default UserComercial;
