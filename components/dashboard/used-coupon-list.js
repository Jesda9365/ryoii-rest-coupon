import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PeopleIcon from '@mui/icons-material/PeopleOutlined';
export const UsedCouponList = (props) => {
  const dataBrand = props.dataBrand?props.dataBrand:[];
return(
  <Card sx={{ height: '100%' }} >
    <CardContent>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="overline"
          >
            ที่ถูกใช้แล้ว
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            {dataBrand.useCoupon?dataBrand.useCoupon:0}
          </Typography>
        </Grid>
        <Grid item>
         
          <Avatar
            sx={{
              backgroundColor: 'success.main',
              height: 56,
              width: 56
            }}
          >
            <PeopleIcon />
          </Avatar>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
)};
