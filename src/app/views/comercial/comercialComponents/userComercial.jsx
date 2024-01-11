import { useState, useEffect } from "react";
import {
    Grid,
    styled,
    Alert,
    AlertTitle
} from "@mui/material";
import PaginatedTable from "app/components/PaginatedTable";
import { getFunction, deleteFunction } from "../../../utils/rest_connector"
import { handleGetInfo, handleDelete } from "../../../utils/utils"
import { API_URL, GOALS_TYPES } from "../../../../constants"


const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
        marginBottom: "30px",
        [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
}));


const SERVICE = process.env.REACT_APP_COMERCIALS_SERVICE || 'comercials'


function Comercials() {

    const [comercials, setComercials] = useState([]);
    const [hasError, setError] = useState(false);
    const [refresh, setRefresh] = useState(false)

    const transformObject = (data) => {
        const transformed_data = data.map((item) => {
            return {
                code: item.user.code,
                firstName: item.user.first_name,
                last_name: item.user.last_name,
                email: item.user.email,
                manager: item.manager,
                goal_type: (() => Object.keys(GOALS_TYPES).find(key => GOALS_TYPES[key] === item.goal_type))(),
                goal: item.goal,
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
            <Grid container spacing={2}>
                <PaginatedTable props={
                    {
                        title: 'Comerciales',
                        columnNames: columnNames,
                        items: comercials,
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

export default Comercials