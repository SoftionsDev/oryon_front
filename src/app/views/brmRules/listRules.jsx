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
                code: item.id,
                name: item.name,
                percentage: item.percentage,
                date: item.created_at
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
                <PaginatedTable props={
                    {
                        title: "Lista de reglas",
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