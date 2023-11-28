import { useState, useEffect } from 'react';
import { Grid, Button, styled, Alert, AlertTitle } from '@mui/material';
import PaginatedTable from 'app/components/PaginatedTable';
import { getFunction, deleteFunction } from '../../../utils/rest_connector';
import { handleGetInfo, handleDelete } from '../../../utils/utils';
import { API_URL } from '../../../../constants';
import axios from 'axios';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
  },
}));

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(0),
}));

const initialValues = {
  archive: null,
  archiveName: '',
  archiveUrl: '',
};

const SERVICE = process.env.REACT_APP_PRODUCTS_SERVICE || 'products';

function Products() {
  const [products, setProducts] = useState([]);
  const [hasError, setError] = useState(false);
  const [archive, setArchive] = useState(initialValues);

  const [refresh, setRefresh] = useState(false);

  const transformObject = (data) => {
    const transformed_data = data.map((item) => {
      return {
        name: item.name,
        brand: item.brand,
        category: item.category,
        price: item.price,
      };
    });
    return transformed_data;
  };

  useEffect(() => {
    setError(false);
    handleGetInfo(getFunction, API_URL, SERVICE, transformObject, setProducts, setError);
  }, [refresh])

  const performDelete = async (item) => {
    handleDelete(deleteFunction, API_URL, SERVICE, item.code, setRefresh, setError)
  }

  const columnNames = ['Nombre', 'Marca', 'Categoria', 'Valor'];

  const fileSelectHandler = (e) => {
    setArchive({
      archive: e.target.files[0],
      archiveNme: e.target.files[0].name,
    });
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('file', archive.archive, archive.archiveName);
    axios.post('http://localhost:3001/products');
  }

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
            Cargar lista de productos
          </StyledButton>
          <p />
          <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
            Seleccionar CSV
            <VisuallyHiddenInput
              type="file"
              id="archive"
              accept=".csv,.json"
              onChange={fileSelectHandler}
            />
          </Button>
          <p />
        </Grid>
        <PaginatedTable
          props={{
            columnNames: columnNames,
            items: products,
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

export default Products;
