import React, { useState, useEffect } from 'react';
import {
    Box,
    Collapse,
    IconButton,
    TableCell,
    TableHead,
    TableRow,
    Table,
    TableBody,
    TablePagination,
    Typography,
    styled,
    Icon,
    Grid,
    TextField
} from '@mui/material';
import { SimpleCard } from "app/components";
import { tableCellClasses } from '@mui/material/TableCell'
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search"
import { KeyboardArrowUp as KeyboardArrowUpIcon, KeyboardArrowDown as KeyboardArrowDownIcon } from '@mui/icons-material';


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
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


const CollapsableTable = ({ props }) => {
    const { columnNames, secondaryColumns, items, actions } = props
    const [openStates, setOpenStates] = useState({});
    const [tableData, setFilterData] = useState([]);
    const [filterText, setFilterText] = useState("");
    const [showLoading, setShowLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handleChangePage = (_, newPage) => {
        setPage(newPage);
    };

    const handleOnClick = (index) => {
        setOpenStates(prevOpenStates => ({
            ...prevOpenStates,
            [index]: !prevOpenStates[index]
        }));
    };

    const handlerFilter = () => {
        const filteredData = items.filter((elem) => {
            return Object.values(elem).some((value) => String(value).toLowerCase().includes(filterText.toLowerCase()))
        });
        setFilterData(filteredData);
    }


    useEffect(() => {
        const timer = setTimeout(() => {
            setShowLoading(true);
        }, 1500);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    useEffect(() => {
        if (showLoading) {
            handlerFilter()
        }
    }, [filterText, showLoading])

    const renderTableHeaders = (columnNames) => {
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
                <TableCell
                    key={index}
                    align={alignment}
                >
                    {columnObj.label}
                </TableCell>
            );
        });
    }

    const renderTableCells = (item, columns) => {
        let visibleIndex = 0;
        return columns.map((columnObj, cellIndex) => {
            if (columnObj.hidden) return null;

            let alignment = 'center';
            if (visibleIndex === 0) {
                alignment = 'left';
            } else if (visibleIndex === columns.filter(column => !column.hidden).length - 1) {
                alignment = 'right';
            }
            visibleIndex++;

            return (
                <TableCell
                    key={cellIndex}
                    align={alignment}
                >
                    {item[columnObj.accessor]}
                </TableCell>
            );
        });
    }

    return (
        <SimpleCard>
            <Box width='100%' overflow="auto">
                <Grid
                    container
                    spacing={2}
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                    <Grid item xs={12} md={6} lg={4}>
                        <Typography variant='h5'>
                            {props.title || 'Datos'}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
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
                            <TableCell />
                            {renderTableHeaders(columnNames)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData?.length >= 1 ? tableData
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((item, index) => (
                                <>
                                    <TableRow key={index}>
                                        <TableCell>
                                            <IconButton
                                                aria-label="expand row"
                                                size="small"
                                                onClick={() => handleOnClick(index)}
                                            >
                                                {openStates[index] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                            </IconButton>
                                        </TableCell>
                                        {renderTableCells(item, columnNames)}
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
                                    <TableRow>
                                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                            <Collapse in={openStates[index]} timeout="auto" unmountOnExit>
                                                <Box sx={{ margin: 1 }}>
                                                    <Typography variant="h6" gutterBottom component="div">
                                                        Detalle de comisión
                                                    </Typography>
                                                    <Table size="small" aria-label="purchases">
                                                        <TableHead>
                                                            <StyledTableRow>
                                                                {renderTableHeaders(secondaryColumns)}
                                                            </StyledTableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            <TableRow>
                                                                {renderTableCells(item, secondaryColumns)}
                                                            </TableRow>
                                                        </TableBody>
                                                    </Table>
                                                </Box>
                                            </Collapse>
                                        </TableCell>
                                    </TableRow>
                                </>
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
    );
};

export default CollapsableTable;
