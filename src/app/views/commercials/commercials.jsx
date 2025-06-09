import { useState, useEffect } from "react";
import {
    Grid,
    styled,
    Alert,
    AlertTitle,
    Typography,
    FormControl,
    Divider,
    Select,
    Modal,
    MenuItem,
    Box,
    Button,
    TextField,
    InputLabel,
    IconButton
} from "@mui/material";
import PaginatedTable from "@/app/components/PaginatedTable";
import CloseIcon from '@mui/icons-material/Close';
import { getFunction, deleteFunction, createFunction, updateFunction } from "../../utils/rest_connector"
import { handleGetInfo, handleDelete } from "../../utils/utils"
import { API_URL, GOALS_TYPES, ROLES } from "../../../constants"
import { ValidatorForm } from "react-material-ui-form-validator";
import VoucherTable from "../../components/Voucher";


const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
        marginBottom: "30px",
        [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
}));

const ModalStyled = styled(Modal)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
}));

const PaperStyled = styled('div')(({ theme }) => ({
    position: 'absolute',
    width: '50%',
    backgroundColor: 'white',
    border: 'none',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '0',
    bottom: '0',
    right: '0',
    height: '100%',
    overflow: 'auto',
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


const StyledButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(1),
}));

const SERVICE = import.meta.env.VITE_COMERCIALS_SERVICE || 'comercials'
const USER_SERVICE = import.meta.env.VITE_USERS_SERVICE || 'users'
const COMMISSION_SERVICE = import.meta.env.VITE_USER_COMMISSIONS_SERVICE || 'commissions'


function Commercials() {

    const [commercials, setCommercials] = useState([]);
    const [commercial, setCommercial] = useState({});
    const [users, setUsers] = useState([]);
    const [isVoucherOpen, setVoucherOpen] = useState(false);
    const [commissions, setCommissionData] = useState({})
    const [managers, setManagers] = useState([]);
    const [hasError, setError] = useState(false);
    const [refresh, setRefresh] = useState(false)
    const [open, setOpen] = useState(false);
    const [update, setUpdate] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        setUpdate(false)
        setCommercial({})
    };

    const handleOpenVoucher = async (item) => {
        const commissionData = await handleCommissionClick(item);
        setCommissionData(commissionData);
        setVoucherOpen(true);
    };

    const handleCloseVoucher = () => {
        setVoucherOpen(false);
    };

    const transformObject = (data) => {
        const transformed_data = data.map((item) => {
            return {
                code: item.user.code,
                name: `${item.user.first_name} ${item.user.last_name}`,
                email: item.user.email,
                manager: item.manager.email,
                goal_type: (() => Object.keys(GOALS_TYPES).find(key => GOALS_TYPES[key] === item.goal_type))(),
                goal: Number(item.goal).toLocaleString(),
            }
        })
        return transformed_data
    }

    useEffect(() => {
        setError(false)
        setRefresh(false)
        handleGetInfo(
            getFunction, API_URL, SERVICE, transformObject, setCommercials, setError
        )
        const getUsers = async () => {
            try {
                const data = await getFunction(API_URL, USER_SERVICE);
                setManagers(data.filter(
                    item => item.groups.includes(ROLES.Admin) || item.groups.includes('manager')
                ))
                setUsers(data.filter(
                    item => item.groups.includes(ROLES.Colaborador)
                ));
            } catch (error) {
                console.log(error);
            }
        }
        getUsers();
        console.log(commercials)
    }, [refresh])

    const handleChange = (event) => {
        event.preventDefault()
        setCommercial({ ...commercial, [event.target.name]: event.target.value });
    }

    const performDelete = async (item) => {
        handleDelete(deleteFunction, API_URL, SERVICE, item.email, setError)
        setRefresh(prev => prev + 1)
    }

    const handleError = (event) => {
        console.log(event);
        setError(true);
        setCommercial({})
    };

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const data = {
                user_email: commercial.user,
                manager_email: commercial.manager,
                goal: commercial.goal,
                goal_type: commercial.goal_type
            }
            if (update) {
                await updateFunction(API_URL, SERVICE, commercial.user, data)
            } else {
                await createFunction(API_URL, SERVICE, data)
            }
            setRefresh(true)
            setOpen(false)
            setUpdate(false)
            setCommercial({})
        } catch (error) {
            console.log(error);
            setError(true);
        }
    };

    const handleCommissionClick = async (item) => {
        const token = localStorage.getItem('accessToken');
        let path = COMMISSION_SERVICE.split('/');
        path.splice(2, 0, item.code);
        let UPDATED_COMMISSIONS_SERVICE = path.join('/');
        try {
            const response = await fetch(`${API_URL}/${UPDATED_COMMISSIONS_SERVICE}/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 404) {
                setError(true);
                return null;
            }

            const commissionData = await response.json();
            return commissionData;
        } catch (error) {
            setError(true);
            return null;
        }
    };

    const performUpdate = (item) => {
        let commercialToEdit = { ...item }
        commercialToEdit.goal = item.goal.replace(/,/g, '').replace(/\./g, '')
        commercialToEdit.user = commercialToEdit.email
        commercialToEdit.goal_type = GOALS_TYPES[commercialToEdit.goal_type]
        setCommercial(commercialToEdit)
        setUpdate(true)
        handleOpen()
    }

    const columnNames = [
        { label: "Código", accessor: "code" },
        { label: "Nombre", accessor: "name" },
        { label: "Email", accessor: "email" },
        { label: "Manager", accessor: "manager" },
        { label: "Meta", accessor: "goal_type" },
        { label: "Meta actual", accessor: "goal" }
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
                <Grid item xs={12} />
                <Grid item xs={0}>
                    <StyledButton variant='contained' color='primary' onClick={handleOpen}>
                        Crear Comercial
                    </StyledButton>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <StyledBox sx={{ minWidth: 150 }}>
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
                            <Typography variant='h6' component='h2'>
                                {update ?
                                    'Actualizar Comercial' :
                                    'Crear Comercial'
                                }
                            </Typography>
                            <Divider />
                            <ValidatorForm onSubmit={handleSubmit} onError={handleError}>
                                <Grid container spacing={2}>
                                    <Grid item lg={10} md={9} sm={11} xs={12} sx={{ mt: 3 }}>
                                        <FormControl fullWidth>
                                            <InputLabel id='lbl-code' sx={{ mb: 1 }}>Usuario</InputLabel>
                                            <Select
                                                type="text"
                                                name="user"
                                                id="standard-basic"
                                                value={commercial.user || ""}
                                                onChange={handleChange}
                                                errorMessages={["Este Campo es requerido"]}
                                                label="Seleccionar Usuario"
                                                disabled={update}
                                            >
                                                {users.map((user) => (
                                                    <MenuItem key={user.code} value={user.email}>
                                                        {user.email}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>

                                    <Grid item lg={10} md={9} sm={11} xs={12}>
                                        <FormControl fullWidth>
                                            <InputLabel id='manager' sx={{ mb: 1 }}>Seleccionar Manager</InputLabel>
                                            <Select
                                                type="text"
                                                name="manager"
                                                id="standard-basic"
                                                value={commercial.manager || ""}
                                                onChange={handleChange}
                                                errorMessages={["Este Campo es requerido"]}
                                                label="Seleccionar Usuario"
                                            >
                                                {managers.map((user) => (
                                                    <MenuItem key={user.code} value={user.email}>
                                                        {user.email}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>

                                    <Grid item lg={10} md={9} sm={11} xs={12}>
                                        <TextField
                                            fullWidth
                                            type="number"
                                            name="goal"
                                            value={commercial.goal || ''}
                                            label="Establecer Meta"
                                            onChange={handleChange}
                                            validators={['required']}
                                            errorMessages={['Este Campo es requerido']}
                                        />
                                    </Grid>
                                    <Grid item lg={10} md={9} sm={11} xs={12}>
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
                                                {Object.entries(GOALS_TYPES).map(([key, value]) => (
                                                    <MenuItem key={key} value={value}>
                                                        {key}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </ValidatorForm>
                            <Grid item sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                                <StyledButton variant='contained' color='primary' onClick={handleSubmit}>
                                    {update ? 'Actualizar' : 'Crear'}
                                </StyledButton>
                                <StyledButton variant='contained' color='error' onClick={handleClose}>
                                    Cancelar
                                </StyledButton>
                            </Grid>
                        </StyledBox>
                    </Modal>
                </Grid>
                <PaginatedTable props={
                    {
                        title: 'Comerciales',
                        columnNames: columnNames,
                        items: commercials,
                        actions: [
                            {
                                icon: "receipt",
                                color: "primary",
                                click: handleOpenVoucher
                            },
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
            <ModalStyled
                open={isVoucherOpen}
                onClose={handleCloseVoucher}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <PaperStyled>
                    <VoucherTable commissionData={commissions} />
                    <Box display="flex" justifyContent="flex-end">
                        <Button
                            variant='contained'
                            color='error'
                            onClick={handleCloseVoucher}
                            style={{ marginLeft: '10px' }}
                        >
                            Close
                        </Button>
                    </Box>
                </PaperStyled>
            </ModalStyled>
        </Container>
    )
}

export default Commercials