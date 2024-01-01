
/*import { useState, useEffect } from 'react';
import { Grid, Button, styled, Alert, AlertTitle } from '@mui/material';
import { Span } from 'app/components/Typography';
import { getFunction, deleteFunction } from 'app/utils/rest_connector';
import { Icon } from '@mui/material';
import { handleGetInfo, handleDelete } from 'app/utils/utils';
import { API_URL } from '../../../constants';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { SimpleCard } from 'app/components';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';


const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
  },
}));

const SERVICE = process.env.REACT_APP_PRODUCTS_SERVICE || 'createRules';

function Rules() {
  const [setRules] = useState([]);
  const [hasError, setError] = useState(false);

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
    handleGetInfo(getFunction, API_URL, SERVICE, transformObject, setRules, setError);
  }, [refresh])

  const performDelete = async (item) => {
    handleDelete(deleteFunction, API_URL, SERVICE, item.code, setRefresh, setError)
  }


  return (
    <Container>
      <Button color="primary" variant="contained" type="submit">
        <Icon>border_color</Icon>
        <Span sx={{ pl: 1, textTransform: 'capitalize' }}>Crear Reglar (BRM)</Span>
      </Button>
      <p />
      {hasError && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Algo ha salido mal, intenta de nuevo
        </Alert>
      )}
      <SimpleCard title="Creacion de reglas BRM">
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} />
          <Grid item xs={0} md={0}>
            <p />
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '30ch' },
                '& .MuiFormControl-root': { m: 1, width: '40ch' },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-multiline-static"
                label="Tabla campos DB"
                multiline
                rows={6}
                defaultValue="Default Value"
              />
              <TextField
                id="outlined-multiline-flexible"
                label="Campo DB"
                multiline
                maxRows={4}
              />
              <FormControl autoWidth>
                <InputLabel id="demo-simple-select-label">Operador</InputLabel>
                <Select
                  id="outlined-multiline-static"
                  label="Jefe inmediato"
                  multiline
                  maxRows={4}
                  errorMessages={['Este Campo es requerido']}
                >
                  <MenuItem value={'>'}>Menor que</MenuItem>
                  <MenuItem value={'>='}>Menor o igual</MenuItem>
                  <MenuItem value={'<'}>Mayor</MenuItem>
                  <MenuItem value={'<=>'}>Mayor o igual</MenuItem>
                  <MenuItem value={'='}>Igual</MenuItem>
                </Select>
              </FormControl>


              <TextField
                id="outlined-textarea"
                label="Valor numerico"
                placeholder="Placeholder"
                multiline
              />
              <FormControl autoWidth>
                <InputLabel id="demo-simple-select-label">And/Or</InputLabel>
                <Select
                  id="outlined-multiline-static"
                  label="Jefe inmediato"
                  multiline
                  maxRows={4}
                  errorMessages={['Este Campo es requerido']}
                >
                  <MenuItem value={'And'}>And</MenuItem>
                  <MenuItem value={'Or'}>Or</MenuItem>

                </Select>
              </FormControl>
            </Box>
            
          </Grid>

        </Grid>
      </SimpleCard>
      <p />
    </Container>
  );
}

export default Rules;*/
