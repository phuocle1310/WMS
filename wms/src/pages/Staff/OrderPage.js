import Grid from "@material-ui/core/Grid";
import OrderSo from "../../components/Order/OrderSo";

const OrderPage = () => {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          {/* <ListPo></ListPo> */}
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <OrderSo></OrderSo>
        </Grid>
      </Grid>
    </>
  );
};
export default OrderPage;
