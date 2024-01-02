import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import { SimpleCard } from 'app/components';
import { Button, Icon, styled, Alert, AlertTitle } from '@mui/material';
import { Span } from 'app/components/Typography';
import { ValidatorForm } from 'react-material-ui-form-validator';
import { useNavigate } from 'react-router-dom';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { createFunction } from 'app/utils/rest_connector';
import { API_URL } from "../../../constants"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
  },
}));


const SERVICE = process.env.REACT_APP_RULES_SERVICE || 'rules'

const CreateRules = () => {
  const [rule, setRule] = useState({});
  const navigate = useNavigate();
  const [hasError, setHasError] = useState(false);
  const [setRefresh] = useState(false)


  const handleChange = (event) => {
    event.preventDefault();
    setRule({ ...rule, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createFunction(API_URL, SERVICE, rule);
      navigate('/dashboard/listRules');
      setRefresh(true)
    } catch (error) {
      console.log(error);
      setHasError(true);

    }
  };
  const handleError = (event) => {
    console.log(event);
    setHasError(true);
  };

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
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
          '& .MuiFormControl-root': { m: 1, width: '40ch' },
        }}
        noValidate
        autoComplete="off"
      ><div>
          <ValidatorForm onSubmit={handleSubmit} onError={handleError}>
            <SimpleCard title="Creacion de reglas BRM">
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
                <div>
                  <TextField
                    id="outlined-multiline-static"
                    label="table1"
                    multiline
                    value={rule.table1 || ''}
                    onChange={handleChange}
                    rows={6}
                    defaultValue="Default Value"
                  />
                  <TextField
                    id="outlined-multiline-flexible"
                    label="campo1"
                    multiline
                    value={rule.campo1 || ''}
                    onChange={handleChange}
                    maxRows={4}
                  />
                  <FormControl autoWidth>
                    <InputLabel id="demo-simple-select-label">Operador</InputLabel>
                    <Select
                      id="outlined-multiline-static"
                      label="operatorComp"
                      multiline
                      value={rule.operatorComp || ''}
                      onChange={handleChange}
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
                    label="valuenumber "
                    placeholder="Placeholder"
                    multiline
                    value={rule.valuenumber || ''}
                    onChange={handleChange}

                  />
                  <FormControl autoWidth>
                    <InputLabel id="demo-simple-select-label">And/Or</InputLabel>
                    <Select
                      id="outlined-multiline-static"
                      label="andor"
                      multiline
                      value={rule.andor || ''}
                      onChange={handleChange}
                      maxRows={4}
                      errorMessages={['Este Campo es requerido']}
                    >
                      <MenuItem value={'And'}>And</MenuItem>
                      <MenuItem value={'Or'}>Or</MenuItem>

                    </Select>
                  </FormControl>
                </div>
              </Box>

              <Box
                component="form"
                sx={{
                  '& .MuiTextField-root': { m: 1, width: '40ch' },
                  '& .MuiFormControl-root': { m: 1, width: '40ch' },
                }}
                noValidate
                autoComplete="off"
              ><div>
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
                </div>
              </Box>
            </SimpleCard>
            <p />
            <SimpleCard>
              <Box
                component="form"
                sx={{
                  '& .MuiTextField-root': { m: 1, width: '25ch' },
                  '& .MuiFormControl-root': { m: 1, width: '40ch' },
                }}
                noValidate
                autoComplete="off"
              ><div>
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
                </div>
              </Box>
            </SimpleCard>
          </ValidatorForm>
        </div>
      </Box>
    </Container>
  );
}

export default CreateRules;
