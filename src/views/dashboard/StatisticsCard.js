/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import axios from 'axios'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import TrendingUp from 'mdi-material-ui/TrendingUp'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import CellphoneLink from 'mdi-material-ui/CellphoneLink'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import numeral from 'numeral'

const salesData = [
  {
    stats: '245k',
    title: 'Sales',
    color: 'primary',
    icon: <TrendingUp sx={{ fontSize: '1.75rem' }} />
  },
  {
    stats: '12.5k',
    title: 'Customers',
    color: 'success',
    icon: <AccountOutline sx={{ fontSize: '1.75rem' }} />
  },
  {
    stats: '1.54k',
    color: 'warning',
    title: 'Products',
    icon: <CellphoneLink sx={{ fontSize: '1.75rem' }} />
  },
  {
    stats: '$88k',
    color: 'info',
    title: 'Revenue',
    icon: <CurrencyUsd sx={{ fontSize: '1.75rem' }} />
  }
]

const renderStats = ({ summary, valueMember }) => {

  const filterStatusSuccessDelivery = summary.filter(item => item.order_status === 'จัดส่งสำเร็จ')
  const filterStatusWaiteDelivery = summary.filter(item => item.order_status === 'รอจัดส่ง')
  const reduceOrder = summary.reduce((value, item) => value + item.order_product_total, 0)

  return summary.map((item, index) => (
    <Grid item xs={12} sm={3} key={index}>
      <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          variant='rounded'
          sx={{
            mr: 3,
            width: 44,
            height: 44,
            boxShadow: 3,
            color: 'common.white',
            backgroundColor: `${item.color}.main`
          }}
        >
          {item.icon}
        </Avatar>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='caption'>{item.title}</Typography>
          <Typography variant='h6'>{item.stats}</Typography>
        </Box>
      </Box>
    </Grid>
  ))
}

const StatisticsCard = () => {
  const [summary, setSummary] = React.useState([])
  const [valueMember, setValueMember] = React.useState([])
  React.useEffect(async () => {
    const getLevel = sessionStorage.getItem('level')
    const getSubLevel = sessionStorage.getItem('sublevel')
    let provice = []
    if (getLevel === 'ระดับเขต') {
      const getZone = await axios.post(`${process.env.NEXT_PUBLIC_API_GEO}/join_nba_zone_province`, {
        tokenKey: '*NBADigital9111*'
      })
      const filterProvince = getZone.data.data.filter(item => item.nba_zone === parseInt(getSubLevel, 10))
      provice = filterProvince.map(item => item.province_name)
    } else if (getLevel === 'ระดับภาค') {
      const getGEO = await axios.post(`${process.env.NEXT_PUBLIC_API_GEO}/join_geo_province`, {
        tokenKey: '*NBADigital9111*'
      })
      const filterProvince = getGEO.data.data.filter(item => item.nba_geo_id === parseInt(getSubLevel, 10))
      provice = filterProvince.map(item => item.province_name)
    }

    // filterMemberFoodexpress
    const getAllMemberFoodexpress = await axios.get(`${process.env.NEXT_PUBLIC_WEB_FOODEXPRESS}/members`)
    const valueMemberFoodExpress = []
    provice.forEach(element => {
      const filtereds = getAllMemberFoodexpress.data.data.filter(item => item.province === element)
      if (filtereds.length !== 0) {
        filtereds.map(value => valueMemberFoodExpress.push({ ...value }))
      }
    })
    setValueMember(valueMemberFoodExpress)

    // ----------------------------------------------

    const getOrdder = await axios.get(`${process.env.NEXT_PUBLIC_WEB_FOODEXPRESS}/getJoinOrderAndMember`)
    const reverseData = getOrdder.data.data.reverse()

    const filterStatus = reverseData.filter(
      item => item.order_status === 'รอจัดส่ง' || item.order_status === 'จัดส่งสำเร็จ'
    )
    const valueProvincePartner = []
    provice.forEach(element => {
      const idf = filterStatus.filter(item => item.province === element)
      if (idf.length !== 0) {
        idf.map(value => valueProvincePartner.push(value))
      }
    })

    // setSummary(valueProvincePartner)
    const filterStatusSuccessDelivery = valueProvincePartner.filter(item => item.order_status === 'จัดส่งสำเร็จ')
    const filterStatusWaiteDelivery = valueProvincePartner.filter(item => item.order_status === 'รอจัดส่ง')
    const reduceOrder = valueProvincePartner.reduce((value, item) => value + item.order_product_total, 0)

    setSummary([
      {
        stats: numeral(reduceOrder).format('0.0a'),
        title: 'ยอดสั่งซื้อ',
        color: 'primary',
        icon: <TrendingUp sx={{ fontSize: '1.75rem' }} />
      },
      {
        stats: valueMemberFoodExpress.length,
        title: 'จำนวนผู้ใช้',
        color: 'success',
        icon: <AccountOutline sx={{ fontSize: '1.75rem' }} />
      },
      {
        stats: filterStatusWaiteDelivery.length,
        color: 'warning',
        title: 'ออเดอร์รอจัดส่ง',
        icon: <CellphoneLink sx={{ fontSize: '1.75rem' }} />
      },
      {
        stats: filterStatusSuccessDelivery.length,
        color: 'info',
        title: 'ออเดอร์ส่งสำเร็จ',
        icon: <CurrencyUsd sx={{ fontSize: '1.75rem' }} />
      }
    ])
  }, [])

  return (
    <Card>
      <CardHeader
        title='ยอดขายศูนย์'
        action={
          <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
            <DotsVertical />
          </IconButton>
        }
        subheader={
          <Typography variant='body2'>
            <Box component='span' sx={{ fontWeight: 600, color: 'text.primary' }}>
              ยอดขายของศูนย์ใต้สังกัต
            </Box>{' '}
            😎 ทั้งหมด
          </Typography>
        }
        titleTypographyProps={{
          sx: {
            mb: 2.5,
            lineHeight: '2rem !important',
            letterSpacing: '0.15px !important'
          }
        }}
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(3)} !important` }}>
        <Grid container spacing={[5, 0]}>
          {renderStats({ summary, valueMember })}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default StatisticsCard
