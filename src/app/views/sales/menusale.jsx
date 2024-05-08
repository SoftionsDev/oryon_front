import { useState, useEffect, useRef } from 'react';
import {
  Grid,
  Button,
  styled,
  Alert,
  AlertTitle,
  Typography,
  Divider,
  InputLabel,
  Select,
  Box,
  Modal,
  MenuItem,
  TextField
} from '@mui/material';
import { DateField } from '@mui/x-date-pickers/DateField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import PaginatedTable from 'app/components/PaginatedTable';
import { ValidatorForm } from "react-material-ui-form-validator";
import { getFunction, deleteFunction, createFunction } from '../../utils/rest_connector';
import { handleGetInfo, handleDelete, getBackendRoutes } from '../../utils/utils';
import { API_URL, COMMISSIONS_TYPES, SALES_TYPES } from '../../../constants';
import axios from 'axios'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';


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

const StyleButton = styled(Button)(({ theme }) => ({
  margin: '5px'
}))

const StyledBox = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
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

const ROUTES = getBackendRoutes()

function Sales() {
  const [sales, setSales] = useState([]);
  const [sale, setSale] = useState({})
  const [products, setProduct] = useState([])
  const [stores, setStore] = useState([])
  const [users, setUsers] = useState([]);
  const [hasError, setError] = useState(false);
  const [archive, setArchive] = useState(initialValues);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [refresh, setRefresh] = useState(false);


  const transformObject = (data) => {
    const transformed_data = data.map((item) => {
      return {
        id: item.id,
        name: `${item.user?.first_name || '-'} ${item.user?.last_name || '-'}`,
        store: item.store.name,
        product: item.product.name,
        date: item.date,
        price: Number(item.price).toLocaleString(),
        type: item.type,
        comission_type: item.commission_type,
        commissioned: item.commissioned ? 'Si' : 'No',
      };
    });
    return transformed_data;
  };

  const transformProduct = (data) => {
    const transformed_data = data.map((item) => {
      return {
        code: item.code,
        name: item.name,
        bradDescription: item.brand_description
      }
    })
    return transformed_data
  }

  const transformUsers = (data) => {
    const transformed_data = data.map((item) => {
      return {
        code: item.code,
        firstName: item.first_name,
        lastName: item.last_name,
      }
    })
    return transformed_data
  }

  const transformStores = (data) => {
    const transformed_data = data.map((item) => {
      return {
        code: item.code,
        name: item.name,
      }
    })
    return transformed_data
  }


  useEffect(() => {
    setError(false);
    setRefresh(false)
    handleGetInfo(getFunction, API_URL, ROUTES.sales, transformObject, setSales, setError);
    if (archive.archive && archive.archiveName) {
      onSubmit();
    }
    handleGetInfo(getFunction, API_URL, ROUTES.products, transformProduct, setProduct, setError)
    handleGetInfo(getFunction, API_URL, ROUTES.users, transformUsers, setUsers, setError)
    handleGetInfo(getFunction, API_URL, ROUTES.stores, transformStores, setStore, setError)
  }, [refresh, archive]);

  const performDelete = async (item) => {
    handleDelete(deleteFunction, API_URL, ROUTES.sales, item.id, setRefresh, setError);
    setRefresh(false);
  };

  const fileSelectHandler = async (e) => {
    if (e.target.files.length > 0) {
      setArchive({
        archive: e.target.files[0],
        archiveName: e.target.files[0].name,
      });
    }
    return false;
  }

  const handleDateWrapper = (date) => {
    const event = {
      target: {
        name: 'date',
        value: date
      }
    }
    handleChange(event)
  }

  const handleChange = (event) => {
    if (event.target.name !== 'date') {
      event.preventDefault();
    }
    setSale({ ...sale, [event.target.name]: event.target.value })
  }

  const inputRef = useRef();

  const onSubmit = async (e) => {
    const fd = new FormData();
    fd.append('file', archive.archive, archive.archiveName);
    try {
      await axios.post(`${API_URL}/${ROUTES.sales}/upload/`, fd, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        }
      });
      setArchive(initialValues);
      setRefresh(true);
    } catch (error) {
      console.log(error)
      setError(true);
    }
  }

  const handleSubmit = async (e) => {
    try {
      const sale_ = {
        user_id: sale.user,
        product_id: sale.product,
        store_id: sale.store,
        price: sale.price,
        type: sale.type,
        commission_type: sale.commission_type,
        date: sale.date.format('DD/MM/YYYY')
      }
      createFunction(API_URL, ROUTES.sales, sale_)
      setRefresh(true)
      setSale({})
      handleClose()
    } catch (error) {
      console.log(error)
      setError(true)
    }
  }

  const handleError = (event) => {
    console.log(event)
    setError(true)
  }

  const columnNames = [
    { label: 'Código', accessor: 'id', hidden: true },
    { label: 'Nombre', accessor: 'name' },
    { label: 'Tienda', accessor: 'store' },
    { label: 'Producto', accessor: 'product' },
    { label: 'Fecha', accessor: 'date' },
    { label: 'Valor', accessor: 'price' },
    { label: 'Tipo Venta', accessor: 'type' },
    { label: 'Tipo Comisión', accessor: 'comission_type' },
    { label: 'Comisionado', accessor: 'commissioned' }
  ];

  const filters = [
    { label: 'Nombre', column: 'name' },
    { label: 'Tienda', column: 'store' },
    { label: 'Fecha', column: 'date' },
  ]

  return (
    <Container>
      {hasError && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Algo ha salido mal, intenta de nuevo
        </Alert>
      )}
      <Grid container spacing={2}>
        <Grid item xs={5} md={5} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
          <StyleButton
            variant='contained'
            color='primary'
            startIcon={<PointOfSaleIcon />}
            onClick={handleOpen}
          >
            Registrar Venta
          </StyleButton>
          <StyleButton
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
          </StyleButton>
          <p />
        </Grid>
        <PaginatedTable
          props={{
            title: 'Ventas',
            columnNames: columnNames,
            items: sales,
            filters: filters,
            actions: [],
          }}
        />
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
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
          <Typography variant='h6' component='h2'>
            Registrar Nueva Venta
          </Typography>
          <Divider />
          <ValidatorForm onSubmit={handleSubmit} onError={handleError}>
            <Grid container spacing={3} sx={{ mt: 0.1 }}>
              <Grid item xs={1} md={6} lg={6}>
                <Box mb={2}>
                  <InputLabel>Usuario</InputLabel>
                  <Select
                    fullWidth
                    id='users'
                    name='user'
                    label='Usuario'
                    value={sale.user || ''}
                    onChange={handleChange}
                  >
                    {users.map((user) => (
                      <MenuItem key={user.code} value={user.code}>{`${user.firstName} ${user.lastName}`}</MenuItem>
                    ))}
                  </Select>
                </Box>

                <Box mb={2}>
                  <InputLabel>Producto</InputLabel>
                  <Select
                    fullWidth
                    id='product'
                    name='product'
                    label='Producto'
                    value={sale.product || ''}
                    onChange={handleChange}
                  >
                    {products.map((product) => (
                      <MenuItem key={product.code} value={product.code}>
                        {`${product.name} - ${product.bradDescription}`}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>

                <Box mb={2}>
                  <InputLabel>Tiendas</InputLabel>
                  <Select
                    fullWidth
                    id='stores'
                    name='store'
                    label='Tiendas'
                    value={sale.store || ''}
                    onChange={handleChange}
                  >
                    {stores.map((store) => (
                      <MenuItem key={store.code} value={store.code}>{store.name}</MenuItem>
                    ))}
                  </Select>
                </Box>

                <Box mb={2}>
                  <InputLabel>Valor Vendido</InputLabel>
                  <TextField
                    fullWidth
                    id='price'
                    name='price'
                    value={sale.price || ''}
                    onChange={handleChange}
                    type='number'
                  />
                </Box>
              </Grid>


              <Grid item xs={1} md={6} lg={6}>
                <Box mb={2}>
                  <InputLabel>Tipo de Venta</InputLabel>
                  <Select
                    fullWidth
                    id='sale_type'
                    name='type'
                    label='Tipo de Venta'
                    value={sale.type || ''}
                    onChange={handleChange}
                  >
                    {Object.values(SALES_TYPES).map((value, index) => (
                      <MenuItem key={index} value={value}>{value}</MenuItem>
                    ))}
                  </Select>
                </Box>

                <Box mb={2}>
                  <InputLabel>Tipo de Comisión</InputLabel>
                  <Select
                    fullWidth
                    id='commission_type'
                    name='commission_type'
                    label='Tipo de Comisión'
                    value={sale.commission_type || ''}
                    onChange={handleChange}
                  >
                    {Object.values(COMMISSIONS_TYPES).map((value, index) => (
                      <MenuItem key={index} value={value}>{value}</MenuItem>
                    ))}
                  </Select>
                </Box>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Box mb={2}>
                    <InputLabel>Fecha de Venta</InputLabel>
                    <DateField
                      id='date'
                      name='date'
                      value={sale.date || ''}
                      onChange={handleDateWrapper}
                      format='DD/MM/YYYY'
                    />
                  </Box>
                </LocalizationProvider>
              </Grid>
            </Grid>
          </ValidatorForm>
          <Grid item xs={1} sm={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <StyleButton variant='contained' color='primary' onClick={handleSubmit}>
              Guardar
            </StyleButton>
            <StyleButton variant='contained' color='error' onClick={handleClose}>
              Cancelar
            </StyleButton>
          </Grid>
        </StyledBox>
      </Modal>
    </Container>
  );
}

export default Sales;
