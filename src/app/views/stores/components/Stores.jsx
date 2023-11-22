import { useState, useEffect } from 'react';
import {
    Grid,
    Button,
    styled,
    Alert,
    AlertTitle
  } from "@mui/material";
import { Link } from "react-router-dom";
import PaginatedTable from 'app/components/PaginatedTable';
import { getAllApiStores, deleteApiStore } from "../services"

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


function Stores() {

    const [stores, setStores] = useState([]);
    const [hasError, setError] = useState(false);
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        const getInfo = async () => {
            try {
                const data = await getAllApiStores()
                setStores(data)
            } catch (error) {
                setError(true)
                console.log(error)
            }
        }
        getInfo()
    }, [refresh])

    const handleDelete = async (item) => {
        try {
            await deleteApiStore(item.code)
            setRefresh(true)
        } catch (error) {
            console.log(error)
            setError(true)
        }
    }
    

    const columnNames = [
        "Codigo",
        "Descripción",
        "Cod. Ubicación",
        "Detalle Ubicación",
        "Departamento",
        "Gerente"
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
                <Grid item xs={12} md={12}>
                </Grid>
                <Grid item xs={0} md={0}>
                    <Link to='/create-stores'>
                        <StyledButton variant="contained" color="primary">
                            Agregar
                        </StyledButton>
                    </Link>
                </Grid>
                <PaginatedTable props={
                    { 
                        columnNames, 
                        items: stores, 
                        actions: [
                            {
                                icon: "delete",
                                color: "error",
                                click: handleDelete
                            },
                        ]
                    }
                } 
                />
            </Grid>
        </Container>
    );
}

export default Stores;