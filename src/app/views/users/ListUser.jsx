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
import { getFunction, deleteFunction, createFunction, updateFunction } from "../../utils/rest_connector"
import { handleGetInfo, handleDelete } from "../../utils/utils"
import { API_URL, ROLES, POSITIONS } from "../../../constants"
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import useAuth from "app/hooks/useAuth";


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
    const auth = useAuth()
    const [hasError, setError] = useState(false);
    const [refresh, setRefresh] = useState(false)
    const [update, setUpdate] = useState(false)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        setUpdate(false)
    };

    const transformObject = (data) => {
        const transformedData = data.map((item) => {
            return {
                code: item.code,
                firstName: item.first_name,
                lastName: item.last_name,
                email: item.email,
                position: POSITIONS[item.position],
                date: (() => {
                    const date = new Date(item.date_joined);
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const day = String(date.getDate()).padStart(2, '0');
                    return `${date.getFullYear()}-${month}-${day}`;
                })(),
                roleName: item.groups.map((group) => Object.keys(ROLES).find(key => ROLES[key] === group)),
            }
        })
        return transformedData
    }

    useEffect(() => {
        console.log(auth)
        setError(false)
        setRefresh(false)
        handleGetInfo(
            getFunction, API_URL, SERVICE, transformObject, setUsers, setError
        )
    }, [refresh])


    const handleChange = (event) => {
        event.preventDefault()
        console.log(user)
        setUser({ ...user, [event.target.name]: event.target.value });
    }

    const handleSubmit = async (event) => {
        try {
            const data = {
                code: user.code,
                email: user.email,
                first_name: user.firstName,
                last_name: user.lastName,
                password: user.password,
                position: user.position,
                groups: [user.roleName],
                user_permissions: []
            }
            if (update) {
                await updateFunction(API_URL, SERVICE, user.code, data)
                setUpdate(false)
            } else {
                await createFunction(API_URL, SERVICE, data)
            }
            setRefresh(true)
            setUser({})
            handleClose()
        } catch (error) {
            console.log(error)
            setError(true)
            handleClose()
        }
    }

    const handleError = (event) => {
        console.log(event)
    }

    const performDelete = async (item) => {
        handleDelete(deleteFunction, API_URL, SERVICE, item.code, setRefresh, setError)
    }

    const performUpdate = async (item) => {
        let userToEdit = { ...item }
        userToEdit.roleName = ROLES[item.roleName]
        userToEdit.position = Object.keys(POSITIONS).find(key => POSITIONS[key] === item.position)
        setUser(userToEdit)
        setUpdate(true)
        handleOpen()
    }

    const columnNames = [
        { label: "Código", accessor: 'code' },
        { label: "Nombre", accessor: 'firstName' },
        { label: "Email", accessor: 'email', hidden: true },
        { label: "Apellido", accessor: 'lastName' },
        { label: "Cargo", accessor: 'position' },
        { label: "Fecha de Creación", accessor: 'date' },
        { label: "Rol", accessor: 'roleName' }
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
                                {update ?
                                    "Actualizar Usuario"
                                    :
                                    "Crear Nuevo Usuario"
                                }
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
                                            disabled={update}
                                        />

                                        <TextField
                                            type="text"
                                            name="firstName"
                                            label="Nombre"
                                            onChange={handleChange}
                                            value={user.firstName || ''}
                                            validators={['required']}
                                            errorMessages={['Este Campo es requerido']}
                                        />

                                        <TextField
                                            type="text"
                                            name="lastName"
                                            label="Apellidos"
                                            value={user.lastName || ''}
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
                                            disabled={update}
                                        />

                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Rol</InputLabel>
                                            <Select
                                                type="text"
                                                name="roleName"
                                                id="standart basic"
                                                value={user.roleName || ''}
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
                                {
                                    !update ?
                                        <StyledButton variant='contained' color='primary' onClick={handleSubmit}>
                                            <Icon>person_add</Icon>
                                            <Span sx={{ pl: 1 }}>Crear</Span>
                                        </StyledButton>
                                        :
                                        <StyledButton variant='contained' color='primary' onClick={handleSubmit}>
                                            <Icon>edit</Icon>
                                            <Span sx={{ pl: 1 }}>Actualizar</Span>
                                        </StyledButton>
                                }
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
                        title: 'Usuarios Activos',
                        columnNames: columnNames,
                        items: users,
                        actions: [
                            {
                                icon: "edit",
                                color: "primary",
                                click: performUpdate
                            },
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