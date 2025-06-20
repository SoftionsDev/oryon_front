import { useState, useEffect } from "react";
import {
    Grid,
    Button,
    styled,
    Alert,
    AlertTitle,
    Icon,
} from "@mui/material";
import { Span } from '@/app/components/Typography';
import { createFunction, getFunction } from '@/app/utils/rest_connector'
import { handleGetInfo } from "../../utils/utils"
import { API_URL } from "../../../constants"
import CollapsableTable from "@/app/components/CollapsableTable";


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

const SERVICE = import.meta.env.VITE_COMMISSIONS_SERVICE || 'commissions'


function ListRules() {

    const [commission, setCommission] = useState([]);
    const [hasError, setError] = useState(false);
    const [refresh, setRefresh] = useState(false)
    const [noCommission, setNoCommission] = useState(false)

    const transformObject = (data) => {
        const transformed_data = data.map((item) => {
            return {
                sale: item.sale.id,
                amount: Number(item.amount).toLocaleString(),
                rule: item.rule?.percentage.name,
                userName: `${item.user.first_name} ${item.user.last_name}`,
                userCode: item.user.code,
                product: item.product.name,
                region: item.store.region.name,
                city: item.store.city.name,
                store: item.store.name,
                base: Number(item.sale.price).toLocaleString(),
                percentage: `${item.rule?.formula.percentage || '-'} %`,
                paymentDate: item.payment_date,
                send: item.send ? 'Si' : 'No',
                sendDate: item.send_date
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
        { label: "Código Usuario", accessor: "userCode" },
        { label: "Usuario", accessor: "userName" },
        { label: "Valor", accessor: "amount" },
        { label: "Base Comisión", accessor: "base" },
        { label: "Fecha de Pago", accessor: "paymentDate" },
    ]

    const secondaryColumnsNames = [
        { label: "Producto", accessor: "product" },
        { label: "Regional", accessor: "region" },
        { label: "Ciudad", accessor: "city" },
        { label: "Punto de Venta", accessor: "store" },
        { label: "Porcentaje", accessor: "percentage" },
        { label: "Regla", accessor: "rule" },
        { label: "Envio Novedad", accessor: "send" },
        { label: "Fecha Envio Novedad", accessor: "sendDate" },
        { label: "Venta", accessor: "sale", hidden: true },
    ]

    const filters = [
        { column: 'userName', label: 'Usuario' },
        { column: 'paymentDate', label: 'Fecha de Pago' },
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
                        <CollapsableTable props={
                            {
                                title: 'Comisiones',
                                columnNames: columnNames,
                                secondaryColumns: secondaryColumnsNames,
                                items: commission,
                                filters: filters,
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