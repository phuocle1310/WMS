import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import MulLanguage from "../../assets/language/MulLanguage";
import AOS from "aos";
import "aos/dist/aos.css";
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen ", 159, 6.0, 24, 4.0),
  createData("Ice ", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
];

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#fff",
    borderRadius: 20,
    boxShadow:
      "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
  },
  title: {
    background: "#f8fafb",
    padding: "0.5px 18px",
    color: "#4251b5",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    fontWeight: 700,
    boxShadow:
      "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
  },
  chart: {
    padding: 14,
  },
  cell: {
    boxShadow: "none",
    border: 0,
  },
}));
const StackedBar = () => {
  const classes = useStyles();
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  //lang
  const currentLanguage = useSelector(
    (state) => state.currentLanguage.currentLanguage,
  );
  const language = MulLanguage[`${currentLanguage}`];
  return (
    <>
      <div className={classes.root}>
        <div className={classes.title}>
          <p>{language.product}</p>
        </div>
        <div
          className={classes.chart}
          data-aos="fade-right"
          data-aos-once="true"
        >
          <TableContainer>
            <Table className={classes.table} aria-label="caption table">
              <TableHead>
                <TableRow>
                  <TableCell>{language.id}</TableCell>
                  <TableCell align="right">{language.product}</TableCell>
                  <TableCell align="right">{language.quantity}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell
                      component="th"
                      scope="row"
                      className={classes.cell}
                    >
                      {row.name}
                    </TableCell>
                    <TableCell align="right" className={classes.cell}>
                      {row.calories}
                    </TableCell>
                    <TableCell align="right" className={classes.cell}>
                      {row.fat}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
};

export default StackedBar;
