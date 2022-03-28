import { Avatar, Box, Card, CardContent, Grid, LinearProgress, Typography } from '@mui/material';
import InsertChartIcon from '@mui/icons-material/InsertChartOutlined';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
export const SoldCouponList = (props) => {
  const dataBrand = props.dataBrand?props.dataBrand:[];
return(
  <Card
    sx={{ height: '100%' }}
  >
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
            ที่ขายแล้ว
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            {dataBrand.soldCoupon}
          </Typography>
        </Grid>
        <Grid item>
          
          <Avatar
            sx={{
              backgroundColor: 'primary.main',
              height: 56,
              width: 56
            }}
          >
            <AttachMoneyIcon />
          </Avatar>
        </Grid>
      </Grid>
      {/* <Box sx={{ pt: 3 }}>
        <LinearProgress
          value={75.5}
          variant="determinate"
        />
      </Box> */}
    </CardContent>
  </Card>
)};
