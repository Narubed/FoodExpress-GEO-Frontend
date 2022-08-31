/* eslint-disable react/jsx-key */
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'

import { openLoading, turnOffLoading, deleteItem } from '../../../store/actions'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { styled } from '@mui/material/styles'

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

const ImgStyled = styled('img')(({ theme }) => ({
  width: '25%',
  height: '25%',
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const Icons = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [Products, setProducts] = useState([])

  const sampleListData = useSelector(state => state.list)

  const reduceData =
    sampleListData.length !== undefined
      ? sampleListData.reduce(
          (previousValue, currentValue) => previousValue + currentValue.amount * currentValue.productPrice,
          0
        )
      : 0

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const getLocalstorage = localStorage.getItem('shopping')
    const parseData = JSON.parse(getLocalstorage)
    if (parseData !== null) {
      setProducts(parseData)
    }
  }, [dispatch])

  const confirmProduct = () => {
    const getLocalstorage = localStorage.getItem('shopping')
    const parseData = JSON.parse(getLocalstorage)
    const datas = parseData.filter(f => parseInt(f.amount, 10) !== 0)

    if (datas.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'กรุณาเช็คสินค้าใหม่อีกครั้ง',
        showConfirmButton: false,
        timer: 1500
      })
    } else {
      console.log(datas)

      Swal.fire({
        title: 'ยืนยันการสั่งซื้อ !',
        text: 'คุณต้องการเพิ่มรายการสินค้าหรือไม่ ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#8A2BE2',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ยกเลิก'
      }).then(async result => {
        if (result.isConfirmed) {
          dispatch(openLoading())

          const dataReduce = datas.reduce(
            (previousValue, currentValue) => previousValue + currentValue.amount * currentValue.productPrice,
            0
          )

          const dataPOST = {
            order_partner_id: sessionStorage.getItem('_id'),
            order_partner_total: dataReduce
          }
          let orderObjID = null
          await axios
            .post(`${process.env.NEXT_PUBLIC_WEB_BACKEND}/order`, dataPOST)
            .then(response => {
              orderObjID = response.data.order_id
            })
            .catch(error => console.log('error'))
          datas.forEach(async element => {
            const dataOrderDetail = {
              odd_partner_id: sessionStorage.getItem('_id'),
              odd_order_id: orderObjID,
              odd_product_id: element.productid,
              odd_product_name: element.productName,
              odd_product_cost: element.productCost,
              odd_product_price: element.productPrice,
              odd_product_amount: element.amount,
              odd_product_currency: element.currency,
              odd_product_unitkg: element.unitkg,
              odd_percent_nba: (element.percent_NBA * element.amount).toFixed(3),
              odd_percent_service: (element.percent_service * element.amount).toFixed(3)
            }
            await axios.post(`${process.env.NEXT_PUBLIC_WEB_BACKEND}/order_detail`, dataOrderDetail)
            console.log(dataOrderDetail)
          })

          dispatch(turnOffLoading())
          Swal.fire({
            icon: 'success',
            title: 'ยืนยันการสั่งซื้อ',
            showConfirmButton: false,
            timer: 1500
          })
          setTimeout(() => {
            dispatch(deleteItem())
            localStorage.setItem('partner_total', dataReduce)
            localStorage.setItem('partner_order_id', orderObjID)
            router.push({
              pathname: '/check-orders/check-order-id/',
              query: { total: dataReduce, id: orderObjID }
            })
          }, 1500)
        }
      })
    }
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
          <Grid item xs={12} sx={{ mt: 5 }}>
            <Grid item xs={3}>
              {Products.length === 0 ? null : reduceData !== 0 ? (
                <TextField fullWidth value={'ราคารวมทั้งหมด : ' + reduceData.toLocaleString() + ' บาท'} disabled />
              ) : (
                <TextField
                  fullWidth
                  value={
                    'ราคารวมทั้งหมด : ' +
                    Products.reduce(
                      (previousValue, currentValue) => previousValue + currentValue.amount * currentValue.productPrice,
                      0
                    ).toLocaleString() +
                    ' บาท'
                  }
                  disabled
                />
              )}
            </Grid>
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
