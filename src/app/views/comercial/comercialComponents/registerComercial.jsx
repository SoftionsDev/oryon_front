import React, { useState } from 'react';
import { SimpleCard } from 'app/components';
import {
  Button,
  Grid,
  Icon,
  styled,
  Alert,
  AlertTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Span } from 'app/components/Typography';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { createApiComercial } from '../comercialComponents/servicesComercial';
import { useNavigate } from 'react-router-dom';

const TextField = styled(TextValidator)(() => ({
  width: '100%',
  marginBottom: '16px',
}));

const RegisterComercial = () => {
  const [state, setState] = useState([]);
  const [hasError, setHasError] = useState(false);
  const handleState = (event) => {
    setState(event.target.value);
    console.log(state);
  };
  const navigate = useNavigate();

  const handleChange = (event) => {
    event.persist();
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createApiComercial(state);
      navigate('/dashboard/user-comercial');
      navigate('/');
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
    <div>
      {hasError && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          No se ha podido guardar el registro, intente de nuevo
        </Alert>
      )}
      <SimpleCard title="Registrar nuevo colaborador">
        <ValidatorForm onSubmit={handleSubmit} onError={handleError}>
          <Grid container spacing={6}>
            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField
                type="text"
                name="state"
                value={state.code || ''}
                label="Codigo de usuario"
                onChange={handleState}
                validators={['required']}
                errorMessages={['Este Campo es requerido']}
              />
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Selecionar usuario</InputLabel>
                <Select
                  type="text"
                  name="select_user"
                  id="standart basic"
                  value={state}
                  label="Selecionar usuario"
                  onChange={handleState}
                  validators={['required']}
                  errorMessages={['Este Campo es requerido']}
                >
                  <MenuItem value={'Marta Rojas'}>Marta Rojas</MenuItem>
                  <MenuItem value={'Frenando Suarez'}>Frenando Suarez</MenuItem>
                  <MenuItem value={'Carolina Gomez'}>Carolina Gomez</MenuItem>
                  <MenuItem value={'David Martinez'}>David Martinez</MenuItem>
                  <MenuItem value={'Maria Solorzano'}>Maria Solorzano</MenuItem>
                  <MenuItem value={'Luisa Garcia'}>Luisa Garcia</MenuItem>
                </Select>
              </FormControl>
              <p />

              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Selecionar manager</InputLabel>
                <Select
                  type="text"
                  name="select_manager"
                  id="standart basic"
                  value={state.select_manager || ''}
                  label="Selecionar manager"
                  onChange={handleState}
                  validators={['required']}
                  errorMessages={['Este Campo es requerido']}
                >
                  <MenuItem value={'Calos Pereza'}>Calos Pereza</MenuItem>
                  <MenuItem value={'Fredy Acosrta'}>Fredy Acosrta</MenuItem>
                  <MenuItem value={'Leonardo Sanchez'}>Leonardo Sanchez</MenuItem>
                  <MenuItem value={'Patricia Laña'}>Patricia Laña</MenuItem>
                  <MenuItem value={'Paola Gutierres'}>Paola Gutierres</MenuItem>
                  <MenuItem value={'Griselda Lara'}>Griselda Lara</MenuItem>
                </Select>
              </FormControl>
              <p />

              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Definir meta</InputLabel>
                <Select
                  type="text"
                  name="define_goal"
                  id="standart basic"
                  value={state.type_goal || ''}
                  label="Dfinir meta"
                  onChange={handleState}
                  validators={['required']}
                  errorMessages={['Este Campo es requerido']}
                >
                  <MenuItem value={'Diario'}>Diario</MenuItem>
                  <MenuItem value={'Mensual'}>Mensual</MenuItem>
                  <MenuItem value={'Anual'}>Anual</MenuItem>
                </Select>
              </FormControl>
              <p />
            </Grid>

            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
              <TextField
                type="number"
                name="state"
                value={state.current_goal || ''}
                label="Establecer Meta"
                onChange={handleChange}
                validators={['required']}
                errorMessages={['Este Campo es requerido']}
              />
            </Grid>
          </Grid>

          <Button color="primary" variant="contained" type="submit">
            <Icon>send</Icon>
            <Span sx={{ pl: 1, textTransform: 'capitalize' }}>Crear</Span>
          </Button>
        </ValidatorForm>
      </SimpleCard>
    </div>
  );
};

export default RegisterComercial;
