import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import { SimpleCard } from 'app/components';
import { Button, Grid, Icon, styled, Alert, AlertTitle } from '@mui/material';
import { Span } from 'app/components/Typography';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { createApiUser } from '../componentsUser/servicesUser';
import { useNavigate } from 'react-router-dom';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import useAuth from 'app/hooks/useAuth';


const TextField = styled(TextValidator)(() => ({
  width: '100%',
  marginBottom: '16px',
}));

const CreateUsers = () => {
  const [state, setState ] = useAuth({});
  const [hasError, setHasError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    event.persist();
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createApiUser(state);
      navigate('/dashboard/list-user');
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
      <SimpleCard title="Registrar nuevo usuario">
        <ValidatorForm onSubmit={handleSubmit} onError={handleError}>
          <Grid container spacing={6}>
            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
              <TextField
                type="text"
                name="code"
                id="standard-basic"
                value={state.code || ''}
                onChange={handleChange}
                errorMessages={['Este Campo es requerido']}
                label="Codigo de usuario"
                validators={['required', 'minStringLength: 4', 'maxStringLength: 9']}
              />

              <TextField
                type="text"
                name="name"
                label="Nombre"
                onChange={handleChange}
                value={state.name || ''}
                validators={['required']}
                errorMessages={['Este Campo es requerido']}
              />

              <TextField
                type="text"
                name="last_name"
                label="Apellidos"
                value={state.last_name || ''}
                onChange={handleChange}
                validators={['required']}
                errorMessages={['Este Campo es requerido', 'email is not valid']}
              />

              <TextField
                sx={{ mb: 4 }}
                type="text"
                name="description"
                label="Descripcion"
                onChange={handleChange}
                value={state.description || ''}
                errorMessages={['Este Campo es requerido']}
                validators={['required', 'minStringLength:4', 'maxStringLength: 16']}
              />

              <TextField
                type="date"
                name="date"
                onChange={handleChange}
                value={state.date || ''}
                errorMessages={['Este Campo es requerido']}
                validators={['required', 'minStringLength:4', 'maxStringLength: 16']}
              />

              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Jefe inmediato</InputLabel>
                <Select
                  type="text"
                  name="rol"
                  id="standart basic"
                  value={state.rol || ''}
                  label="Jefe inmediato"
                  onChange={handleChange}
                  validators={['required']}
                  errorMessages={['Este Campo es requerido']}
                >
                  <MenuItem value={state.rol}>Admin</MenuItem>
                  <MenuItem value={state.rol}>Manager</MenuItem>
                  <MenuItem value={state.rol}>Colaborador</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Punto asignado</InputLabel>
                <Select
                  type="text"
                  name="rol"
                  id="standart basic"
                  value={state.rol || ''}
                  label="Jefe inmediato"
                  onChange={handleChange}
                  validators={['required']}
                  errorMessages={['Este Campo es requerido']}
                >
                  <MenuItem value={state.rol}>Admin</MenuItem>
                  <MenuItem value={state.rol}>Manager</MenuItem>
                  <MenuItem value={state.rol}>Colaborador</MenuItem>
                </Select>
              </FormControl>
              <p/>
              <TextField
                type="text"
                name="Email"
                value={state.email || ''}
                label="Email"
                onChange={handleChange}
                validators={['required']}
                errorMessages={['Este Campo es requerido']}
              />
              <TextField
                type="password"
                name="password"
                value={state.password || ''}
                label="Contraseña"
                onChange={handleChange}
                validators={['required']}
                errorMessages={['Este Campo es requerido']}
              />

              <TextField
                type="text"
                name="charge_code"
                value={state.charge_code || ''}
                label="Codigo de cargo"
                onChange={handleChange}
                validators={['required']}
                errorMessages={['Este Campo es requerido']}
              />
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Rol</InputLabel>
                  <Select
                    type="text"
                    name="rol"
                    id="standart basic"
                    value={state.rol || ''}
                    label="Rol"
                    onChange={handleChange}
                  >
                    <MenuItem value={state.rol}>Admin</MenuItem>
                    <MenuItem value={state.rol}>Manager</MenuItem>
                    <MenuItem value={state.rol}>Colaborador</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
          </Grid>
          <p />
          <Button color="primary" variant="contained" type="submit">
            <Icon>send</Icon>
            <Span sx={{ pl: 1, textTransform: 'capitalize' }}>Crear</Span>
          </Button>
        </ValidatorForm>
      </SimpleCard>
    </div>
  );
};

export default CreateUsers;
