import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import moment from "moment";
//lang
import MulLanguage from "../../assets/language/MulLanguage";
import { useSelector } from "react-redux";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#4251b5",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

// function createData(
//   id,
//   name,
//   production_date,
//   expire_date,
//   unit,
//   mu_case,
//   Qty_order,
// ) {
//   return { id, name, production_date, expire_date, unit, mu_case, Qty_order };
// }

// const rows = [
//   createData(1, "Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData(2, "Ice cream sandwich", 237, 9.0, 37, 4.3),
// ];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function CustomizedTables(props) {
  const classes = useStyles();
  //lang
  const currentLanguage = useSelector(
    (state) => state.currentLanguage.currentLanguage,
  );
  const language = MulLanguage[`${currentLanguage}`];
  return (
    <TableContainer>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>{language.id}</StyledTableCell>
            <StyledTableCell align="left">{language.product}</StyledTableCell>
            <StyledTableCell align="right">
              {language.manufactureDate}
            </StyledTableCell>
            <StyledTableCell align="right">
              {language.expirationDate}
            </StyledTableCell>
            <StyledTableCell align="right">{language.unit}</StyledTableCell>
            <StyledTableCell align="right">{language.muCase}</StyledTableCell>
            <StyledTableCell align="right">
              {" "}
              {language.quantity}
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.item.id}
              </StyledTableCell>
              <StyledTableCell align="left">{row.item.name}</StyledTableCell>
              <StyledTableCell align="right">
                {moment(row.item.expire_date).format("L")}
              </StyledTableCell>
              <StyledTableCell align="right">
                {moment(row.item.production_date).format("L")}
              </StyledTableCell>
              <StyledTableCell align="right">{row.item.unit}</StyledTableCell>
              <StyledTableCell align="right">
                {row.item.mu_case}
              </StyledTableCell>
              <StyledTableCell align="right">{row.Qty_order}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
