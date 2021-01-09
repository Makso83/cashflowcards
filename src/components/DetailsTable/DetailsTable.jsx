import React from 'react';
import PropTypes from 'prop-types';
import {
  Table, TableBody, TableCell, TableRow, Typography,
} from '@material-ui/core';
import { calculateAmountByType } from '../../utils/calculateAmounts';

function DetailsTable({
  player, tableData, header, totalAmount, styles,
}) {
  const createRow = (title, table, valueName) => {
    const value = `$${calculateAmountByType(player, table, valueName)}`;
    return { rowTitle: title, value };
  };
  return (
    <div>
      <Typography variant="subtitle1">{header}</Typography>
      <Table>
        <TableBody>
          {tableData.map((line) => {
            const { title, table, valueName } = line;
            const { rowTitle, value } = createRow(title, table, valueName);
            return (
              <TableRow key={rowTitle}>
                <TableCell>{rowTitle}</TableCell>
                <TableCell>{value}</TableCell>
              </TableRow>
            );
          })}
          {!!totalAmount && (
            <TableRow>
              <TableCell><p className={styles.strongText}>Итого:</p></TableCell>
              <TableCell><p className={styles.strongText}>{`$${totalAmount}`}</p></TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

DetailsTable.defaultProps = {
  player: {},
  tableData: {},
  header: '',
  totalAmount: 0,
  styles: {},
};

DetailsTable.propTypes = {
  player: PropTypes.object,
  tableData: PropTypes.array,
  header: PropTypes.string,
  totalAmount: PropTypes.number,
  styles: PropTypes.object,
};

export default DetailsTable;
