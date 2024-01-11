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
import { API_URL, ROLES, POSITIONS } from "../../../../constants"


const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
        marginBottom: "30px",
        [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
}));


const SERVICE = process.env.REACT_APP_USERS_SERVICE || 'users'


function Users() {

    const [users, setUsers] = useState([]);
    const [hasError, setError] = useState(false);
    const [refresh, setRefresh] = useState(false)

    const transformObject = (data) => {
        const transformedData = data.map((item) => {
            return {
                code: item.code,
                name: item.first_name,
                last_name: item.last_name,
                position: POSITIONS[item.position],
                date: (() => {
                    const date = new Date(item.date_joined);
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const day = String(date.getDate()).padStart(2, '0');
                    return `${date.getFullYear()}-${month}-${day}`;
                })(),
                role: item.groups.map((group) => Object.keys(ROLES).find(key => ROLES[key] === group))
            }
        })
        return transformedData
    }

    useEffect(() => {
        setError(false)
        handleGetInfo(
            getFunction, API_URL, SERVICE, transformObject, setUsers, setError
        )
    }, [refresh])

    const performDelete = async (item) => {
        console.log(item)
        handleDelete(deleteFunction, API_URL, SERVICE, item.code, setRefresh, setError)
    }

    const columnNames = [
        "Codigo",
        "Nombre",
        "Apellido",
        "Cargo",
        "Fecha de Creacion",
        "Rol"
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
                        title: 'Usurios Activos',
                        columnNames: columnNames,
                        items: users,
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

export default Users