import ListPo from "../../components/Po/ListPo";
import Grid from "@material-ui/core/Grid";
import ReceiptPo from "../../components/Receipt/ReceiptPo";

const ManagePoPage = () => {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          {/* <ListPo></ListPo> */}
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <ReceiptPo></ReceiptPo>
        </Grid>
      </Grid>
    </>
  );
};
export default ManagePoPage;
