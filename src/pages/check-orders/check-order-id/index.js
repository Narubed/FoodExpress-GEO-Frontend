/* eslint-disable react-hooks/exhaustive-deps */
// ** React Imports
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux'
import { openLoading, turnOffLoading } from '../../../store/actions'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'

import Link from '@mui/material/Link'
import Alert from '@mui/material/Alert'
import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import AlertTitle from '@mui/material/AlertTitle'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import { auto } from '@popperjs/core'

const ImgStyled = styled('img')(({ theme }) => ({
  width: '25%',
  height: '25%',
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const ImgAccout = styled('img')(({ theme }) => ({
  width: '50%',
  height: '50%',
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

const TabAccount = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const {
    query: { id, total }
  } = router

  // ** State
  const [openAlert, setOpenAlert] = useState(true)
  const [imgSrc, setImgSrc] = useState('/images/logoNBA/noImage/no-image-icon-15.png')
  const [file, setfile] = useState([])

  const [order_id, setOrder_id] = useState(id)
  const [totalOrder, setTotalOrder] = useState(total)

  useEffect(() => {
    // Perform localStorage action
    const valueTotal = JSON.parse(localStorage.getItem('partner_total'))
    const valueID = localStorage.getItem('partner_order_id')
    if (valueTotal || valueID) {
      setTotalOrder(valueTotal.toLocaleString())
      setOrder_id(valueID.toLocaleString())
    }
  }, [])

  const onChange = file => {
    const reader = new FileReader()
    const { files } = file.target
    if (files && files.length !== 0) {
      setfile(files[0])
      reader.onload = () => setImgSrc(reader.result)
      reader.readAsDataURL(files[0])
    }
  }

  const resetImage = async () => {
    setfile([])
    setImgSrc('/images/logoNBA/noImage/no-image-icon-15.png')
  }

  const confirmSlip = async () => {
    if (file.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'กรุณาเช็คไฟล์รูปภาพอีกครั้ง',
        showConfirmButton: false,
        timer: 1500
      })
    } else {
      Swal.fire({
        title: 'ยืนยันข้อมูล !',
        text: 'คุณต้องการยืนยันการทำรายการหรือไม่ ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ตกลง',
        cancelButtonText: 'ยกเลิก'
      }).then(async result => {
        if (result.isConfirmed) {
          dispatch(openLoading())
          let formData = new FormData()
          formData.append('order_partner_image', file)
          formData.append('order_partner_status', 'รอตรวจสอบ')
          await axios.put(`${process.env.NEXT_PUBLIC_WEB_BACKEND}/order/${order_id}`, formData)
          dispatch(turnOffLoading())
          Swal.fire({
            icon: 'success',
            title: 'ยืนยันการโอนเงินเรียบร้อยเเล้ว',
            showConfirmButton: false,
            timer: 1500
          })
          setTimeout(() => {
            router.push('/check-orders')
          }, 1500)
        }
      })
    }
  }

  return (
    <CardContent>
      <Container>
        <form>
          <Grid container spacing={7}>
            <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
              หมายเลขทำการ : {id}
              <br />
              ยอดเงิน : {totalOrder}
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ImgStyled src={imgSrc} alt='Profile Pic' />
                <Box>
                  <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                    เพิ่มหลักฐานการโอนเงิน
                    <input
                      hidden
                      type='file'
                      onChange={onChange}
                      accept='image/png, image/jpeg'
                      id='account-settings-upload-image'
                    />
                  </ButtonStyled>
                  <ResetButtonStyled color='error' variant='outlined' onClick={() => resetImage()}>
                    Reset
                  </ResetButtonStyled>
                  <Typography variant='body2' sx={{ marginTop: 5 }}>
                    แนะนำให้เป็นไฟล์ png หรือ jpeg ขนาดไม่เกิน 800K.
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Button variant='contained' sx={{ marginRight: 3.5 }} onClick={() => confirmSlip()}>
                ยืนยันการเพิ่มข้อมูลการโอนเงิน
              </Button>
              <Button
                type='reset'
                variant='outlined'
                color='secondary'
                onClick={() => {
                  router.push({
                    pathname: '/check-orders/'
                  })
                }}
              >
                ย้อนกลับ
              </Button>
            </Grid>
          </Grid>
        </form>
        <br />
        <Grid item xs={12}>
          <Grid container spacing={5}>
            <ImgAccout sx={{ mr: 'auto', ml: 'auto', mt: 12 }} src='/images/logoNBA/noImage/accout.jpg' />
          </Grid>
        </Grid>
      </Container>
    </CardContent>
  )
}

export default TabAccount
