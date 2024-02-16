import { useState, useEffect } from "react";
import {
    Grid,
    styled,
    Alert,
    AlertTitle,
    Modal,
    Button,
    Box
} from "@mui/material";
import PaginatedTable from "app/components/PaginatedTable";
import { getFunction, deleteFunction } from "../../../utils/rest_connector"
import { handleGetInfo, handleDelete } from "../../../utils/utils"
import { API_URL, GOALS_TYPES } from "../../../../constants"
import VoucherTable from "../../../components/Voucher";



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

const SERVICE = process.env.REACT_APP_COMERCIALS_SERVICE || 'comercials'
const COMMISSION_SERVICE = process.env.REACT_APP_USER_COMMISSIONS_SERVICE || 'commissions'


function Comercials() {

    const [comercials, setComercials] = useState([]);
    const [hasError, setError] = useState(false);
    const [refresh, setRefresh] = useState(false)
    const [isVoucherOpen, setVoucherOpen] = useState(false);
    const [commissions, setCommissionData] = useState({})

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
                firstName: item.user.first_name,
                last_name: item.user.last_name,
                email: item.user.email,
                manager: item.manager,
                goal_type: (() => Object.keys(GOALS_TYPES).find(key => GOALS_TYPES[key] === item.goal_type))(),
                goal: Number(item.goal).toLocaleString(),
            }
        })
        return transformed_data
    }

    useEffect(() => {
        setError(false)
        handleGetInfo(
            getFunction, API_URL, SERVICE, transformObject, setComercials, setError
        )
    }, [refresh])

    const performDelete = async (item) => {
        handleDelete(deleteFunction, API_URL, SERVICE, item.email, setRefresh, setError)
        setRefresh(false)
    }

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

    const columnNames = [
        "Codigo",
        "Nombre",
        "Apellido",
        "Email",
        "Manager",
        "Tipo de meta",
        "Meta actual"
    ]


    return (
        <Container>
            {hasError &&
                <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    Algo ha salido mal, intenta de nuevo
                </Alert>
            }
            <p></p>
            <Grid container spacing={2}>
                <PaginatedTable props={
                    {
                        title: 'Comerciales',
                        columnNames: columnNames,
                        items: comercials,
                        actions: [
                            {
                                icon: "receipt",
                                color: "primary",
                                click: handleOpenVoucher
                            },
                            {
                                icon: "delete",
                                color: "error",
                                click: performDelete
                            }
                        ]
                    }
                }
                ></PaginatedTable>
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

export default Comercials