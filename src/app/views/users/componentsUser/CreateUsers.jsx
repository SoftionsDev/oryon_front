import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import { SimpleCard } from 'app/components';
import { Button, Grid, Icon, styled, Alert, AlertTitle } from '@mui/material';
import { Span } from 'app/components/Typography';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { useNavigate } from 'react-router-dom';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import * as Yup from 'yup';
import { createFunction } from 'app/utils/rest_connector';
import { API_URL } from "../../../../constants"

const TextField = styled(TextValidator)(() => ({
  width: '100%',
  marginBottom: '16px',
}));

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Password must be 6 character length')
    .required('Password is required!'),
  email: Yup.string().email('Invalid Email address').required('Email is required!'),
});

const SERVICE = process.env.REACT_APP_USERS_SERVICE || 'users'

const CreateUsers = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [hasError, setHasError] = useState(false);
  const [setRefresh] = useState(false)


  const handleChange = (event) => {
    event.preventDefault();
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const datas = {
        code: user.code,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        password: user.passwrod,
        position: user.position,
        groups: [user.role],
        user_permissions: []
      }

      await createFunction(API_URL, SERVICE, datas);
      navigate('/dashboard/listUser');
      setRefresh(true)
      setUser({})  
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
        <ValidatorForm
          onSubmit={handleSubmit}
          onError={handleError}
          validationSchema={validationSchema}
        >
          <Grid container spacing={6}>
            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
              <TextField
                type="text"
                name="code"
                id="standard-basic"
                value={user.code || ''}
                onChange={handleChange}
                errorMessages={['Este Campo es requerido']}
                label="Codigo de usuario"
                validators={['required', 'minStringLength: 4', 'maxStringLength: 9']}
              />

              <TextField
                type="text"
                name="first_name"
                label="Nombre"
                onChange={handleChange}
                value={user.first_name || ''}
                validators={['required']}
                errorMessages={['Este Campo es requerido']}
              />

              <TextField
                type="text"
                name="last_name"
                label="Apellidos"
                value={user.last_name || ''}
                onChange={handleChange}
                validators={['required']}
                errorMessages={['Este Campo es requerido', 'email is not valid']}
              />

              <TextField
                sx={{ mb: 4 }}
                type="text"
                name="position"
                label="Posicion"
                value={user.position || ''}
                onChange={handleChange}
                errorMessages={['Este Campo es requerido']}
                validators={['required', 'minStringLength:4', 'maxStringLength: 16']}
              />
            </Grid>

            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
              <TextField
                type="text"
                name="email"
                value={user.email || ''}
                label="Email"
                onChange={handleChange}
                validators={['required']}
                errorMessages={['Este Campo es requerido']}
              />
              <TextField
                type="password"
                name="password"
                value={user.password || ''}
                label="Contraseña"
                onChange={handleChange}
                validators={['required']}
                errorMessages={['Este Campo es requerido']}
              />

              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Rol</InputLabel>
                <Select
                  type="text"
                  name="role"
                  id="standart basic"
                  value={user.role || ''}
                  label="Rol"
                  onChange={handleChange}
                >
                  <MenuItem value={1}>Admin</MenuItem>
                  <MenuItem value={2}>Manager</MenuItem>
                  <MenuItem value={3}>Colaborador</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <p />
          <Button color="primary" variant="contained" type="submit">
            <Icon>person_add</Icon>
            <Span sx={{ pl: 1, textTransform: 'capitalize' }}>Registrar</Span>
          </Button>
        </ValidatorForm>
      </SimpleCard>
    </div>
  );
};

export default CreateUsers;
