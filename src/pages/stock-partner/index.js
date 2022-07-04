/* eslint-disable react/jsx-key */
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { styled } from '@mui/material/styles'

import { Grid, Container, Stack, Typography, Card, CardContent, Link, Avatar } from '@mui/material'

// import { BlogPostCard } from '../../../components/_dashboard/stockproduct'

// ----------------------------------------------------------------------
const CardMediaStyle = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 4 / 4)'
})

const TitleStyle = styled(Link)({
  height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical'
})

const AvatarStyle = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
  position: 'absolute',
  left: theme.spacing(3),
  bottom: theme.spacing(-2)
}))

const CoverImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
})

export default function StockProductApp() {
  const [Stock, setStock] = useState([])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const stockPartner = await axios.get(
      `${process.env.NEXT_PUBLIC_WEB_BACKEND}/stock_partner/partner_id/${sessionStorage.getItem('_id')}`
    )
    const getProducts = await axios.get(`${process.env.NEXT_PUBLIC_WEB_FOODEXPRESS}/products`)
    console.log(getProducts.data.data)
    const newStockPartner = []
    await stockPartner.data.data.forEach(async element => {
      const idx = getProducts.data.data.find(item => item.productid === element.stock_product_id)
      newStockPartner.push({ ...element, stock_product_image: idx.productImg, stock_product_currency: idx.currency })
    })
    console.log(newStockPartner)
    setStock(newStockPartner.reverse())
  }, [])

  return (
    <Container>
      <Stack direction='row' alignItems='center' justifyContent='space-between' mb={5}>
        <Typography variant='h4' gutterBottom>
          <div>สต๊อกสินค้า</div>
        </Typography>
      </Stack>
      <Stack mb={5} direction='row' alignItems='center' justifyContent='space-between' />
      <Grid container spacing={3}>
        {Stock.map(item => (
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ position: 'relative' }}>
              <CardMediaStyle>
                <AvatarStyle
                  alt={item.stock_product_image}
                  src={`${process.env.NEXT_PUBLIC_DRIVE_SELECT_IMAGE}${item.stock_product_image}`}
                />

                <CoverImgStyle
                  alt={item.stock_product_image}
                  src={`${process.env.NEXT_PUBLIC_DRIVE_SELECT_IMAGE}${item.stock_product_image}`}
                />
              </CardMediaStyle>

              <CardContent
                sx={{
                  pt: 6
                }}
              >
                <Typography gutterBottom variant='caption' sx={{ color: 'text.disabled', display: 'block' }}>
                  {item.stock_product_name}
                </Typography>

                <TitleStyle to='#' color='inherit' variant='subtitle2' underline='hover'>
                  เหลือ {item.stock_product_amount} {item.stock_product_currency}
                </TitleStyle>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
