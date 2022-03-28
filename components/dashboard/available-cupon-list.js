import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import PeopleIcon from '@mui/icons-material/PeopleOutlined';
import InsertChartIcon from '@mui/icons-material/InsertChartOutlined';
export const AvailableCouponList = (props) => {

  const dataBrand = props.dataBrand?props.dataBrand:[];

return(
  <Card sx={{ height: '100%' }}>
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
            ที่กำลังขาย
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            {dataBrand.availableCoupon?dataBrand.availableCoupon:0}
          </Typography>
        </Grid>
        <Grid item>
        <Avatar
            sx={{
              backgroundColor: 'warning.main',
              height: 56,
              width: 56
            }}
          >
            <InsertChartIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          pt: 2
        }}
      >
        {/* <ArrowUpwardIcon color="success" />
        <Typography
          variant="body2"
          sx={{
            mr: 1
          }}
        >
          16%
        </Typography>
        <Typography
          color="textSecondary"
          variant="caption"
        >
          Since last month
        </Typography> */}
      </Box>
    </CardContent>
  </Card>
)};
