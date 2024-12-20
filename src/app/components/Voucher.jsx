import * as React from 'react';
import {
    styled,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Grid
} from '@mui/material';

const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
        marginBottom: "30px",
        [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
}));


function VoucherTable({ commissionData }) {
    const data = commissionData
    const columnNames = [
        'Producto',
        'Descripcion',
        'Valor Base',
        'Porcentaje',
        'Valor Comision'
    ];

    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <img src="/assets/images/illustrations/oryon.svg" width="100%" alt="" />
                </Grid>
                <Grid item xs={9}>
                    <Typography variant="h4" component="h1" align="right" style={{ marginTop: "10px" }}>
                        Comprobante de Comisiones
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography variant="h5" component="h2">
                                Datos Comercial
                            </Typography>
                        </Grid>
                        <Grid item xs={6}></Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} style={{ marginTop: '20px' }}>
                    <Grid container spacing={2}>
                        <TableContainer component={Paper}>
                            <Table size="small" aria-label="personalInfo">
                                <TableHead style={{ backgroundColor: '#42423F' }}>
                                    <TableRow>
                                        <TableCell style={{ fontWeight: 'bold', color: 'white', paddingLeft: '5px' }}>Codigo</TableCell>
                                        <TableCell style={{ fontWeight: 'bold', color: 'white', paddingLeft: '5px' }}>Nombres</TableCell>
                                        <TableCell style={{ fontWeight: 'bold', color: 'white', paddingLeft: '5px' }}>Periodo</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow style={{ gap: '8px' }}>
                                        <TableCell component="th" scope="row" style={{ paddingLeft: '5px' }}>
                                            {data.code}
                                        </TableCell>
                                        <TableCell component="th" scope="row" style={{ paddingLeft: '5px' }}>
                                            {data.first_name} {data.last_name}
                                        </TableCell>
                                        <TableCell component="th" scope="row" style={{ paddingLeft: '5px' }}>
                                            {data.start} - {data.end}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
                <Grid item xs={12} style={{ marginTop: '0px' }}>
                    <Grid container spacing={2}>
                        <TableContainer component={Paper}>
                            <Table size="small" aria-label="personalInfo">
                                <TableHead style={{ backgroundColor: '#42423F' }}>
                                    <TableRow>
                                        <TableCell style={{ fontWeight: 'bold', color: 'white', paddingLeft: '5px' }}>Tienda</TableCell>
                                        <TableCell style={{ fontWeight: 'bold', color: 'white', paddingLeft: '5px' }}>Ciudad</TableCell>
                                        <TableCell style={{ fontWeight: 'bold', color: 'white', paddingLeft: '5px' }}>Region</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell component="th" scope="row" style={{ paddingLeft: '5px' }}>
                                            {data.store}
                                        </TableCell>
                                        <TableCell component="th" scope="row" style={{ paddingLeft: '5px' }}>
                                            {data.city}
                                        </TableCell>
                                        <TableCell component="th" scope="row" style={{ paddingLeft: '5px' }}>
                                            {data.region}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography variant="h5" component="h2">
                                Productos
                            </Typography>
                        </Grid>
                        <Grid item xs={6}></Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} style={{ marginTop: '20px' }}>
                    <Grid container spacing={2}>
                        <TableContainer component={Paper}>
                            <Table size="small" aria-label="products headers" stickyHeader>
                                <TableHead style={{ backgroundColor: '#42423F' }}>
                                    <TableRow>
                                        {columnNames.map((columnName, index) => (
                                            <TableCell
                                                key={index}
                                                style={{
                                                    fontWeight: 'bold',
                                                    color: 'white',
                                                    backgroundColor: '#42423F',
                                                    position: 'sticky',
                                                    top: 0,
                                                    zIndex: 10,
                                                    textAlign: 'center'
                                                }}
                                            >
                                                {columnName}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                            </Table>
                        </TableContainer>
                        <TableContainer component={Paper} style={{ maxHeight: '40vh', overflow: 'auto' }}>
                            <Table size="small" aria-label="products">
                                <TableBody style={{ maxHeight: '50vh', overflow: 'auto' }}>
                                    {data.commissions.length > 0 ? (
                                        data.commissions.map((commission, index) => (
                                            <TableRow key={index}>
                                                <TableCell align="center">{commission.product}</TableCell>
                                                <TableCell align="center">{commission.description}</TableCell>
                                                <TableCell align="center">
                                                    {Number(commission.base_amount).toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}
                                                </TableCell>
                                                <TableCell align="center">{commission.percentage}%</TableCell>
                                                <TableCell align="center">
                                                    {Number(commission.commission_amount).toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={5} align="center">No hay comisiones aun</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TableContainer component={Paper}>
                            <Table size="small" aria-label="total commissions">
                                <TableBody>
                                    <TableRow>
                                        <TableCell
                                            style={{
                                                backgroundColor: '#42423F',
                                            }}
                                            colSpan={2}
                                        >
                                        </TableCell>
                                        <TableCell
                                            style={{
                                                backgroundColor: '#42423F',
                                                fontWeight: 'bold',
                                                textAlign: 'right',
                                                color: 'white'
                                            }}
                                        >
                                            Total Comisiones
                                        </TableCell>
                                        <TableCell
                                            style={{
                                                backgroundColor: '#42423F',
                                                fontWeight: 'bold',
                                                textAlign: 'right',
                                                color: 'white'
                                            }}
                                        >
                                            {Number(data.total).toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </Grid>
        </Container >
    );
}

export default VoucherTable;
