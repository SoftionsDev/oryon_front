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
    event.preventDefault()
    try {
      await createFunction(API_URL, SERVICE, rule)
      navigate('/dashboard/rulesList');
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
      <ValidatorForm onSubmit={handleSubmit} onError={handleError}>
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
        >

          <SimpleCard title="Creacion de reglas BRM">
            <p />
            <TextField
              type="text"
              name="code"
              id="standard-basic"
              value={rule.code || ""}
              onChange={handleChange}
              label="Regla numero"
              validators={["required", "minStringLength: 4", "maxStringLength: 9"]}
            />
            <TextField
              label="table1"
              name="table1"
              multiline
              value={rule.table1 || ''}
              onChange={handleChange}
              rows={6}
              validators={['required']}
              errorMessages={['Este Campo es requerido']}

            />
            <TextField
              label="campo1"
              name="campo1"
              multiline
              value={rule.campo1 || ''}
              onChange={handleChange}
              maxRows={4}
              validators={['required']}
              errorMessages={['Este Campo es requerido']}
            />
            <FormControl autoWidth>
              <InputLabel id="demo-simple-select-label">Operador</InputLabel>
              <Select
                label="operatorComp"
                name="operatorComp1"
                multiline
                value={rule.operatorComp1 || ''}
                onChange={handleChange}
                maxRows={4}
                validators={['required']}
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
              label="valuenumber "
              name="valuenumber1"
              multiline
              value={rule.valuenumber1 || ''}
              onChange={handleChange}
              validators={['required']}
              errorMessages={['Este Campo es requerido']}

            />
            <FormControl autoWidth>
              <InputLabel id="demo-simple-select-label">And/Or</InputLabel>
              <Select
                label="andor"
                name="andor1"
                multiline
                value={rule.andor1 || ''}
                onChange={handleChange}
                maxRows={4}
                errorMessages={['Este Campo es requerido']}
                validators={['required']}
              >
                <MenuItem value={'And'}>And</MenuItem>
                <MenuItem value={'Or'}>Or</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Campo DB"
              name="campo2"
              value={rule.campo2 || ''}
              onChange={handleChange}
              placeholder="Placeholder"
              multiline
              maxRows={4}
              validators={['required']}
            />
            <FormControl autoWidth>
              <InputLabel id="demo-simple-select-label">Operador</InputLabel>
              <Select
                label="Jefe inmediato"
                name="operator2"
                value={rule.operator2 || ''}
                onChange={handleChange}
                multiline
                maxRows={4}
                errorMessages={['Este Campo es requerido']}
                validators={['required']}
              >
                <MenuItem value={'>'}>Menor que</MenuItem>
                <MenuItem value={'>='}>Menor o igual</MenuItem>
                <MenuItem value={'<'}>Mayor</MenuItem>
                <MenuItem value={'<=>'}>Mayor o igual</MenuItem>
                <MenuItem value={'='}>Igual</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Valor numerico"
              name="valuenumber2"
              value={rule.valuenumber2 || ''}
              onChange={handleChange}
              placeholder="Placeholder"
              multiline
              validators={['required']}
            />
          </SimpleCard>
          <p />
          <SimpleCard>
            <TextField
              label="Tabla campos DB"
              name="valuenumber3"
              value={rule.valuenumber3 || ''}
              onChange={handleChange}
              multiline
              rows={6}
              defaultValue="Default Value"
              validators={['required']}
            />
            <TextField
              label="Valor de la venta"
              name="table2"
              value={rule.table2 || ''}
              onChange={handleChange}
              multiline
              maxRows={4}
              validators={['required']}
            />
            <FormControl autoWidth>
              <InputLabel id="demo-simple-select-label">Operador logico</InputLabel>
              <Select
                label="Jefe inmediato"
                name="valueSale2"
                value={rule.valueSale2 || ''}
                onChange={handleChange}
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
              label="Campo DB"
              name="valuenumber4"
              value={rule.valuenumber4 || ''}
              onChange={handleChange}
              placeholder="Placeholder"
              multiline
            />
            <FormControl autoWidth>
              <InputLabel id="demo-simple-select-label">Operador logico</InputLabel>
              <Select
                label="Jefe inmediato"
                multiline
                name="operator3"
                value={rule.operator3 || ''}
                onChange={handleChange}
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
              label="Valor numerico"
              name="campo3"
              value={rule.campo3 || ''}
              onChange={handleChange}
              placeholder="Placeholder"
              multiline
            />
          </SimpleCard>
          <p />
        </Box>
      </ValidatorForm>
    </Container >
  );
};

export default CreateRules;
