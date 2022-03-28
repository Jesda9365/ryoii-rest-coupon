import { formatDistanceToNow, subHours } from 'date-fns';
import { v4 as uuid } from 'uuid';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import MoreVertIcon from '@mui/icons-material/MoreVert';



export const LatestUsed = (props) =>{

  const dataBrand = props.dataBrand?props.dataBrand:[];

  const tableCouponUse = dataBrand.memberCouponUse?dataBrand.memberCouponUse.sort((a,b)=>new Date(b.updated_at)-new Date(a.updated_at)).map((couponUse,k) =>
    <TableRow hover key={k+Math.random()}>    
      <TableCell>{k+1}</TableCell>
      <TableCell>{new Date(couponUse.updated_at).toLocaleDateString()}</TableCell>
      <TableCell>{couponUse.coupon_code}</TableCell>
      <TableCell>{dataBrand.masterCoupon?dataBrand.masterCoupon.find((masterCoupon)=>masterCoupon.master_coupon_id==couponUse.master_coupon_id).name:''}</TableCell>
      <TableCell>{couponUse.rest_name_th}</TableCell>
      <td>-</td>
    </TableRow>
  ):'';
return (
  <Card>
  {console.log(props)}
  <CardHeader title="รายการใช้คูปอง" />
  <PerfectScrollbar style={{maxHeight:'800px',overflow:'auto'}}>
    <Box sx={{ minWidth: 800 }}>
      <Table>
        <TableHead style={{position:'sticky',top:'0'}}>
          <TableRow>
          <TableCell scope="col">#</TableCell>
                    <TableCell scope="col">Date</TableCell>
                    <TableCell scope="col">Coupon Name</TableCell>
                    <TableCell scope="col">Coupon Code</TableCell>
                    <TableCell scope="col">Restaurant</TableCell>
                    <TableCell scope="col">Tool</TableCell>
            {/* <TableCell sortDirection="desc">
              <Tooltip
                enterDelay={300}
                title="Sort"
              >
                <TableSortLabel
                  active
                  direction="desc"
                >
                  Date
                </TableSortLabel>
              </Tooltip>
            </TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableCouponUse}
        </TableBody>
      </Table>
    </Box>
  </PerfectScrollbar>
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'flex-end',
      p: 2
    }}
  >
    {/* <Button
      color="primary"
      endIcon={<ArrowRightIcon fontSize="small" />}
      size="small"
      variant="text"
    >
      View all
    </Button> */}
  </Box>
</Card>
)};
