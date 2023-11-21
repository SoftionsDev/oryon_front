import { useState } from 'react';
import {
  Box,
  Icon,
  IconButton,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import { SimpleCard } from 'app/components';

const StyledTable = styled(Table)(() => ({
  whiteSpace: 'pre',
  '& thead': {
    '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } },
  },
  '& tbody': {
    '& tr': { '& td': { paddingLeft: 0, textTransform: 'capitalize' } },
  },
}));

const PaginatedTableUsers = ({ props }) => {
  const { columnNames, items, actions } = props;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  return (
    <SimpleCard>
      <Box width="100%" overflow="auto">
        <StyledTable>
          <TableHead>
            <TableRow>
              {columnNames.map((column, index) => {
                let alignment = 'center';
                if (index === 0) {
                  alignment = 'left';
                } else if (index === columnNames.length - 1) {
                  alignment = 'right';
                }
                return (
                  <TableCell key={index} align={alignment}>
                    {column}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {items.length >= 1 ? (
              items
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item, index) => (
                  <TableRow key={index}>
                    <TableCell align="left">{item.code}</TableCell>
                    <TableCell align="center">{item.id_product}</TableCell>
                    <TableCell align="center">{item.id_shop}</TableCell>
                    <TableCell align="center">{item.comercial}</TableCell>
                    <TableCell align="center">{item.date}</TableCell>
                    <TableCell align="right">{item.value}</TableCell>
                    <TableCell align="right">
                      {actions.map((action, index) => (
                        <IconButton key={index} onClick={() => action.click(item)}>
                          <Icon color={action.color}>{action.icon}</Icon>
                        </IconButton>
                      ))}
                    </TableCell>
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell align="center" colSpan={columnNames.length}>
                  Retrieving data...
                </TableCell>
              </TableRow>
            )}
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
          nextIconButtonProps={{ 'aria-label': 'Siguiente pagina' }}
          backIconButtonProps={{ 'aria-label': 'Pagina anterior' }}
        />
      </Box>
    </SimpleCard>
  );
};

export default PaginatedTableUsers;
