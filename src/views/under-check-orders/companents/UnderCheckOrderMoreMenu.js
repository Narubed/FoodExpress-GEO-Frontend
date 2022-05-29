/* eslint-disable camelcase */
import { Icon } from '@iconify/react'
import Link from 'next/link'
import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import 'dayjs/locale/th'
import dynamic from 'next/dynamic'

// material-tailwind

// material
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
  TableContainer,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Slide,
  Paper,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Grid
} from '@mui/material'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'

// import CheckWalletMember from './CheckWalletMember';
// import EditAmountOrder from './EditAmountOrder';
// import postActionAdmin from '../../../utils/postActionAdmin';

// ----------------------------------------------------------------------
CheckOrderMoreMenu.propTypes = {
  id: PropTypes.string,
  order_product_total: PropTypes.number,
  order_status: PropTypes.string
}
const Transition = React.forwardRef((props, ref) => <Slide direction='up' ref={ref} {...props} />)

export default function CheckOrderMoreMenu(props) {
  const router = useRouter()

  // eslint-disable-next-line camelcase
  const { id, Orderlist, row, order_status, order_product_total } = props
  const [showModal, setShowModal] = useState(false)
  const [orderDetail, setOrderDetail] = useState([])
  const ref = useRef(null)
  const [isOpen, setIsOpen] = useState(false)

  const detailOrder = async () => {
    setIsOpen(false)

    const data = await axios.get(
      // eslint-disable-next-line camelcase
      `${process.env.NEXT_PUBLIC_WEB_FOODEXPRESS}/getByOrderDetail_id/${id}`
    )
    console.log(data.data.data)
    setOrderDetail(data.data.data)
    setShowModal(true)
  }

  const deleteOrder = async () => {
    setIsOpen(false)
    Swal.fire({
      title: 'ยืนยันการยกเลิกออเดอร์ !',
      text: 'คุณต้องการยืนยันการยกเลิกออเดอร์หรือไม่ ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ตกลง',
      cancelButtonText: 'ยกเลิก'
    }).then(async result => {
      if (result.isConfirmed) {
        const putData = {
          order_partner_status: 'ผู้ใช้ยกเลิก'
        }
        await axios.put(`${process.env.NEXT_PUBLIC_WEB_BACKEND}/order/${id}`, putData)

        // orderDetails.data.data.map(async value => {
        //   await axios.delete(`${process.env.NEXT_PUBLIC_WEB_BACKEND}/order_detail/${value._id}`)
        // })
        Swal.fire({
          icon: 'success',
          title: 'ยืนยันการยกเลิกออเดอร์เเล้ว',
          showConfirmButton: false,
          timer: 1500
        })
        setTimeout(() => {
          setIsOpen(false)
          router.push('/product-app')
        }, 1500)
      }
    })
  }

  return (
    <>
      <>
        <IconButton ref={ref} onClick={() => setIsOpen(true)}>
          <Icon icon='ic:round-filter-list' />
        </IconButton>

        <Menu
          open={isOpen}
          anchorEl={ref.current}
          onClose={() => setIsOpen(false)}
          PaperProps={{
            sx: { width: 200, maxWidth: '100%' }
          }}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem sx={{ color: 'text.secondary' }} onClick={() => detailOrder()}>
            <ListItemIcon>
              <Icon icon='icon-park-outline:view-grid-detail' width={24} height={24} />
            </ListItemIcon>
            <ListItemText primary='รายระเอียด' primaryTypographyProps={{ variant: 'body2' }} />
          </MenuItem>
        </Menu>

        <Dialog
          fullWidth='fullWidth'
          maxWidth='md'
          open={showModal}
          onClose={() => setShowModal(false)}
          TransitionComponent={Transition}
        >
          <DialogTitle>รายละเอียดออเดอร์</DialogTitle>
          <DialogContent>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell>ไอดี</TableCell>
                    <TableCell align='right'>ชื่อสินค้า</TableCell>
                    <TableCell align='right'>จำนวนสินค้า</TableCell>
                    <TableCell align='right'>ราคารวม</TableCell>
                    <TableCell align='right'>สถานะ</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orderDetail.map(row => (
                    <TableRow
                      key={row._id}
                      sx={{
                        '&:last-of-type td, &:last-of-type th': {
                          border: 0
                        }
                      }}
                    >
                      <TableCell component='th' scope='row'>
                        {row.order_product_id}
                      </TableCell>
                      <TableCell align='right'>{row.order_product_name}</TableCell>
                      <TableCell align='right'>
                        {row.order_product_amoumt} {row.order_product_currency}
                      </TableCell>
                      <TableCell align='right'>
                        {(row.order_product_price * row.order_product_amoumt).toLocaleString()}
                      </TableCell>
                      <TableCell align='right'>{row.order_company_status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Grid align='right' item xs={12} sx={{ mt: 3 }}>
                <Grid item sx={{ textAlign: 'right' }}>
                  {orderDetail
                    .reduce(
                      (previousValue, currentValue) =>
                        previousValue + currentValue.order_product_price * currentValue.order_product_amoumt,
                      0
                    )
                    .toLocaleString() + ' บาท'}
                </Grid>
              </Grid>
            </TableContainer>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowModal(false)}>ออก</Button>
          </DialogActions>
        </Dialog>
      </>
    </>
  )
}
