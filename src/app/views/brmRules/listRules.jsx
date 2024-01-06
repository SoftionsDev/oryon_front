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
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import PaginatedTable from "app/components/PaginatedTable";
import { getFunction, createFunction, deleteFunction } from 'app/utils/rest_connector'
import { handleGetInfo, handleDelete } from "../../utils/utils"
import { API_URL } from "../../../constants"


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


const SERVICE = process.env.REACT_APP_RULES_SERVICE || 'rules'


function ListRules() {

    const [listRules, setListRules] = useState([]);
    const [listRule, setComercial] = useState({});
    const [hasError, setError] = useState(false);
    const [refresh, setRefresh] = useState(false)
    const [open, setOpen] = useState(false)
    const handleClose = () => setOpen(false)

    const transformObject = (data) => {
        const transformed_data = data.map((item) => {
            return {
                code: item.code,
                table1: item.table1,
                campo1: item.campo1,
                operatorComp1: item.operatorComp1,
                valuenumber1: item.valuenumber1,
                andor1: item.andor1,
                campo2: item.campo2,
                operator2: item.operator2,
                valuenumber2: item.valuenumber2,
                valuenumber3: item.valuenumber3,
                table2: item.table2,
                valueSale2: item.valueSale2,
                valuenumber4: item.valuenumber4,
                operator3: item.operator3,
                campo3: item.campo3
            }
        })
        return transformed_data
    }

    useEffect(() => {
        setError(false)
        handleGetInfo(
            getFunction, API_URL, SERVICE, transformObject, setListRules, setError
        )
    }, [refresh])

    const performDelete = async (item) => {
        handleDelete(deleteFunction, API_URL, SERVICE, item.code, setRefresh, setError)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            await createFunction(API_URL, SERVICE, listRule)
            setRefresh(true)
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
        setComercial((prevRegion) => {
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

    const managers = [
        {
            code: "0001",
            email: 'manager1@email.com'
        },
        {
            code: "0002",
            email: 'manager2@email.com'
        },
    ]

    const columnNames = [
        "Codigo de usuario",
        "Email",
        "Colaborador",
        "Manager",
        "Tineda asignada",
        "Tipo de meta",
        "Meta actual",
        "asdas",
        "asdasDF",
        "ahfdAS",
        "afhsdf",
        "sdjfhsadf",
        "sipoufiosua",
        "isahdfiosd",
        "asidhfjiosadf"
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

                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <StyledBox sx={{ minWidth: 120 }}>
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
                                            value={listRule.code || ""}
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
                                            value={listRule.name || ""}
                                            validators={["required"]}
                                            errorMessages={["Este Campo es requerido"]}
                                        />

                                        <InputLabel id='lbl-manager' sx={{ mb: 1 }}>Manager</InputLabel>
                                        <SelectStyled
                                            id="manager"
                                            name="manager"
                                            label="example@email.com"
                                            value={listRule.manager?.email || ""}
                                            onChange={handleChange}
                                        >
                                            {
                                                managers.map((item, index) => (
                                                    <MenuItem key={index} value={item.email}>{item.email}</MenuItem>
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
                            </ValidatorForm>
                        </StyledBox>
                    </Modal>
                </Grid>
                <PaginatedTable props={
                    {
                        columnNames: columnNames,
                        items: listRules,
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

export default ListRules