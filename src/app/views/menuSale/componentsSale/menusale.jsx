import { useState, useEffect, useRef } from 'react';
import {
  Grid, Button, styled, Alert, AlertTitle
} from '@mui/material';
import PaginatedTable from 'app/components/PaginatedTable';
import { getFunction, deleteFunction } from '../../../utils/rest_connector';
import { handleGetInfo, handleDelete } from '../../../utils/utils';
import { API_URL } from '../../../../constants';
import axios from 'axios'
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

const SERVICE = process.env.REACT_APP_SALES_SERVICE || 'sales';

function Sales() {
  const [sales, setSales] = useState([]);
  const [hasError, setError] = useState(false);
  const [archive, setArchive] = useState(initialValues);

  const [refresh, setRefresh] = useState(false);


  const transformObject = (data) => {
    const transformed_data = data.map((item) => {
      return {
        id: item.id,
        email: item.user.email,
        store: item.store.name,
        product: item.product.name,
        date: item.date,
        price: item.price,
        type: item.type,
        comission_type: item.commission_type,
        commissioned: item.commissioned ? 'Si' : 'No',
      };
    });
    return transformed_data;
  };

  useEffect(() => {
    setError(false);
    handleGetInfo(getFunction, API_URL, SERVICE, transformObject, setSales, setError);
    if (archive.archive && archive.archiveName) {
      onSubmit();
    }
  }, [refresh, archive]);

  const performDelete = async (item) => {
    handleDelete(deleteFunction, API_URL, SERVICE, item.id, setRefresh, setError);
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

  const inputRef = useRef();

  const onSubmit = async (e) => {
    const fd = new FormData();
    fd.append('file', archive.archive, archive.archiveName);
    try {
      await axios.post(`${API_URL}/${SERVICE}/upload/`, fd, {
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

  const columnNames = [
    'Codigo',
    'email',
    'Tienda',
    'Producto',
    'Fecha',
    'Valor',
    'Tipo Venta',
    'Tipo Comision',
    'Comisionado'
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
            title: 'Ventas',
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
