import { useState, useEffect } from 'react';
import {
    Grid,
    Box,
    Button,
    styled,
    Select,
    Alert,
    AlertTitle,
    Icon,
    MenuItem,
    Modal,
    InputLabel,
    Typography,
    Divider
} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import PaginatedTable from 'app/components/PaginatedTable';
import { Span } from "app/components/Typography";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { getFunction, deleteFunction, createFunction } from "../../../utils/rest_connector"
import { API_URL, ROLES } from "../../../../constants"
import { handleDelete, handleGetInfo } from 'app/utils/utils';

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

const TextField = styled(TextValidator)(() => ({
    width: "100%",
    marginBottom: "16px",
}));

const SelectStyled = styled(Select)(() => ({
    width: "100%",
    marginBottom: "16px",
}));

const StyledBox = styled(Box)(({ theme }) => ({
    margin: theme.spacing(1),
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: 'white',
    padding: theme.spacing(2),
    boxShadow: theme.shadows[5],
    borderRadius: '5px',
}));


const SERVICE = process.env.REACT_APP_STORES_SERVICE || 'stores'
const USERS_SERVICE = process.env.REACT_APP_USERS_SERVICE || 'users'
const CITIES_SERVICE = process.env.REACT_APP_CITIES_SERVICE || 'cities'

function Stores() {

    const [stores, setStores] = useState([]);
    const [store, setStore] = useState({});
    const [managers, setManagers] = useState([])
    const [cities, setCities] = useState([])
    const [hasError, setError] = useState(false);
    const [refresh, setRefresh] = useState(false)
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const transformData = (data) => {
        const transformed_data = data.map((item) => {
            const manager_name = `${item.manager?.first_name} ${item.manager?.last_name}`
            return {
                code: item.code,
                name: item.name,
                city: item.city.name,
                manager: manager_name || 'No asignado',
            }
        })
        return transformed_data
    }

    const managerObject = (data) => {
        const transformed_data = data.map((item) => {
            return {
                code: item.code,
                email: item.email,
                name: `${item.first_name} ${item.last_name}`,
                groups: item.groups
            }
        })
        return transformed_data
    }

    const cityObject = (data) => {
        const transformed_data = data.map((item) => {
            return {
                code: item.code,
                name: item.name,
                state: item.state
            }
        })
        return transformed_data
    }

    useEffect(() => {
        setRefresh(false)
        handleGetInfo(getFunction, API_URL, SERVICE, transformData, setStores, setError)
        const getManagers = async () => {
            const data = await getFunction(API_URL, USERS_SERVICE)
            const transformed_data = managerObject(data)
            const users = transformed_data.filter(
                item => item.groups.includes(ROLES.Admin) || item.groups.includes(ROLES.Manager)
            )
            setManagers(users)
        }
        const getCities = async () => {
            const data = await getFunction(API_URL, CITIES_SERVICE)
            const transformed_data = cityObject(data)
            setCities(transformed_data)
        }
        getManagers()
        getCities()
    }, [refresh])

    const performDelete = async (item) => {
        handleDelete(deleteFunction, API_URL, SERVICE, item.code, setRefresh, setError)
    }

    const handleChange = (event) => {
        event.preventDefault()
        const { name, value } = event.target
        setStore((prevRegion) => {
            const updatedRegion = { ...prevRegion, [name]: value }
            if (name === 'manager') {
                const selectedManager = managers.find(item => item.email === value)
                updatedRegion.manager = selectedManager || null
            }
            if (name === 'city') {
                const selectedCity = cities.find(item => item.name === value)
                updatedRegion.city = selectedCity || null
            }
            return updatedRegion
        })
    };


    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const data = {
                code: store.code,
                name: store.name,
                manager: store.manager.code,
                city: store.city.code
            }
            await createFunction(API_URL, SERVICE, data)
            setRefresh(true)
            setStore({})
            handleClose()
        } catch (error) {
            console.log(error)
            setError(true)
            handleClose()
        }
    }
    const handleError = (event) => {
        console.log(event)
        setError(true)
    }

    const columnNames = [
        "Codigo",
        "Nombre",
        "Ciudad",
        "Manager"
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
                <Grid item xs={12} md={12}>
                </Grid>
                <Grid item xs={0} md={0}>
                    <StyledButton variant="contained" color="primary" onClick={handleOpen}>
                        Crear Tienda
                    </StyledButton>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <StyledBox sx={{ minWidth: 120 }}>
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
                            <Typography id="modal-modal-title" variant="h6" component="h2" align="center">
                                Agregar Nueva Tienda
                            </Typography>
                            <Divider />
                            <ValidatorForm onSubmit={handleSubmit} onError={handleError}>
                                <Grid container spacing={1}>
                                    <Grid item lg={10} md={9} sm={11} xs={12} sx={{ mt: 3 }}>
                                        <TextField
                                            type="text"
                                            name="code"
                                            id="standard-basic"
                                            value={store.code || ""}
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
                                            value={store.name || ""}
                                            validators={["required"]}
                                            errorMessages={["Este Campo es requerido"]}
                                        />

                                        <InputLabel id='lbl-city' sx={{ mb: 1 }}>Ciudad</InputLabel>
                                        <SelectStyled
                                            id="city"
                                            name="city"
                                            label="Ciudad"
                                            value={store.city?.name || ""}
                                            onChange={handleChange}
                                        >
                                            {
                                                cities.map((city) => {
                                                    return <MenuItem value={city.name}>{city.name}</MenuItem>
                                                })
                                            }
                                        </SelectStyled>

                                        <InputLabel id='lbl-manager' sx={{ mb: 1 }}>Manager</InputLabel>
                                        <SelectStyled
                                            id="manager"
                                            name="manager"
                                            label="lbl-manager"
                                            value={store.manager?.email || ""}
                                            onChange={handleChange}
                                        >
                                            {
                                                managers.map((manager) => {
                                                    return <MenuItem value={manager.email}>
                                                        {manager.name}
                                                    </MenuItem>
                                                })
                                            }
                                        </SelectStyled>
                                    </Grid>
                                </Grid>

                                <Button color="primary" variant="contained" onClick={handleSubmit}>
                                    <Icon>send</Icon>
                                    <Span sx={{ pl: 1, textTransform: "capitalize" }}>Crear</Span>
                                </Button>
                                <StyledButton
                                    variant="contained"
                                    color="error"
                                    onClick={handleClose}
                                    sx={{ ml: 2 }}
                                >
                                    Cancelar
                                </StyledButton>
                            </ValidatorForm>
                        </StyledBox>
                    </Modal>
                </Grid>
                <PaginatedTable props={
                    {
                        title: 'Tiendas',
                        columnNames,
                        items: stores,
                        actions: [
                            {
                                icon: "delete",
                                color: "error",
                                click: performDelete
                            },
                        ]
                    }
                }
                />
            </Grid>
        </Container>
    );
}

export default Stores;