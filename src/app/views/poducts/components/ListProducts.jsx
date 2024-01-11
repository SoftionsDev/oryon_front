import { useState, useEffect, useRef } from 'react';
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
        code: item.code,
        name: item.name,
        brand: item.brand_description,
        category: item.category_description,
        price: item.price,
      };
    });
    return transformed_data;
  };

  useEffect(() => {
    setError(false);
    handleGetInfo(getFunction, API_URL, SERVICE, transformObject, setProducts, setError);
    if (archive.archive && archive.archiveName) {
      onSubmit();
    }
  }, [refresh, archive])

  const performDelete = async (item) => {
    handleDelete(deleteFunction, API_URL, SERVICE, item.code, setRefresh, setError)
    setRefresh(false)
  }

  const columnNames = ['Codigo', 'Nombre', 'Marca', 'Categoria', 'Valor'];

  const fileSelectHandler = async (e) => {
    if (e.target.files.length > 0) {
      console.log(e)
      setArchive({
        archive: e.target.files[0],
        archiveName: e.target.files[0].name,
      });
    }
    return false;
  }

  const inputRef = useRef();

  const onSubmit = async (e) => {
    const fd = new FormData();
    console.log(archive)
    fd.append('file', archive.archive, archive.archiveName);
    try {
      await axios.post(`${API_URL}/${SERVICE}/upload/`, fd, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        }
      });
      setRefresh(true);
    } catch (error) {
      console.log(error)
      setError(true);
    }
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
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            onClick={() => {
              inputRef.current.click();
            }}
          >
            Cargar Datos
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
            title: 'Productos',
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