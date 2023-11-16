import { useState, useEffect } from 'react';
import { Grid, styled, Alert, AlertTitle } from '@mui/material';
import { getAllApiUser, deleteApiUser } from '../../users/componentsUser/servicesUser';
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
  const [users, setListUser] = useState([]);
  const [hasError, setError] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const getInfo = async () => {
      try {
        const data = await getAllApiUser();
        setListUser(data);
        console.log(data);
      } catch (error) {
        setError(true);
        console.log(error);
      }
    };
    getInfo();
  }, [refresh]);

  const handleDelete = async (item) => {
    try {
      await deleteApiUser(item.code);
      setRefresh(true);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  const columnNames = [
    'Codigo',
    'Nombres',
    'Apellido',
    'Codigo de cargo',
    'Fecha',
    'Punto asignado',
    'Jefe Inmediato',
    'Rol',
    'Correo electronico'
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
            items: users,

            actions: [
              {
                icon: 'delete',
                color: 'error',
                click: handleDelete,
              },
            ],
          }}
        />
      </Grid>
    </Container>
  );
}

export default UserComercial;
