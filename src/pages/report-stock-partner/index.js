import { Icon } from '@iconify/react'
import { useDispatch } from 'react-redux'
import React, { useState, useEffect, useMemo } from 'react'
import { alpha, styled } from '@mui/material/styles'
import axios from 'axios'

// material
import { Grid, Button, Container, Stack, Typography, Box, Link, Card, Avatar, CardContent } from '@mui/material'

import BlogPostCard from '../../views/report-stock-partner/BlogPostCard'

export default function BlogsReportOrderApp() {
  const [ReportOrder, setReportOrders] = React.useState([])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    console.log(sessionStorage.getItem('_id'))

    const getReportStock = await axios.get(
      `${process.env.NEXT_PUBLIC_WEB_BACKEND}/stock_partner/stock_partner_report/partner_id/${sessionStorage.getItem(
        '_id'
      )}`
    )
    const getProducts = await axios.get(`${process.env.NEXT_PUBLIC_WEB_FOODEXPRESS}/products`)
    const newStockPartner = []
    await getReportStock.data.data.forEach(async element => {
      const idx = getProducts.data.data.find(item => item.productid === element.spr_product_id)
      newStockPartner.push({ ...element, spr_product_image: idx.productImg, spr_product_currency: idx.currency })
    })

    if (newStockPartner) {
      setReportOrders(newStockPartner.reverse())
    }
    console.log(newStockPartner)

    // setReportOrder(reverseData)
  }, [])

  return (
    <Container>
      <Stack direction='row' alignItems='center' justifyContent='space-between' mb={5}>
        <Typography variant='h4' gutterBottom>
          <div>รายงานออเดอร์รับเข้าและส่งออก</div>
        </Typography>
      </Stack>

      <Stack mb={5} direction='row' alignItems='center' justifyContent='space-between'>
        {/* <BlogPostsSearch posts={POSTS} /> */}
        {/* <BlogPostsSort options={SORT_OPTIONS} /> */}
      </Stack>

      <Grid container spacing={3}>
        {ReportOrder.map((report, index) => (
          <BlogPostCard key={report.report_order_id} report={report} index={index} />
        ))}
      </Grid>
    </Container>
  )
}
