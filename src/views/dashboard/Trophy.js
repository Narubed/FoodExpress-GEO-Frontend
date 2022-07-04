/* eslint-disable react-hooks/exhaustive-deps */
// ** MUI Imports
import React from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'
import numeral from 'numeral'

// Styled component for the triangle shaped background image
const TriangleImg = styled('img')({
  right: 0,
  bottom: 0,
  height: 170,
  position: 'absolute'
})

// Styled component for the trophy image
const TrophyImg = styled('img')({
  right: 36,
  bottom: 20,
  height: 98,
  position: 'absolute'
})

const Trophy = () => {
  // ** Hook
  const theme = useTheme()
  const router = useRouter()
  const [summary, setSummary] = React.useState(0)
  const [name, setName] = React.useState('')
  React.useEffect(async () => {
    setName(sessionStorage.getItem('name'))

    const getOrder = await axios.get(
      `${process.env.NEXT_PUBLIC_WEB_BACKEND}/order/partner_id/${sessionStorage.getItem('_id')}`
    )

    // const getOrderDetail = await axios.get(`${process.env.NEXT_PUBLIC_WEB_BACKEND}/order_detail`)

    const getOrderFilterStatus = getOrder.data.data.filter(
      item => item.order_partner_status === 'รอจัดส่ง' || item.order_partner_status === 'จัดส่งสำเร็จ'
    )

    // const filterOrderDetail = []
    // getOrderFilterStatus.forEach(element => {
    //   const filterData = getOrderDetail.data.data.filter(item => item.odd_order_id === element._id)
    //   filterData.map(value =>
    //     filterOrderDetail.push({
    //       ...value,
    //       order_partner_status: element.order_partner_status,
    //       order_partner_timestamp: element.order_partner_timestamp
    //     })
    //   )
    // })
    // console.log(filterOrderDetail)
    // console.log(getOrderFilterStatus)
    // console.log(getOrderDetail.data.data)
    const reducerOrder = getOrderFilterStatus.reduce((value, item) => value + item.order_partner_total, 0)
    setSummary(reducerOrder)
  }, [])

  const handleClick = e => {
    e.preventDefault()
    router.push('/check-orders')
  }

  const imageSrc = theme.palette.mode === 'light' ? 'triangle-light.png' : 'triangle-dark.png'

  return (
    <Card sx={{ position: 'relative' }}>
      <CardContent>
        <Typography variant='h6'>ยินดีต้อนรับคุณ {name}! 🥳</Typography>
        <Typography variant='body2' sx={{ letterSpacing: '0.25px' }}>
          ยอดขายรวมทั้งหมดของคุณ
        </Typography>
        <Typography variant='h5' sx={{ my: 4, color: 'primary.main' }}>
          $ {numeral(summary).format('0.0a')}
          {/* ${summary}k */}
        </Typography>
        <Button size='small' variant='contained' onClick={handleClick}>
          ดูรายละเอียด
        </Button>
        <TriangleImg alt='triangle background' src={`/images/misc/${imageSrc}`} />
        <TrophyImg alt='trophy' src='/images/misc/trophy.png' />
      </CardContent>
    </Card>
  )
}

export default Trophy
