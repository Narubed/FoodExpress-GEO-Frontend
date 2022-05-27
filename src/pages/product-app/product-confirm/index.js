/* eslint-disable react/jsx-key */
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import dynamic from 'next/dynamic'
import Container from '@mui/material/Container'

const CardProductConfirm = dynamic(
  () => import('../../../../src/views/product-app/product-confrim/CardProductConfirm'),
  {
    loading: () => <p>...</p>
  }
)

const Icons = () => {
  const dispatch = useDispatch()
  const [Products, setProducts] = useState([])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const getLocalstorage = localStorage.getItem('shopping')
    const parseData = JSON.parse(getLocalstorage)
    if (parseData !== null) {
      setProducts(parseData)
    }
    console.log(parseData)
  }, [dispatch])

  const confirmProduct = () => {
    const getLocalstorage = localStorage.getItem('shopping')
    const parseData = JSON.parse(getLocalstorage)
    console.log(parseData)
    Swal.fire({
      title: 'ยืนยันการสั่งซื้อ !',
      text: "คุณต้องการเพิ่มรายการสินค้าหรือไม่ ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#8A2BE2',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก'
    }).then(result => {
      if (result.isConfirmed) {
        Swal.fire({
            icon: 'success',
            title: 'ยืนยันการสั่งซื้อ',
            showConfirmButton: false,
            timer: 1500
          })
      }
    })
  }

  return (
    <Container>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Typography variant='h5'>
            <Link href='https://materialdesignicons.com/' target='_blank'>
              หน้าจัดการออเดอร์
            </Link>
          </Typography>
          <Typography variant='body2'>กรุณากรอกจำนวนสินค้าที่ต้องการสั่งซื้อ</Typography>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={5}>
            {Products.map((value, index) => (
              <Grid item xs={12} md={6} key={value.productid}>
                <CardProductConfirm value={value} index={index} />
              </Grid>
            ))}
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={5}>
              {Products.length === 0 ? null : (
                <Button
                  type='submit'
                  variant='contained'
                  size='large'
                  sx={{ mr: 'auto', ml: 'auto', mt: 12 }}
                  onClick={() => confirmProduct()}
                >
                  ยืนยันการสั่งซื้อสินค้า
                </Button>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Icons
