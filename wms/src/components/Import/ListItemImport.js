import React, { useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import moment from "moment";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import GreenCheckbox from "../UI/GreenCheckbox";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";
import importApi from "../../api/importApi";
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

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  submit: {
    borderRadius: 25,
    border: 0,
    marginTop: 20,
    color: "white",
    height: 40,
    width: "200px",
    padding: "0 30px",
    background: "#E4544B",
    float: "right",
    "&:hover": {
      background: "#E4544B",
    },
  },
  label: {
    textTransform: "capitalize",
  },
});

export default function CustomizedTables(props) {
  const classes = useStyles();
  const { rows, index } = props;
  //lang
  const currentLanguage = useSelector(
    (state) => state.currentLanguage.currentLanguage,
  );
  const language = MulLanguage[`${currentLanguage}`];
  //tạo check
  const createCheck = () => {
    let arrChecked = [];
    for (let i in props.rows) {
      let checked = { isChecked: !props.rows[i].importStatus };
      arrChecked.push(checked);
    }
    return arrChecked;
  };

  const [checked, setChecked] = useState(createCheck());
  const onChecked = (position) => {
    setChecked((pre) => {
      let newArr = [...pre];
      for (let index in newArr) {
        if (Number(index) === Number(position)) {
          newArr[index].isChecked = !newArr[index].isChecked;
        }
      }
      return newArr;
    });
  };

  const onUpdate = () => {
    const listImport = [];
    for (let index in checked) {
      if (checked[index].isChecked === true) {
        let pk = { pk: rows[index].idImport };
        listImport.push(pk);
      }
    }
    const fetchImport = async () => {
      try {
        const action = await importApi.importUpdate({ import: listImport });
        return action;
      } catch (error) {
        console.log(error);
      }
    };
    fetchImport();
  };

  return (
    <>
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
              <StyledTableCell align="right">
                {" "}
                {language.location}
              </StyledTableCell>
              <StyledTableCell align="right">
                {" "}
                {language.isImport}
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, id) => (
              <StyledTableRow key={id}>
                <StyledTableCell component="th" scope="row">
                  {row.id}
                </StyledTableCell>
                <StyledTableCell align="left">{row.name}</StyledTableCell>
                <StyledTableCell align="right">
                  {moment(row.expire_date).format("L")}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {moment(row.production_date).format("L")}
                </StyledTableCell>
                <StyledTableCell align="right">{row.unit}</StyledTableCell>
                <StyledTableCell align="right">{row.mu_case}</StyledTableCell>
                <StyledTableCell align="right">{row.qty}</StyledTableCell>
                <StyledTableCell
                  align="right"
                  style={{ textTransform: "uppercase" }}
                >
                  {row.row_location}-{row.shelf_column}-{row.shelf_floor}
                </StyledTableCell>
                <StyledTableCell
                  align="right"
                  style={{ textTransform: "uppercase" }}
                >
                  <FormControlLabel
                    control={
                      <GreenCheckbox
                        disabled={index === 2 ? false : true}
                        checked={checked[id].isChecked}
                        onChange={() => onChecked(id)}
                        name="checkedG"
                      />
                    }
                    // label={language.ipDone}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {index === 2 && (
        <Button
          variant="contained"
          onClick={onUpdate}
          classes={{
            root: classes.submit,
            label: classes.label,
          }}
          startIcon={<SendIcon />}
        >
          {language.sendRequire}
        </Button>
      )}
    </>
  );
}
