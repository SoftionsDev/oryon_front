import React, { useState } from 'react';
import { SimpleCard } from 'app/components';
import {
  Button,
  Grid,
  Icon,
  styled,
  Alert,
  AlertTitle
} from "@mui/material";
import { Span } from "app/components/Typography";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { createFunction } from "../../../utils/rest_connector"
import { useNavigate } from 'react-router-dom'

const TextField = styled(TextValidator)(() => ({
    width: "100%",
    marginBottom: "16px",
  }));


const CreateStores = () => {
    const [state, setState] = useState({});
    const [hasError, setHasError] = useState(false)
    const navigate = useNavigate()

    const handleChange = (event) => {
        event.preventDefault()
        setState({ ...state, [event.target.nam]: event.target.value });
      };


    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            await createFunction(state)
            navigate('/dashboard/stores')
        } catch (error) {
            console.log(error)
            setHasError(true)
        }
    }
    const handleError = (event) => {
        console.log(event) 
        setHasError(true)
    }

    return (
        <div>
            {hasError && 
                <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                No se ha podido guardar el registro, intente de nuevo
                </Alert>
            }
            <SimpleCard title='Crear Nuevo Punto de Venta'>
            <ValidatorForm onSubmit={handleSubmit} onError={handleError}>
                <Grid container spacing={6}>
                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                    <TextField
                    type="text"
                    name="code"
                    id="standard-basic"
                    value={state.code || ""}
                    onChange={handleChange}
                    errorMessages={["Este Campo es requerido"]}
                    label="Codigo de punto de venta"
                    validators={["required", "minStringLength: 4", "maxStringLength: 9"]}
                    />

                    <TextField
                    type="text"
                    name="name"
                    label="Nombre"
                    onChange={handleChange}
                    value={state.name || ""}
                    validators={["required"]}
                    errorMessages={["Este Campo es requerido"]}
                    />

                    <TextField
                    type="text"
                    name="city"
                    label="Ubicacion"
                    value={state.city?.name || ""}
                    onChange={handleChange}
                    validators={["required"]}
                    errorMessages={["Este Campo es requerido"]}
                    />

                    <TextField
                    sx={{ mb: 4 }}
                    type="text"
                    name="manager"
                    label="Manager"
                    onChange={handleChange}
                    value={state.manager?.email || ""}
                    errorMessages={["Este Campo es requerido"]}
                    validators={["required"]}
                    />
                </Grid>

                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                    <TextField
                    type="text"
                    name="state"
                    value={state.state || ""}
                    label="Departamento"
                    onChange={handleChange}
                    validators={["required"]}
                    errorMessages={["Este Campo es requerido"]}
                    />
                    <TextField
                    type="text"
                    name="manager"
                    value={state.manager || ""}
                    label="Codigo Manager"
                    onChange={handleChange}
                    validators={["required"]}
                    errorMessages={["Este Campo es requerido"]}
                    />
                </Grid>
                </Grid>

                <Button color="primary" variant="contained" type="submit">
                    <Icon>send</Icon>
                    <Span sx={{ pl: 1, textTransform: "capitalize" }}>Crear</Span>
                </Button>
            </ValidatorForm>
            </SimpleCard>
        </div>
    )
};

export default CreateStores;
