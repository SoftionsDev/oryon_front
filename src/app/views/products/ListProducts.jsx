import { useState, useEffect, useRef } from 'react';
import {
  Grid,
  Button,
  styled,
  Alert,
  AlertTitle,
  Typography,
  Divider,
  TextField,
  Modal
} from '@mui/material';
import PaginatedTable from 'app/components/PaginatedTable';
import { getFunction, deleteFunction, createFunction } from '../../utils/rest_connector';
import { handleGetInfo, handleDelete } from '../../utils/utils';
import { API_URL } from '../../../constants';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { ValidatorForm } from "react-material-ui-form-validator";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';

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
  margin: '5px'
}));

const StyledBox = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 650,
  backgroundColor: 'white',
  padding: theme.spacing(2),
  boxShadow: theme.shadows[5],
  borderRadius: '5px',
}))

const initialValues = {
  archive: null,
  archiveName: '',
  archiveUrl: '',
};

const SERVICE = process.env.REACT_APP_PRODUCTS_SERVICE || 'products';

function Products() {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const [open, setOpen] = useState(false);
  const [hasError, setError] = useState(false);
  const [archive, setArchive] = useState(initialValues);
  const [refresh, setRefresh] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const transformObject = (data) => {
    const transformed_data = data.map((item) => {
      return {
        code: item.code,
        name: item.name,
        brand: item.brand_description,
        category: item.category_description,
        price: Number(item.price).toLocaleString(),
      };
    });
    return transformed_data;
  };

  useEffect(() => {
    setError(false);
    setRefresh(false);
    handleGetInfo(getFunction, API_URL, SERVICE, transformObject, setProducts, setError);
    if (archive.archive && archive.archiveName) {
      onSubmit();
    }
  }, [refresh, archive])

  const handleChange = (event) => {
    event.preventDefault()
    setProduct({
      ...product,
      [event.target.name]: event.target.value,
    });
  }

  const performDelete = async (item) => {
    handleDelete(deleteFunction, API_URL, SERVICE, item.code, setRefresh, setError)
    setRefresh(false)
  }

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

  const handleSubmit = (event) => {
    try {
      createFunction(API_URL, SERVICE, product);
      setRefresh(true);
      setProduct({});
      handleClose();
    } catch (error) {
      console.log(error)
      setError(true);
    }
  }

  const handleError = (error) => {
    console.log(error)
    setError(true);
  }

  const columnNames = [
    { label: 'Código', accessor: 'code' },
    { label: 'Nombre', accessor: 'name' },
    { label: 'Marca', accessor: 'brand' },
    { label: 'Categoría', accessor: 'category' },
    { label: 'Valor', accessor: 'price' },
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
        <Grid item xs={4} md={4} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
          <StyledButton
            variant='contained'
            color='primary'
            startIcon={<ProductionQuantityLimitsIcon />}
            onClick={handleOpen}
          >
            Nuevo Producto
          </StyledButton>
          <StyledButton
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
          </StyledButton>
        </Grid>
        <Grid item xs={12} md={12} lg={12} />
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <StyledBox>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Crear Nuevo Producto
          </Typography>
          <Divider />
          <ValidatorForm onSubmit={handleSubmit} onError={handleError}>
            <Grid container spacing={1}>
              <Grid item xs={6} md={6} lg={6} sx={{ mt: 3 }}>
                <Grid item xs={12} md={12} lg={12} sx={{ mb: 2 }}>
                  <TextField
                    required
                    id='code'
                    name='code'
                    label='Código'
                    fullWidth
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={12} lg={12} sx={{ mb: 2 }}>
                  <TextField
                    required
                    id="name"
                    name="name"
                    label="Nombre"
                    value={product.name || ''}
                    fullWidth
                    autoComplete="name"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={12} lg={12} sx={{ mb: 2 }}>
                  <TextField
                    required
                    id='description'
                    name='description'
                    label='Descripción'
                    value={product.description || ''}
                    fullWidth
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                  <TextField
                    required
                    id='category'
                    name='category'
                    label='Categoria'
                    value={product.category || ''}
                    fullWidth
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
              <Grid item xs={6} md={6} lg={6} sx={{ mt: 3 }}>
                <Grid item xs={12} md={12} lg={12} sx={{ mb: 2 }}>
                  <TextField
                    required
                    id="categoryDescription"
                    name="category_description"
                    label="Descripción Categoria"
                    value={product.category_description || ''}
                    fullWidth
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={12} lg={12} sx={{ mb: 2 }}>
                  <TextField
                    required
                    id='brand'
                    name='brand'
                    label='Marca'
                    value={product.brand || ''}
                    fullWidth
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={12} lg={12} sx={{ mb: 2 }}>
                  <TextField
                    required
                    id="brandDescription"
                    name="brand_description"
                    label="Descripción de Marca"
                    value={product.brand_description || ''}
                    fullWidth
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={12} lg={12} sx={{ mb: 2 }}>
                  <TextField
                    required
                    id="price"
                    name="price"
                    label="Precio"
                    value={product.price || ''}
                    fullWidth
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Grid>
          </ValidatorForm>
          <Grid item xs={1} sm={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <StyledButton
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Crear
            </StyledButton>
            <StyledButton
              variant="contained"
              color="error"
              onClick={handleClose}
            >
              Cancelar
            </StyledButton>
          </Grid>
        </StyledBox>
      </Modal>
    </Container >
  );
}

export default Products;