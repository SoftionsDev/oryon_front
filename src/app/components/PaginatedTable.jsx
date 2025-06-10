import { useState, useEffect } from 'react';
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
import { SimpleCard } from "@/app/components";


const StyledTable = styled(Table)(() => ({
    whiteSpace: "pre",
    "& thead": {
        "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
    },
    "& tbody": {
        "& tr": { "& td": { paddingLeft: 0 } },
    },
}));


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    width: 'auto',
    maxWidth: '150px',
}))

const PaginatedTable = ({ props }) => {

    const { columnNames, items, filters, actions } = props

    const [showLoading, setShowLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [filterText, setFilterText] = useState({});
    const [tableData, setFilterData] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handleChangePage = (_, newPage) => {
        setPage(newPage);
    };

    const handlerFilter = () => {
        if (Object.keys(filterText).length === 0) {
            setFilterData(items);
        } else {
            const filteredData = items.filter((elem) => {
                return Object.keys(filterText).every((key) => {
                    return Object.values(elem).some((value) => String(value).toLowerCase().includes(filterText[key].toLowerCase()))
                });
            });
            setFilterData(filteredData);
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowLoading(true);
        }, 500);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    const renderTableHeaders = () => {
        let visibleIndex = 0;
        return columnNames.map((columnObj, index) => {
            if (columnObj.hidden) return null;

            let alignment = 'center';
            if (visibleIndex === 0) {
                alignment = 'left';
            } else if (visibleIndex === columnNames.filter(column => !column.hidden).length - 1) {
                alignment = 'right';
            }
            visibleIndex++;

            return (
                <StyledTableCell
                    key={index}
                    align={alignment}
                >
                    {columnObj.label}
                </StyledTableCell>
            );
        });
    }

    const renderTableCells = (item) => {
        let visibleIndex = 0;
        return columnNames.map((columnObj, cellIndex) => {
            if (columnObj.hidden) return null;

            let alignment = 'center';
            if (visibleIndex === 0) {
                alignment = 'left';
            } else if (visibleIndex === columnNames.filter(column => !column.hidden).length - 1) {
                alignment = 'right';
            }
            visibleIndex++;

            return (
                <StyledTableCell
                    key={cellIndex}
                    align={alignment}
                >
                    {item[columnObj.accessor]}
                </StyledTableCell>
            );
        });
    }

    useEffect(() => {
        if (showLoading) {
            handlerFilter();
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
                    }}
                >
                    <Grid item xs={12} md={6} lg={4}>
                        <Typography variant='h5'>
                            {props.title || 'Datos'}
                        </Typography>
                    </Grid>
                    {filters.length > 0 &&
                        <Grid item xs={12}>
                            <Typography variant='h6' sx={{ paddingBottom: '10px' }}>
                                Filtros
                            </Typography>
                            <Grid container item spacing={3}>
                                {
                                    filters.map((filter, index) => (
                                        <Grid item xs={2} container direction="column">
                                            <Typography variant='buttom' sx={{ fontWeight: 'bold' }}>{filter.label}</Typography>
                                            <TextField
                                                label="Buscar..."
                                                name={filter.column}
                                                value={filterText[filter.column] || ''}
                                                variant='outlined'
                                                onChange={(e) => setFilterText(prevState => ({ ...prevState, [e.target.name]: e.target.value }))}
                                                InputProps={
                                                    {
                                                        endAdornment: (
                                                            <IconButton onClick={() => {
                                                                if (filterText[filter.column]) {
                                                                    setFilterText(prevState => ({ ...prevState, [filter.column]: "" }))
                                                                }
                                                                return
                                                            }}>
                                                                {filterText[filter.column] ? <ClearIcon /> : <SearchIcon />}
                                                            </IconButton>
                                                        )
                                                    }
                                                }
                                            />
                                        </Grid>
                                    ))
                                }
                            </Grid>
                        </Grid>
                    }
                </Grid>
                <StyledTable>
                    <TableHead>
                        <TableRow>
                            {renderTableHeaders()}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData?.length ? tableData
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((item) => (
                                <TableRow key={item.code}>
                                    {renderTableCells(item)}
                                    {actions && actions.length > 0 &&
                                        <TableCell align="right">
                                            {
                                                actions.map((action, actionIndex) => (
                                                    <IconButton key={actionIndex} onClick={() => action.click(item)}>
                                                        <Icon color={action.color}>{action.icon}</Icon>
                                                    </IconButton>
                                                ))
                                            }
                                        </TableCell>
                                    }
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
                    count={tableData.length}
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