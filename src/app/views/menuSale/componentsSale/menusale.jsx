import { useState, useEffect } from 'react';
import { Grid, Button, styled, Alert, AlertTitle, Input
 } from '@mui/material';
import PaginatedTable from 'app/components/PaginatedTable';
import { getFunction, deleteFunction } from '../../../utils/rest_connector';
import { handleGetInfo, handleDelete } from '../../../utils/utils';
import { API_URL } from '../../../../constants';
import axios from 'axios';


const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
}));


const initialValues = {
  archive: null,
  archiveName: '',
  archiveUrl: '',
};

const SERVICE = process.env.REACT_APP_SALES_SERVICE || 'sales';

function Sales() {
  const [sales, setSales] = useState([]);
  const [hasError, setError] = useState(false);
  const [archive, setArchive] = useState(initialValues);

  const [refresh, setRefresh] = useState(false);


  const transformObject = (data) => {
    const transformed_data = data.map((item) => {
      return {
        code: item.code,
        name_comercial: item.name_comercial,
        store: item.store,
        sale: item.sale,
        product: item.product,
        date: item.date,
        sale_value: item.sale_value,
      };
    });
    return transformed_data;
  };

  useEffect(() => {
    setError(false);
    handleGetInfo(getFunction, API_URL, SERVICE, transformObject, setSales, setError);
  }, [refresh]);

  const performDelete = async (item) => {
    handleDelete(deleteFunction, API_URL, SERVICE, item.code, setRefresh, setError);
  };

  const columnNames = [
    'ID Comercial',
    'Nombre del comercial',
    'Tienda',
    'Venta',
    'Producto',
    'Fecha de venta',
    'valor de venta',
  ];

  const fileSelectHandler = (e) => {
    setArchive({
      archive: e.target.files[0],
      archiveNme: e.target.files[0].name,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('file', archive.archive, archive.archiveName);
    axios.post('http://localhost:3001/products');
  };

  return (
    <Container>
      {hasError && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Algo ha salido mal, intenta de nuevo
        </Alert>
      )}
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} />
        <Grid item xs={0} md={0}>
          <StyledButton variant="contained" color="primary" onClick={onSubmit}>
            Cargar productos
          </StyledButton>
          <p />
          <Input type="file" id="archive" onChange={fileSelectHandler} onClick={onSubmit}/>
          <p />
        </Grid>
        <PaginatedTable
          props={{
            columnNames: columnNames,
            items: sales,
            actions: [
              {
                icon: 'delete',
                color: 'error',
                click: performDelete,
              },
            ],
          }}
        />
      </Grid>
    </Container>
  );
}

export default Sales;
