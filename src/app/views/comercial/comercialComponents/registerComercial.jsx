import React, { useEffect, useState } from 'react';
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
import { useNavigate } from 'react-router-dom';
import { createFunction } from 'app/utils/rest_connector';
import { API_URL, ROLES } from '../../../../constants';
import { getFunction } from '../../../utils/rest_connector';


const SERVICE = process.env.REACT_APP_COMERCIALS_SERVICE || 'comercials';
const USER_SERVICE = process.env.REACT_APP_USERS_SERVICE || 'users';

const TextField = styled(TextValidator)(() => ({
  width: '100%',
  marginBottom: '16px',
}));

const RegisterComercial = () => {
  const [commercial, setComercial] = useState({});
  const [users, setUsers] = useState([]);
  const [managers, setManagers] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [setRefresh] = useState(false)
  const navigate = useNavigate();

  const handleChange = (event) => {
    event.preventDefault();
    setComercial({ ...commercial, [event.target.name]: event.target.value });
    console.log(commercial)
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await getFunction(API_URL, USER_SERVICE);
        setManagers(data.filter(
          item => item.groups.includes(ROLES.Admin) || item.groups.includes(ROLES.Manager)
        ))
        setUsers(data.filter(
          item => item.groups.includes(ROLES.Colaborador)
        ));
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const data = {
        user_email: commercial.user,
        manager_email: commercial.manager,
        goal: commercial.goal,
        goal_type: commercial.goal_type
      }
      await createFunction(API_URL, SERVICE, data)
      navigate('/dashboard/userComercial');
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
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Selecionar usuario</InputLabel>
                <Select
                  type="text"
                  name="user"
                  id="standart basic"
                  value={commercial.user || ''}
                  label="Selecionar usuario"
                  onChange={handleChange}
                  validators={['required']}
                  errorMessages={['Este Campo es requerido']}
                >
                  {users.map((user) => (
                    <MenuItem key={user.id} value={user.email}>
                      {user.first_name + ' ' + user.last_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <p />

              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Selecionar manager</InputLabel>
                <Select
                  type="text"
                  name="manager"
                  id="standart basic"
                  value={commercial.manager || ''}
                  label="Selecionar manager"
                  onChange={handleChange}
                  validators={['required']}
                  errorMessages={['Este Campo es requerido']}
                >
                  {managers.map((manager) => (
                    <MenuItem key={manager.id} value={manager.email}>
                      {manager.email}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <p />
              <p />
            </Grid>

            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
              <TextField
                type="number"
                name="goal"
                value={commercial.goal || ''}
                label="Establecer Meta"
                onChange={handleChange}
                validators={['required']}
                errorMessages={['Este Campo es requerido']}
              />

              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Definir meta</InputLabel>
                <Select
                  type="text"
                  name="goal_type"
                  id="standart basic"
                  value={commercial.goal_type || ''}
                  label="Definir meta"
                  onChange={handleChange}
                  validators={['required']}
                  errorMessages={['Este Campo es requerido']}
                >
                  <MenuItem value={'D'}>Diario</MenuItem>
                  <MenuItem value={'M'}>Mensual</MenuItem>
                  <MenuItem value={'Y'}>Anual</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Button color="primary" variant="contained" type="submit">
            <Icon>person_add</Icon>
            <Span sx={{ pl: 1, textTransform: 'capitalize' }}>Registrar</Span>
          </Button>
        </ValidatorForm>
      </SimpleCard>
    </div>
  );
};

export default RegisterComercial;
