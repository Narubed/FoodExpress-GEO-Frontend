/* eslint-disable import/no-duplicates */
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Card from '@mui/material/Card'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'

const CardProduct = dynamic(() => import('../../../src/views/product-app/CardProduct'), { loading: () => <p>...</p> })

const ProductApp = () => {
  const [Products, setProducts] = useState([])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    // console.log(process.env.NEXT_PUBLIC_WEB_FOODEXPRESS)

    const getProducts = await axios.get(`${process.env.NEXT_PUBLIC_WEB_FOODEXPRESS}/getJoinProductType`)

    const filterStatusProduct = getProducts.data.data.filter(f => f.productStetus === 'สินค้าพร้อมจำหน่าย')
    const reverseProduct = filterStatusProduct.reverse()
    setProducts(reverseProduct)
  }, [])

  return (
    <Container>
      <Grid container spacing={6}>
        <Grid item xs={12} sx={{ paddingBottom: 4 }}>
          <Typography variant='h5'>สินค้าทั้งหมด</Typography>
          <Stack
            direction='row'
            flexWrap='wrap-reverse'
            alignItems='center'
            justifyContent='flex-end'
            sx={{ mb: -2, mt: 4 }}
          >
            {/* <Stack direction='row' spacing={1} flexShrink={0} sx={{ my: 1 }}>
              <Button variant='outlined'>ค้นหาตามประเภทสินค้า</Button>
            </Stack> */}
          </Stack>
        </Grid>
        {Products.map(value => (
          <Grid item xs={12} sm={6} md={3} key={value.productid}>
            <CardProduct values={value} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default ProductApp
