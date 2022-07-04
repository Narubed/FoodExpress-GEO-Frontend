import React from 'react'
import axios from 'axios'
import CheckStockPartner from './CheckStockPartner'
import { element } from 'prop-types'

export default async function TakeOrdersCheckOrderDetail({ findOrderID }) {
  await CheckStockPartner({ findOrderID }) // เช็คสต๊อกทั้งหมด
  const getOrderDetail = await axios(`${process.env.NEXT_PUBLIC_WEB_BACKEND}/order_detail`)

  const getStock = await axios(
    `${process.env.NEXT_PUBLIC_WEB_BACKEND}/stock_partner/partner_id/${sessionStorage.getItem('_id')}`
  )

  const filterStockByProductId = getStock.data.data.find(
    item => item.stock_product_id === parseInt(findOrderID.order_rider_product_id, 10)
  )
  let stockAmountValue = filterStockByProductId.stock_product_amount

  // ให้เเก้ไขสถานะรายละเอียดออเดอร์ เป็น ได้รับสินค้าแล้ว
  const filterOrderDetailStatus = getOrderDetail.data.data.filter(
    item =>
      item.odd_status === 'ตัดรอบการจัดส่งแล้ว' &&
      item.odd_partner_id === sessionStorage.getItem('_id') &&
      item.odd_product_id === parseInt(findOrderID.order_rider_product_id, 10)
  )
  const dataOrderDetailPutStatus = []
  filterOrderDetailStatus.forEach(element => {
    stockAmountValue -= element.odd_product_amount
    if (stockAmountValue >= 0) {
      dataOrderDetailPutStatus.push(element)
    }
  })
  await dataOrderDetailPutStatus.forEach(async element => {
    // ข้อมูลสำหรับเเก้ไขสถานะ order detail
    const dataPortReportStock = {
      spr_partner_id: element.odd_partner_id,
      spr_product_id: element.odd_product_id,
      spr_product_name: element.odd_product_name,
      spr_product_amount: element.odd_product_amount,
      spr_status: 'จ่ายออก'
    }
    await axios.post(`${process.env.NEXT_PUBLIC_WEB_BACKEND}/stock_partner/stock_partner_report`, dataPortReportStock)
    await axios.put(`${process.env.NEXT_PUBLIC_WEB_BACKEND}/order_detail/${element._id}`, {
      odd_status: 'ได้รับสินค้าแล้ว'
    })
  })

  await axios.put(`${process.env.NEXT_PUBLIC_WEB_BACKEND}/stock_partner/${filterStockByProductId._id}`, {
    stock_product_amount: stockAmountValue
  })

  const dataPutOrderRider = {
    id_order_rider_id: findOrderID.id_order_rider_id,
    order_rider_status: 'ไรเดอร์จัดส่งของสำเร็จ'
  }
  await axios.put(`${process.env.NEXT_PUBLIC_WEB_FOODEXPRESS}/putStatusOrderRider`, dataPutOrderRider)
}
