import axios from 'axios'

export default async function CheckStockPartner({ findOrderID }) {
  const getStock = await axios(
    `${process.env.NEXT_PUBLIC_WEB_BACKEND}/stock_partner/partner_id/${sessionStorage.getItem('_id')}`
  )

  const filterStockByProductId = getStock.data.data.find(
    item => item.stock_product_id === parseInt(findOrderID.order_rider_product_id, 10)
  )
  if (!filterStockByProductId || filterStockByProductId.length === 0) {
    const data = {
      stock_partner_id: sessionStorage.getItem('_id'),
      stock_product_id: parseInt(findOrderID.order_rider_product_id, 10),
      stock_product_name: findOrderID.order_rider_product_name,
      stock_product_amount: findOrderID.order_rider_amount
    }

    const dataReport = {
      spr_partner_id: sessionStorage.getItem('_id'),
      spr_product_id: parseInt(findOrderID.order_rider_product_id, 10),
      spr_product_name: findOrderID.order_rider_product_name,
      spr_product_amount: findOrderID.order_rider_amount,
      spr_status: 'รับเข้า'
    }
    await axios.post(`${process.env.NEXT_PUBLIC_WEB_BACKEND}/stock_partner`, data)
    await axios.post(`${process.env.NEXT_PUBLIC_WEB_BACKEND}/stock_partner/stock_partner_report`, dataReport)
  } else {
    const data = {
      stock_product_amount:
        parseInt(filterStockByProductId.stock_product_amount, 10) + parseInt(findOrderID.order_rider_amount, 10)
    }

    const dataReport = {
      spr_partner_id: sessionStorage.getItem('_id'),
      spr_product_id: parseInt(findOrderID.order_rider_product_id, 10),
      spr_product_name: findOrderID.order_rider_product_name,
      spr_product_amount: findOrderID.order_rider_amount,
      spr_status: 'รับเข้า'
    }
    await axios.put(`${process.env.NEXT_PUBLIC_WEB_BACKEND}/stock_partner/${filterStockByProductId._id}`, data)
    await axios.post(`${process.env.NEXT_PUBLIC_WEB_BACKEND}/stock_partner/stock_partner_report`, dataReport)
  }
}
