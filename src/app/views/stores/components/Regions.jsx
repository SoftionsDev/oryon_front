import { useState, useEffect } from "react";
import {
    Grid,
    Box,
    Button,
    styled,
    Select,
    Alert,
    AlertTitle,
    MenuItem,
    Modal,
    InputLabel,
    Typography,
    Divider
} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import PaginatedTable from "app/components/PaginatedTable";
import { getFunction, createFunction, deleteFunction } from "../../../utils/rest_connector"
import { handleGetInfo, handleDelete } from "../../../utils/utils"
import { API_URL, ROLES } from "../../../../constants"


const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
        marginBottom: "30px",
        [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
}));

const TextField = styled(TextValidator)(() => ({
    width: "100%",
    marginBottom: "16px",
}));

const SelectStyled = styled(Select)(() => ({
    width: "100%",
    marginBottom: "16px",
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
    width: 400,
    backgroundColor: 'white',
    padding: theme.spacing(2),
    boxShadow: theme.shadows[5],
    borderRadius: '5px',
}));


const SERVICE = process.env.REACT_APP_REGIONS_SERVICE || 'regions'
const USERS_SERVICE = process.env.REACT_APP_USERS_SERVICE || 'users'


function Regions() {

    const [regions, setRegions] = useState([]);
    const [region, setRegion] = useState({});
    const [managers, setManagers] = useState([]);
    const [hasError, setError] = useState(false);
    const [refresh, setRefresh] = useState(false)
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const transformObject = (data) => {
        const transformed_data = data.map((item) => {
            const manager_name = `${item.manager?.first_name} ${item.manager?.last_name}`
            return {
                code: item.code,
                name: item.name,
                manager: manager_name || 'No asignado',
            }
        })
        return transformed_data
    }

    const managerObject = (data) => {
        const transformed_data = data.map((item) => {
            return {
                code: item.code,
                name: `${item.first_name} ${item.last_name}`,
                email: item.email,
                groups: item.groups
            }
        })
        return transformed_data
    }

    useEffect(() => {
        setError(false)
        setRefresh(false)
        handleGetInfo(getFunction, API_URL, SERVICE, transformObject, setRegions, setError)
        const getManagers = async () => {
            const data = await getFunction(API_URL, USERS_SERVICE)
            const users = managerObject(data)
            setManagers(() => users.filter(
                item => item.groups.includes(ROLES.Manager) || item.groups.includes(ROLES.Admin))
            )
        }
        getManagers()
    }, [refresh])

    const performDelete = async (item) => {
        handleDelete(deleteFunction, API_URL, SERVICE, item.code, setRefresh, setError)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const data = {
                code: region.code,
                name: region.name,
                manager: region.manager.code
            }
            await createFunction(API_URL, SERVICE, data)
            setRefresh(true)
            setRegion({})
            handleClose()
        } catch (error) {
            console.log(error)
            setError(true)
            handleClose()
        }
    }

    const handleChange = (event) => {
        event.preventDefault()
        const { name, value } = event.target
        setRegion((prevRegion) => {
            const updatedRegion = { ...prevRegion, [name]: value }
            if (name === 'manager') {
                const selectedManager = managers.find(item => item.email === value)
                updatedRegion.manager = selectedManager || null
            }
            return updatedRegion
        })
    }

    const handleError = (event) => {
        console.log(event)
        setError(true)
    }

    const columnNames = [
        "Codigo",
        "Nombre",
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
                <Grid item xs={12} md={12} />
                <Grid item xs={0} md={0}>
                    <StyledButton variant="contained" color="primary" onClick={handleOpen}>
                        Crear Region
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
                                Agregar Nueva Region
                            </Typography>
                            <Divider />
                            <ValidatorForm onSubmit={handleSubmit} onError={handleError}>
                                <Grid container spacing={1}>
                                    <Grid item lg={10} md={9} sm={11} xs={12} sx={{ mt: 3 }}>
                                        <InputLabel id='lbl-code' sx={{ mb: 1 }}>Código</InputLabel>
                                        <TextField
                                            type="text"
                                            name="code"
                                            id="standard-basic"
                                            value={region.code || ""}
                                            onChange={handleChange}
                                            errorMessages={["Este Campo es requerido"]}
                                            label="Codigo de region"
                                            validators={["required", "minStringLength: 4", "maxStringLength: 9"]}
                                        />

                                        <InputLabel id='lbl-name' sx={{ mb: 1 }}>Nombre</InputLabel>
                                        <TextField
                                            type="text"
                                            name="name"
                                            label="Nombre de la Region"
                                            onChange={handleChange}
                                            value={region.name || ""}
                                            validators={["required"]}
                                            errorMessages={["Este Campo es requerido"]}
                                        />

                                        <InputLabel id='lbl-manager' sx={{ mb: 1 }}>Manager</InputLabel>
                                        <SelectStyled
                                            id="manager"
                                            name="manager"
                                            label="example@email.com"
                                            value={region.manager?.email || ""}
                                            onChange={handleChange}
                                        >
                                            {
                                                managers.map((item, index) => (
                                                    <MenuItem key={index} value={item.email}>
                                                        {item.name}
                                                    </MenuItem>
                                                ))
                                            }
                                        </SelectStyled>
                                    </Grid>
                                </Grid>
                                <StyledButton
                                    variant="contained" color="primary" onClick={handleSubmit}
                                >
                                    Agregar
                                </StyledButton>
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
                        title: 'Regiones',
                        columnNames: columnNames,
                        items: regions,
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
        </Container>
    )
}

export default Regions