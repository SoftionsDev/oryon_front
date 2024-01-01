import { useState, useEffect } from 'react';
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
  const [setRules1, rules1] = useState([]);
  const [setRules2, rules2] = useState([]);
  const [setRules3, rules3] = useState([]);
  const [setRules4, rules4] = useState([]);
  const [setRules5, rules5] = useState([]);
  const [setRules6, rules6] = useState([]);
  const [setRules7, rules7] = useState([]);
  const [setRules8, rules8] = useState([]);
  const [hasError, setError] = useState(false);

  const [refresh, setRefresh] = useState(false);

  const handleChange = (camp, event) => {
    switch (camp) {
      case 'rules1':
        setRules1(event.target.value);
        break;
      case 'rules2':
        setRules2(event.target.value);
        break;
      case 'rules3':
        setRules3(event.target.value);
        break;
      case 'rules4':
        setRules4(event.target.value);
        break;
      case 'rules5':
        setRules5(event.target.value);
        break;
      case 'rules6':
        setRules6(event.target.value);
        break;
      case 'rules7':
        setRules7(event.target.value);
        break;
      case 'rules8':
        setRules8(event.target.value);
        break;
      default:
        break;
    }
  };

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
    handleGetInfo(getFunction, API_URL, SERVICE, transformObject, setRules1, setRules3, setRules3, setRules4, setRules5, setRules6, setRules7, setRules8, setError);
  }, [refresh])

  const performDelete = async (item) => {
    handleDelete(deleteFunction, API_URL, SERVICE, item.rules, setRefresh, setError)
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
                value={rules1}
                onChange={(e) => handleChange('rules2', e)}
                rows={6}
                defaultValue="Default Value"
              />
              <TextField
                id="outlined-multiline-flexible"
                label="Campo DB"
                multiline
                value={rules2}
                onChange={(e) => handleChange('rules2', e)}
                maxRows={4}
              />
              <FormControl autoWidth>
                <InputLabel id="demo-simple-select-label">Operador</InputLabel>
                <Select
                  id="outlined-multiline-static"
                  label="Jefe inmediato"
                  multiline
                  value={rules3}
                  onChange={(e) => handleChange('rules3', e)}
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
                value={rules4}
                onChange={(e) => handleChange('rules4', e)}
              />
              <FormControl autoWidth>
                <InputLabel id="demo-simple-select-label">And/Or</InputLabel>
                <Select
                  id="outlined-multiline-static"
                  label="Jefe inmediato"
                  multiline
                  value={rules5}
                  onChange={(e) => handleChange('rules5', e)}
                  maxRows={4}
                  errorMessages={['Este Campo es requerido']}
                >
                  <MenuItem value={'And'}>And</MenuItem>
                  <MenuItem value={'Or'}>Or</MenuItem>

                </Select>
              </FormControl>
            </Box>
            <Grid item xs={0} md={0}>
              <Box
                component="form"
                sx={{
                  '& .MuiTextField-root': { m: 1, width: '40ch' },
                  '& .MuiFormControl-root': { m: 1, width: '40ch' },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="outlined-multiline-flexible"
                  label="Campo DB"
                  multiline
                  value={rules6}
                  onChange={(e) => handleChange('rules6', e)}
                  maxRows={4}
                />

                <FormControl autoWidth>
                  <InputLabel id="demo-simple-select-label">Operador</InputLabel>
                  <Select
                    id="outlined-multiline-static"
                    label="Jefe inmediato"
                    multiline
                    value={rules7}
                    onChange={(e) => handleChange('rules7', e)}
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
                  value={rules8}
                  onChange={(e) => handleChange('rules8', e)}
                />
              </Box>
            </Grid>
          </Grid>

        </Grid>
      </SimpleCard>
      <p />
      <SimpleCard>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} />
          <Grid item xs={0} md={0}>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '40ch' },
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
                label="Valor de la venta"
                multiline
                maxRows={4}
              />
              <FormControl autoWidth>
                <InputLabel id="demo-simple-select-label">Operador logico</InputLabel>
                <Select
                  id="outlined-multiline-static"
                  label="Jefe inmediato"
                  multiline
                  maxRows={4}
                  errorMessages={['Este Campo es requerido']}
                >
                  <MenuItem value={'+'}>Suma</MenuItem>
                  <MenuItem value={'-'}>Resta</MenuItem>
                  <MenuItem value={'*'}>Multiplicacion</MenuItem>
                  <MenuItem value={'/'}>Division</MenuItem>

                </Select>
              </FormControl>
              <TextField
                id="outlined-textarea"
                label="Campo DB"
                placeholder="Placeholder"
                multiline
              />
              <FormControl autoWidth>
                <InputLabel id="demo-simple-select-label">Operador logico</InputLabel>
                <Select
                  id="outlined-multiline-static"
                  label="Jefe inmediato"
                  multiline
                  maxRows={4}
                  errorMessages={['Este Campo es requerido']}
                >
                  <MenuItem value={'+'}>Suma</MenuItem>
                  <MenuItem value={'-'}>Resta</MenuItem>
                  <MenuItem value={'*'}>Multiplicacion</MenuItem>
                  <MenuItem value={'/'}>Division</MenuItem>
                </Select>
              </FormControl>
              <TextField
                id="outlined-textarea"
                label="Valor numerico"
                placeholder="Placeholder"
                multiline
              />
            </Box>


          </Grid>

        </Grid>
      </SimpleCard>
    </Container>
  );
}

export default Rules;
