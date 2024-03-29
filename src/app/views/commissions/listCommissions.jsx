import { useState, useEffect } from "react";
import {
    Grid,
    Button,
    styled,
    Alert,
    AlertTitle,
    Icon,
} from "@mui/material";
import { Span } from 'app/components/Typography';
import { createFunction, getFunction } from 'app/utils/rest_connector'
import { handleGetInfo } from "../../utils/utils"
import { API_URL } from "../../../constants"
import PaginatedTable from "app/components/PaginatedTable";


const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        margin: "16px"
    },
    "& .breadcrumb": {
        marginBottom: "30px",
        [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
}));

const SERVICE = process.env.REACT_APP_COMMISSIONS_SERVICE || 'commissions'


function ListRules() {

    const [commission, setCommission] = useState([]);
    const [hasError, setError] = useState(false);
    const [refresh, setRefresh] = useState(false)
    const [noCommission, setNoCommission] = useState(false)

    const transformObject = (data) => {
        const transformed_data = data.map((item) => {
            return {
                sale: item.sale,
                amount: item.amount,
                rule: item.rule,
                user: item.user
            }
        })
        return transformed_data
    }

    useEffect(() => {
        setRefresh(false)
        handleGetInfo(getFunction, API_URL, SERVICE, transformObject, setCommission, setError)
    }, [refresh])

    const getCommissions = async () => {
        setNoCommission(false)
        try {
            const response = await createFunction(API_URL, `${SERVICE}/generate`, {})
            if (response.commissions.length === 0) {
                setNoCommission(true)
            }
            setRefresh(true)
        } catch (error) {
            console.log(error)
            setError(true)
        }
    }

    const columnNames = [
        "Venta",
        "Valor",
        "Regla",
        "Usuario"
    ]

    return (
        <Container>
            <div>
                {hasError &&
                    <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        Algo ha salido mal, intenta de nuevo
                    </Alert>
                }
                {noCommission &&
                    <Alert severity="warning">
                        No hay comisiones para ejecutar
                    </Alert>
                }
                <Grid container spacing={2}>
                    <Grid item xs={12} md={12} />
                    <Grid item xs={0} md={0}>
                        <Button color="primary" variant="contained" onClick={getCommissions}>
                            <Icon>local_mall</Icon>
                            <Span sx={{ pl: 1, textTransform: 'capitalize' }}>Ejecutar Comisiones</Span>
                        </Button>
                        <p></p>
                        <PaginatedTable props={
                            {
                                title: 'Comisiones',
                                columnNames: columnNames,
                                items: commission,
                                actions: []
                            }
                        }
                        />
                    </Grid>
                </Grid>
            </div>
        </Container>
    )
}

export default ListRules