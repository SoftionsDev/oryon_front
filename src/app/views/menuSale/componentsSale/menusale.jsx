import { useState, useEffect } from 'react';
import { Grid, styled, Alert, AlertTitle, Icon, Button } from '@mui/material';
import { Span } from "app/components/Typography";
import PaginatedTableSale from 'app/components/paginatedtableSale';
import { getAllApiSale, deleteApiSale } from '../componentsSale/serviceSale';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
  },
}));

function MenuSale() {
  const [sales, setMenuSale] = useState([]);
  const [hasError, setError] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const getInfo = async () => {
      try {
        const data = await getAllApiSale();
        setMenuSale(data);
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
      await deleteApiSale(item.code);
      setRefresh(true);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  const columnNames = [
    'ID Venta',
    'ID producto',
    'ID tienda',
    'Nombre comercial',
    'ID comercial',
    'Fecha de venta',
    'Valor de venta',
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
        <Button color="primary" variant="contained" type="submit">
          <Icon>send</Icon>
          <Span sx={{ pl: 1, textTransform: 'capitalize' }}>Cargar CSV</Span>
        </Button>

        <Grid item xs={0} md={0}></Grid>
        <PaginatedTableSale
          props={{
            columnNames,
            items: sales,

            actions: [
              {
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

export default MenuSale;
