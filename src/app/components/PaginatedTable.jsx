import { useState, useEffect, useMemo } from 'react';
import {
    Box,
    Grid,
    Icon,
    IconButton,
    styled,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search"
import { SimpleCard } from "app/components";


const StyledTable = styled(Table)(() => ({
    whiteSpace: "pre",
    "& thead": {
        "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
    },
    "& tbody": {
        "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
    },
}));


const PaginatedTable = ({ props }) => {

    const { columnNames, items, actions } = props

    const [showLoading, setShowLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [filterText, setFilterText] = useState("");
    const [tableData, setTableData] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handleChangePage = (_, newPage) => {
        setPage(newPage);
    };

    const handleFilter = () => {
        const filteredData = items.filter((elem) => {
            return Object.values(elem).some((value) => String(value).toLowerCase().includes(filterText.toLowerCase()))
        });
        setTableData(filteredData);
    }



    console.log({ tableData, items, filterText })
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowLoading(true);
        }, 5000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    useEffect(() => {
        if (showLoading) {
            handleFilter();
        }
    }, [filterText, showLoading]);
    return (
        <SimpleCard>
            <Box width="100%" overflow="auto">
                <Grid
                    container
                    spacing={2}
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }} >
                    <Grid item xs={12} md={6}>
                        <Typography variant='h5'>
                            {props.title || 'Datos'}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6} alignSelf={'end'}>
                        <TextField
                            label="Buscar..."
                            value={filterText}
                            variant='outlined'
                            onChange={(e) => setFilterText(e.target.value)}
                            InputProps={
                                {
                                    endAdornment: (
                                        <IconButton onClick={() => {
                                            if (filterText) {
                                                setFilterText("")
                                            }
                                            return
                                        }}>
                                            {filterText ? <ClearIcon /> : <SearchIcon />}
                                        </IconButton>
                                    )
                                }
                            }
                        />
                    </Grid>
                </Grid>
                <StyledTable>
                    <TableHead>
                        <TableRow>
                            {
                                columnNames.map((column, index) => {
                                    let alignment = 'center'
                                    if (index === 0) {
                                        alignment = 'left'
                                    } else if (index === columnNames.length - 1) {
                                        alignment = 'right'
                                    }
                                    return (<TableCell key={index} align={alignment}>{column}</TableCell>)
                                })
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData?.length ? tableData
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((item, index) => (
                                <TableRow key={index}>
                                    {
                                        Object.keys(item).map((key, cellIndex) => (
                                            <TableCell
                                                key={cellIndex}
                                                align={cellIndex === 0 ? "left" : cellIndex === Object.keys(item).length - 1 ? "right" : "center"}
                                                style={{ textTransform: 'none' }}
                                            >
                                                {item[key]}
                                            </TableCell>
                                        ))
                                    }
                                    <TableCell align="right">
                                        {
                                            actions.map((action, actionIndex) => (
                                                <IconButton key={actionIndex} onClick={() => action.click(item)}>
                                                    <Icon color={action.color}>{action.icon}</Icon>
                                                </IconButton>
                                            ))
                                        }
                                    </TableCell>
                                </TableRow>
                            ))
                            :
                            <TableRow>
                                <TableCell align="center" colSpan={Object.keys(columnNames || {}).length + 1}>
                                    {showLoading ? 'Sin datos por el momento' : 'Obteniendo información...'}
                                </TableCell>
                            </TableRow>
                        }
                    </TableBody>
                </StyledTable>

                <TablePagination
                    sx={{ px: 2 }}
                    page={page}
                    component="div"
                    rowsPerPage={rowsPerPage}
                    count={items.length}
                    onPageChange={handleChangePage}
                    rowsPerPageOptions={[5, 10, 25]}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    nextIconButtonProps={{ "aria-label": "Next Page" }}
                    backIconButtonProps={{ "aria-label": "Previous Page" }}
                />
            </Box>
        </SimpleCard>
    )
}

export default PaginatedTable