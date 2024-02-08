import { useState, useEffect } from "react";
import {
    Grid,
    styled,
    Alert,
    AlertTitle,
    Button,
    Modal,
    Box
} from "@mui/material";
import PaginatedTable from "app/components/PaginatedTable";
import { getFunction, deleteFunction } from 'app/utils/rest_connector'
import { handleGetInfo, handleDelete } from "../../utils/utils"
import { API_URL } from "../../../constants"
import CreateFormulas from '../../components/FormulaCreator';


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
    width: 'calc(100% - 200px)',
    backgroundColor: 'white',
    padding: theme.spacing(2),
    boxShadow: theme.shadows[5],
    borderRadius: '5px',
}));

const SERVICE = process.env.REACT_APP_FORMULA_SERVICE || 'rules'
const RULES_SERVICES = process.env.REACT_APP_RULES_SERVICE || 'rules'


function ListFormulas() {

    const [formulas, setFormulas] = useState([]);
    const [rules, setRules] = useState([]);
    const [hasError, setError] = useState(false);
    const [refresh, setRefresh] = useState(false)
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)


    const formulaObject = (data) => {
        const transformed_data = data.map((item) => {
            return {
                code: item.id,
                name: item.name,
                percentage: item.percentage,
                created_at: item.created_at,
            }
        })
        return transformed_data
    }

    const ruleObject = (data) => {
        const transformedData = data.map((item) => {
            return {
                code: item.id,
                name: item.name,
                rule: item.rule,
                has_formula: item.has_formula,
                percentages: {
                    manager: item.manager,
                    director: item.director,
                    commercial: item.commercial,
                    assistant: item.assistant
                }
            }
        })
        return transformedData
    }

    useEffect(() => {
        setError(false)
        setRefresh(false)
        handleGetInfo(
            getFunction, API_URL, SERVICE, formulaObject, setFormulas, setError
        )
        handleGetInfo
            (getFunction, API_URL, RULES_SERVICES, ruleObject, setRules, setError)
    }, [refresh])

    const performDelete = async (item) => {
        handleDelete(deleteFunction, API_URL, SERVICE, item.code, setRefresh, setError)
    }

    const columnNames = [
        "Codigo",
        "Nombre Regla",
        "Porcentaje",
        "Fecha de creacion",
    ]

    return (
        <Container >
            {hasError &&
                <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    Algo ha salido mal, intenta de nuevo
                </Alert>
            }
            <Grid item xs={0} md={0}>
                <StyledButton variant="contained" color="primary" onClick={handleOpen}>
                    Nueva Formulacion
                </StyledButton>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <StyledBox>
                        <CreateFormulas
                            url={API_URL}
                            service={SERVICE}
                            rules={rules}
                            setRefresh={setRefresh}
                            handleClose={handleClose}
                        />
                    </StyledBox>
                </Modal>
            </Grid >
            <Grid container spacing={2}>
                <PaginatedTable props={
                    {
                        title: "Formulaciones",
                        columnNames: columnNames,
                        items: formulas,
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

export default ListFormulas