import { format } from 'date-fns';
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
import { SeverityPill } from '../severity-pill';

export const LatestOrders = (props) => {

    const dataBrand = props.dataBrand?props.dataBrand:[];

    const tableCouponList = dataBrand.memberCouponList?dataBrand.memberCouponList.sort((a,b)=>new Date(b.updated_at)-new Date(a.updated_at)).map((couponList,k) => 
      <TableRow hover key={k+Math.random()}>
        <TableCell>{k+1}</TableCell>
        <TableCell>{new Date(couponList.updated_at).toLocaleDateString()}</TableCell>
        <TableCell>{dataBrand.masterCoupon?dataBrand.masterCoupon.find((masterCoupon)=>masterCoupon.master_coupon_id==couponList.master_coupon_id).name:''}</TableCell>
        <TableCell>ซื้อคูปอง</TableCell>
        <TableCell>-</TableCell>
      </TableRow>
  ):'';
return (
  <Card>
    {console.log(props)}
    <CardHeader title="รายการซื้อ" />
    <PerfectScrollbar>
      <Box style={{overflow:'auto',maxHeight:'800px'}}>
        <Table>
          <TableHead style={{position:'sticky',top:'0'}}>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Coupon Name</TableCell>
              <TableCell>Action</TableCell>
              <TableCell>Tool</TableCell>
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
            {tableCouponList}
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
