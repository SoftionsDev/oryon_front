import { useState, useEffect } from "react";
import {
    Grid,
    styled,
    Alert,
    AlertTitle,
    Typography,
    Box,
    Modal,
    MenuItem,
    InputLabel,
    Select,
    FormControl,
    IconButton,
    Divider,
    Button,
    Icon,
} from "@mui/material";
import * as Yup from 'yup';
import { Span } from 'app/components/Typography';
import CloseIcon from '@mui/icons-material/Close';
import PaginatedTable from "app/components/PaginatedTable";
import { getFunction, deleteFunction, createFunction } from "../../utils/rest_connector"
import { handleGetInfo, handleDelete } from "../../utils/utils"
import { API_URL, ROLES, POSITIONS } from "../../../constants"
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";


const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
        marginBottom: "30px",
        [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
}));

const StyledButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(1),
}));


const StyledBox = styled(Box)(({ theme }) => ({
    margin: theme.spacing(1),
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    backgroundColor: 'white',
    padding: theme.spacing(2),
    boxShadow: theme.shadows[5],
    borderRadius: '5px'
}))

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


function Users() {

    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({});
    const [hasError, setError] = useState(false);
    const [refresh, setRefresh] = useState(false)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const transformObject = (data) => {
        const transformedData = data.map((item) => {
            return {
                code: item.code,
                name: item.first_name,
                last_name: item.last_name,
                position: POSITIONS[item.position],
                date: (() => {
                    const date = new Date(item.date_joined);
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const day = String(date.getDate()).padStart(2, '0');
                    return `${date.getFullYear()}-${month}-${day}`;
                })(),
                role: item.groups.map((group) => Object.keys(ROLES).find(key => ROLES[key] === group))
            }
        })
        return transformedData
    }

    useEffect(() => {
        setError(false)
        setRefresh(false)
        handleGetInfo(
            getFunction, API_URL, SERVICE, transformObject, setUsers, setError
        )
    }, [refresh])


    const handleChange = (event) => {
        event.preventDefault()
        setUser({ ...user, [event.target.name]: event.target.value });
    }

    const handleSubmit = async (event) => {
        try {
            const data = {
                code: user.code,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                password: user.password,
                position: user.position,
                groups: [user.role],
                user_permissions: []
            }
            await createFunction(API_URL, SERVICE, data)
            setRefresh(true)
            setUser({})
            setOpen(false)
        } catch (error) {
            console.log(error)
            setError(true)
        }
    }

    const handleError = (event) => {
    }

    const performDelete = async (item) => {
        console.log(item)
        handleDelete(deleteFunction, API_URL, SERVICE, item.code, setRefresh, setError)
    }

    const columnNames = [
        "Código",
        "Nombre",
        "Apellido",
        "Cargo",
        "Fecha de Creación",
        "Rol"
    ]

    return (
        <Container>
            {hasError &&
                <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    Algo ha salido mal, intenta de nuevo
                </Alert>
            }
            <Grid container spacing={2}>
                <Grid item xs={12} md={12} />
                <Grid item xs={0} md={0}>
                    <StyledButton variant='contained' color='primary' onClick={handleOpen}>
                        Crear Usuario
                    </StyledButton>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                    >
                        <StyledBox>
                            <IconButton
                                aria-label="close"
                                onClick={handleClose}
                                sx={{
                                    position: 'absolute',
                                    right: 8,
                                    top: 8,
                                    color: (theme) => theme.palette.grey[500],
                                }}
                            >
                                <CloseIcon />
                            </IconButton>
                            <Typography id='modal-title' variant='h6' component='h2'>
                                Crear Nuevo Usuario
                            </Typography>
                            <Divider />
                            <ValidatorForm
                                onSubmit={handleSubmit}
                                onError={handleError}
                                validationSchema={validationSchema}
                            >
                                <Grid container spacing={2}>
                                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                                        <TextField
                                            type="text"
                                            name="code"
                                            id="standard-basic"
                                            value={user.code || ''}
                                            onChange={handleChange}
                                            errorMessages={['Este Campo es requerido']}
                                            label="Codigo de usuario"
                                            validators={['required', 'minStringLength: 4', 'maxStringLength: 10']}
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

                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Cargo</InputLabel>
                                            <Select
                                                type="text"
                                                name="position"
                                                id="standart basic"
                                                value={user.position || ''}
                                                label="Rol"
                                                onChange={handleChange}
                                            >
                                                {Object.entries(POSITIONS).map(([key, value]) => (
                                                    <MenuItem key={value} value={key}>
                                                        {value}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
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
                                                {Object.entries(ROLES).map(([key, value]) => (
                                                    <MenuItem key={value} value={value}>
                                                        {key}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </ValidatorForm>
                            <Grid item sx={{ display: 'flex', justifyContent: 'flex-end ' }}>
                                <StyledButton variant='contained' color='primary' onClick={handleSubmit}>
                                    <Icon>person_add</Icon>
                                    <Span sx={{ pl: 1 }}>Crear</Span>
                                </StyledButton>
                                <StyledButton variant='contained' color='error' onClick={handleClose}>
                                    Cancelar
                                </StyledButton>
                            </Grid>
                        </StyledBox>
                    </Modal>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <PaginatedTable props={
                    {
                        title: 'Usurios Activos',
                        columnNames: columnNames,
                        items: users,
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
            </Grid>
        </Container >
    )
}

export default Users