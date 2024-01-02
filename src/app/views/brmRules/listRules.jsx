import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import { SimpleCard } from 'app/components';
import {  styled, Alert, AlertTitle } from '@mui/material';
import { ValidatorForm } from 'react-material-ui-form-validator';
import { useNavigate } from 'react-router-dom';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { createFunction, deleteFunction } from 'app/utils/rest_connector';
import { API_URL } from "../../../constants"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import PaginatedTable from "app/components/PaginatedTable";
import { handleDelete } from "../../utils/utils"

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
  const [rule] = useState({});
  const navigate = useNavigate();
  const [hasError, setError] = useState(false);
  const [setRefresh] = useState(false)


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createFunction(API_URL, SERVICE, rule);
      navigate('/dashboard/listRules');
      setRefresh(true)
    } catch (error) {
      console.log(error);
      setError(true);

    }
  };
  const handleError = (event) => {
    console.log(event);
    setError(true);
  };

  const performDelete = async (item) => {
    handleDelete(deleteFunction, API_URL, SERVICE, item.code, setRefresh, setError)
}

  const columnNames = [
    "Codigo de usuario",
    "Nomres",
    "Apellidos",
    "Descripcion cargo",
    "Fecha de ingreso",
    "Jefe inmediato",
    "Punto de venta asignado",
    "Rol"
]

  return (
    <Container>

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
            <SimpleCard title="Lista reglas creadas (BRM)">
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
            <p/>
            <PaginatedTable props={
                    {
                        columnNames: columnNames,
                        items: rule,
                        actions: [
                            {
                                icon: "delete",
                                color: "error",
                                click: performDelete
                            }
                        ]
                    }
                }
                />
          </ValidatorForm>
        </div>
      </Box>
    </Container>
  );
}

export default CreateRules;
