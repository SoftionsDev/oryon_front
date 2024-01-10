import { useState, useEffect } from "react";
import {
    Grid,
    styled,
    Alert,
    AlertTitle,

} from "@mui/material";
import PaginatedTable from "app/components/PaginatedTable";
import { getFunction, deleteFunction } from 'app/utils/rest_connector'
import { handleGetInfo, handleDelete } from "../../utils/utils"
import { API_URL } from "../../../constants"
import { SimpleCard } from 'app/components';


const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
        marginBottom: "30px",
        [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
}));

const SERVICE = process.env.REACT_APP_RULES_SERVICE || 'rules'


function ListRules() {

    const [listRules, setListRules] = useState([]);
    const [hasError, setError] = useState(false);
    const [refresh, setRefresh] = useState(false)


    const transformObject = (data) => {
        const transformed_data = data.map((item) => {
            return {
                code: item.code,
                name: item.name,
                rule: item.rule,
                percentage: item.percentage,
                date: item.date 
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

    const columnNames = [
        "Codigo",
        "Nombre",
        "Regla",
        "Porcentaje",
        "Fecha de creacion"
    ]


    return (
        <Container >
            {hasError &&
                <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    Algo ha salido mal, intenta de nuevo
                </Alert>
            }
            <Grid container spacing={2}>
                <Grid item xs={12} md={12} />
                <Grid item xs={0} md={0}>
                </Grid >
                <SimpleCard title="Listado reglas - formulas (BRM)">
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
                </SimpleCard>
            </Grid>
        </Container>
    )
}

export default ListRules