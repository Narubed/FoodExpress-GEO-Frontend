import React from 'react'
import { Icon } from '@iconify/react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import {
  Card,
  Table,
  Stack,
  TableRow,
  TableBody,
  TableCell,
  Alert,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  TextField,
  Dialog,
  Button,
  Slide,
  Chip
} from '@mui/material'

import TakeOrdersCheckOrderDetail from './TakeOrdersCheckOrderDetail'
import { openLoading, turnOffLoading } from '../../store/actions'
import CheckStatusOrderDetail from '../../utils/CheckStatusOrderDetail'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

export default function InputTakeOrderId({ Orderlist }) {
  const router = useRouter()
  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(false)
  const [alertError, setAlertError] = React.useState(false)
  const [valueInput, setValueInput] = React.useState(false)

  const takeOrderID = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const onSubmit = async () => {
    setOpen(false)
    const findOrderID = Orderlist.find(item => item.id_order_rider_id === valueInput)
    if (!findOrderID) {
      setAlertError(true)
      setTimeout(() => {
        setAlertError(false)
      }, 5000)
    } else {
      dispatch(openLoading())
      await TakeOrdersCheckOrderDetail({ findOrderID })
      await CheckStatusOrderDetail()
      dispatch(turnOffLoading())

      Swal.fire({
        icon: 'success',
        title: 'คุณได้รับสินค้านี้เข้าสู่ระบบแล้ว !',
        showConfirmButton: false,
        timer: 1500
      })
      setTimeout(() => {
        router.reload(window.location.pathname)
      }, 1500)
    }
  }

  return (
    <div>
      <Button onClick={() => takeOrderID()} startIcon={<Icon icon='bi:envelope-check' />}>
        กรอกรหัสที่รับมาจากไรเดอร์
      </Button>
      <Dialog TransitionComponent={Transition} keepMounted open={open} onClose={handleClose}>
        <DialogTitle>กรอกรหัสที่รับมาจากไรเดอร์</DialogTitle>
        {alertError ? (
          <Alert variant='filled' severity='error'>
            รหัสพัสดุผิด กรุณาตรวจสอบใหม่อีกครั้ง !
          </Alert>
        ) : null}
        <DialogContent>
          <DialogContentText>กรณีเลขพัสดุไม่ใช่ของท่าน ท่านจะไม่สามารถกรอกรหัสนั้นได้</DialogContentText>
          <TextField
            onChange={e => setValueInput(e.target.value)}
            autoFocus
            margin='dense'
            id='name'
            label='รหัสที่ได้รับ..'
            type='string'
            fullWidth
            variant='standard'
          />
        </DialogContent>
        <DialogActions>
          <Button color='error' onClick={handleClose}>
            ยกเลิก
          </Button>
          <Button onClick={onSubmit}>ยืนยัน</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
