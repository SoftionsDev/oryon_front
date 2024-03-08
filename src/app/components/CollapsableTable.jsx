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
    Icon
} from '@mui/material';
import { SimpleCard } from "app/components";
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


const CollapsableTable = ({ props }) => {
    const { columnNames, secondaryColumns, items, actions } = props
    const [openStates, setOpenStates] = useState({});

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

    // Function to handle click, toggles the open state for a specific row
    const handleOnClick = (index) => {
        setOpenStates(prevOpenStates => ({
            ...prevOpenStates,
            [index]: !prevOpenStates[index]
        }));
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowLoading(true);
        }, 5000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <SimpleCard>
            <Box width='100%' overflow="auto">
                <Typography variant='h5'>
                    {props.title || 'Datos'}
                </Typography>
                <StyledTable>
                    <TableHead>
                        <TableRow>
                            <TableCell />
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
                        {items.length >= 1 ? items
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
                                        {
                                            Object.keys(item).map((key, cellIndex) => {
                                                if (key !== "extra") {
                                                    let alignment = 'center'
                                                    if (cellIndex === 0) {
                                                        alignment = 'left'
                                                    } else if (cellIndex === Object.keys(item).length - 2) {
                                                        alignment = 'right'
                                                    }
                                                    return (
                                                        <TableCell
                                                            key={cellIndex}
                                                            align={alignment}
                                                            style={{ textTransform: 'none' }}
                                                        >
                                                            {item[key]}
                                                        </TableCell>
                                                    );
                                                }
                                                return null;
                                            })
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
                                    <TableRow>
                                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                            <Collapse in={openStates[index]} timeout="auto" unmountOnExit>
                                                <Box sx={{ margin: 1 }}>
                                                    <Typography variant="h6" gutterBottom component="div">
                                                        Detalle de comisión
                                                    </Typography>
                                                    <Table size="small" aria-label="purchases">
                                                        <TableHead>
                                                            <TableRow>
                                                                {secondaryColumns.map((column, index) => (
                                                                    <TableCell key={index}>{column}</TableCell>
                                                                ))}
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            <TableRow>
                                                                {Object.entries(item.extra || {}).map(([key, value], index) => {
                                                                    return (
                                                                        <TableCell key={index}>
                                                                            {value}
                                                                        </TableCell>
                                                                    );
                                                                })}
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
                    count={items.length}
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
