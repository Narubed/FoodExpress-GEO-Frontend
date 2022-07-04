import React from 'react'
import axios from 'axios'

export default async function CheckStatusOrderDetail() {
  const getAllOrder = await axios.get(
    `${process.env.NEXT_PUBLIC_WEB_BACKEND}/order/partner_id/${sessionStorage.getItem('_id')}`
  )
  const filterStatusOrder = getAllOrder.data.data.filter(item => item.order_partner_status === 'รอจัดส่ง')
  const dataPutStatusOrder = []
  filterStatusOrder.forEach(async element => {
    const getOrderDetailByIdOrder = await axios.get(
      `${process.env.NEXT_PUBLIC_WEB_BACKEND}/order_detail/order_id/${element._id}`
    )
    let checkStatus = true
    getOrderDetailByIdOrder.data.data.forEach(item => {
      if (item.odd_status === 'ตัดรอบการจัดส่งแล้ว') {
        checkStatus = false
      }
    })
    if (checkStatus === true) {
      dataPutStatusOrder.push(element._id)
      await axios.put(`${process.env.NEXT_PUBLIC_WEB_BACKEND}/order/${element._id}`, {
        order_partner_status: 'จัดส่งสำเร็จ'
      })
    }
  })
}
