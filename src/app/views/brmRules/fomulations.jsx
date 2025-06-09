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
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import PaginatedTable from "@/app/components/PaginatedTable";
import { getFunction, deleteFunction } from '@/app/utils/rest_connector'
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

const SERVICE = import.meta.env.VITE_FORMULA_SERVICE || 'rules'
const RULES_SERVICES = import.meta.env.VITE_RULES_SERVICE || 'rules'


function ListFormulas() {

    const [formulas, setFormulas] = useState([]);
    const [formula, setFormula] = useState({});
    const [rules, setRules] = useState([{}]);
    const [hasError, setError] = useState(false);
    const [refresh, setRefresh] = useState(false)
    const [open, setOpen] = useState(false)
    const [update, setUpdate] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => {
        setOpen(false)
        setUpdate(false)
        setFormula({})
    }

    const formulaObject = (data) => {
        const transformedData = data.map((item) => {
            return {
                code: item.id,
                name: item.name,
                rule: item.rule,
                percentage: item.percentage,
                formula: item.formula,
                createdAt: item.created_at
            }
        })
        return transformedData
    }

    const ruleObject = (data) => {
        const transformedData = data.map((item) => {
            return {
                code: item.id,
                name: item.name,
                rule: item.rule,
                hasFormula: item.has_formula,
                percentages: item.percentages,
                isActive: item.is_active,
            }
        })
        return transformedData
    }

    useEffect(() => {
        setRefresh(false)
        const fetchData = async () => {
            setError(false)
            await handleGetInfo(
                getFunction, API_URL, SERVICE, formulaObject, setFormulas, setError
            )
            await handleGetInfo(
                getFunction, API_URL, RULES_SERVICES, ruleObject, setRules, setError
            )
        }
        fetchData()
    }, [refresh])



    const performDelete = async (item) => {
        handleDelete(deleteFunction, API_URL, SERVICE, item.code, setError)
        setRefresh(true)
    }

    const performUpdate = (item) => {
        setFormula(item)
        setUpdate(true)
        handleOpen()
    }

    const columnNames = [
        { label: "Código", accessor: "code" },
        { label: "Nombre Regla", accessor: "name" },
        { label: "Regla", accessor: "rule", hidden: true },
        { label: "Tiene formula", accessor: "hasFormula", hidden: true },
        { label: "Porcentaje", accessor: "percentage" },
        { label: "Fecha de creación", accessor: "createdAt" },
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
                        <CreateFormulas
                            url={API_URL}
                            service={SERVICE}
                            rules={rules}
                            formula={formula}
                            update={update}
                            setRefresh={setRefresh}
                            handleClose={handleClose}
                        />
                        <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <StyledButton
                                variant="contained"
                                color="error"
                                onClick={handleClose}
                                sx={{ ml: 2 }}
                            >
                                Cancelar
                            </StyledButton>
                        </Box>
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
        </Container>
    )
}

export default ListFormulas