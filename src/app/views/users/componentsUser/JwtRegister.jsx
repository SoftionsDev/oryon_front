import { LoadingButton } from '@mui/lab';
import { Grid, TextField } from '@mui/material';
import { Box, styled } from '@mui/system';
import useAuth from 'app/hooks/useAuth';
import { Formik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { createApiUser } from '../componentsUser/servicesUser';
import { SimpleCard } from 'app/components';

const FlexBox = styled(Box)(() => ({
  width: '100%',
  marginBottom: '16px',
}));

const JustifyBox = styled(FlexBox)(() => ({ justifyContent: 'center' }));

const JWTRegister = styled(JustifyBox)(() => ({}));

// inital login credentials
const initialValues = {
  code: '',
  name:'',
  last_name:'',
  charge_code:'',
  email: '',
  password: '',
  date: '',
  assigned_point:'',
  immediate_boss: '',
  rol: '',
};

// form field validation schema
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'La contraseña debe tener 6 caracteres de longitud')
    .required('Contraseña es requerida!'),
  email: Yup.string().email('Direccion email invalido').required('Email es requerido!'),
  name: Yup.string().required('Nombre es requerido')
});

const JwtRegister = () => {
  const { register } = useState();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (state) => {
    setLoading(true);

    try {
      await createApiUser(state);
      navigate('/dashboard/list-user');
      register(state.code, state.name, state.last_name, state.charge_code, state.email, state.password, state.date, state.assigned_point, state.immediate_boss, state.rol);
      navigate('/');
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  return (
    <JWTRegister>
      <SimpleCard title="Registro de nuevos usuarios">
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <Formik
              onSubmit={handleFormSubmit}
              initialValues={initialValues}
              validationSchema={validationSchema}
            >
              {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                   <TextField
                    fullWidth
                    size="small"
                    name="code"
                    type="text"
                    label="Codigo"
                    variant="outlined"
                    onBlur={handleBlur}
                    value={values.code || ""}
                    onChange={handleChange}
                    helperText={touched.name && errors.name}
                    error={Boolean(errors.name && touched.name)}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    size="small"
                    name="name"
                    type="text"
                    label="Nombre"
                    variant="outlined"
                    onBlur={handleBlur}
                    value={values.name || ""}
                    onChange={handleChange}
                    helperText={touched.name && errors.name}
                    error={Boolean(errors.name && touched.name)}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    size="small"
                    name="lastsname"
                    type="text"
                    label="Apellido"
                    variant="outlined"
                    onBlur={handleBlur}
                    value={values.last_name || ""}
                    onChange={handleChange}
                    helperText={touched.password && errors.password}
                    error={Boolean(errors.password && touched.password)}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    size="small"
                    type="text"
                    name="charge_code"
                    label="Codigo de cargo"
                    variant="outlined"
                    onBlur={handleBlur}
                    value={values.charge_code || ""}
                    onChange={handleChange}
                    helperText={touched.username && errors.username}
                    error={Boolean(errors.username && touched.username)}
                    sx={{ mb: 2 }}
                  />

                  <TextField
                    fullWidth
                    size="small"
                    type="email"
                    name="email"
                    label="Email"
                    variant="outlined"
                    onBlur={handleBlur}
                    value={values.email || ""}
                    onChange={handleChange}
                    helperText={touched.email && errors.email}
                    error={Boolean(errors.email && touched.email)}
                    sx={{ mb: 2 }}
                  />

                  <TextField
                    fullWidth
                    size="small"
                    name="password"
                    type="password"
                    label="Contraseña"
                    variant="outlined"
                    onBlur={handleBlur}
                    value={values.password || ""}
                    onChange={handleChange}
                    helperText={touched.password && errors.password}
                    error={Boolean(errors.password && touched.password)}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    size="small"
                    name="password"
                    type="date"
                    variant="outlined"
                    onBlur={handleBlur}
                    value={values.date || ""}
                    onChange={handleChange}
                    helperText={touched.password && errors.password}
                    error={Boolean(errors.password && touched.password)}
                    sx={{ mb: 2 }}
                  />

                  <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 0 }}>
                    <TextField
                      fullWidth
                      size="small"
                      name="password"
                      type="text"
                      label="Punto de venta"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.assigned_point || ""}
                      onChange={handleChange}
                      helperText={touched.password && errors.password}
                      error={Boolean(errors.password && touched.password)}
                      sx={{ mb: 2 }}
                    />
                    <TextField
                      fullWidth
                      size="small"
                      name="password"
                      type="text"
                      label="Jefe inmediato"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.immediate_boss || ""}
                      onChange={handleChange}
                      helperText={touched.password && errors.password}
                      error={Boolean(errors.password && touched.password)}
                      sx={{ mb: 2 }}
                    />
                    <TextField
                      fullWidth
                      size="small"
                      name="password"
                      type="text"
                      label="Rol"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.rol || ""}
                      onChange={handleChange}
                      helperText={touched.password && errors.password}
                      error={Boolean(errors.password && touched.password)}
                      sx={{ mb: 2 }}
                    />
                  </Grid>

                  <LoadingButton
                    type="submit"
                    color="primary"
                    loading={loading}
                    variant="contained"
                    sx={{ mb: 2, mt: 3 }}
                  >
                    Registrar
                  </LoadingButton>
                </form>
              )}
            </Formik>
          </Grid>
        </Grid>
      </SimpleCard>
    </JWTRegister>
  );
};

export default JwtRegister;
