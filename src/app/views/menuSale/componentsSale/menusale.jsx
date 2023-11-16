import { useState, useEffect } from 'react';
import { Grid, styled, Alert, AlertTitle, Icon, Button, Input } from '@mui/material';
import { Span } from 'app/components/Typography';
import PaginatedTableSale from 'app/components/paginatedtableSale';
import { getAllApiSale, deleteApiSale } from '../componentsSale/serviceSale';
import axios from 'axios';




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
  const [archive, setArchive] = useState([]);
  const [hasError, setError] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const uploadFiles=e=>{
    setArchive(e);
  }

  const insertArchive=async()=>{
    const f = new FormData();
    for (let index = 0; index < archive.length; index++ ) {
      f.append("files", archive[index]);
    }
    await axios.post("",f)
    .then(response=>{
      console.log(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }

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
    'Codigo',
    'Producto',
    'Tienda',
    'Nombre comercial',
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
      <br/><br/>
        <Input component="span" type="file" name="files" multiple onChange={(e)=>uploadFiles(e.target.files)}/>
        <br/><br/>
        <Grid item xs={12} md={12}></Grid>

        <Button color="primary" variant="contained" type="submit" onClick={()=>insertArchive()}>
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
