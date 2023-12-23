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
                    <TableCell align="center">{item.name}</TableCell>
                    <TableCell align="center">{item.last_name}</TableCell>
                    <TableCell align="center">{item.charge_code}</TableCell>
                    <TableCell align="center">{item.date}</TableCell>
                    <TableCell align="center">{item.immediate_boss}</TableCell>
                    <TableCell align="center">{item.assigned_point}</TableCell>
                    <TableCell align="center">{item.email}</TableCell>
                    <TableCell align="right">{item.rol}</TableCell>                  
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
          nextIconButtonProps={{ 'aria-label': 'Next Page' }}
          backIconButtonProps={{ 'aria-label': 'Previous Page' }}
        />
      </Box>
    </SimpleCard>
  );
};

export default PaginatedTableUsers;
