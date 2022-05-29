// ** React Imports
import { useState } from 'react'
import { addItem } from '../../../store/actions'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import FormHelperText from '@mui/material/FormHelperText'
import { styled } from '@mui/material/styles'
import { Icon } from '@iconify/react'
import Tooltip from '@mui/material/Tooltip'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  '&:last-child': {
    borderRight: 'solid 1px #cccccc'
  },
  position: 'absolute'
})

const CardProductConfirm = ({ value, index }) => {
  const dispatch = useDispatch()
  const router = useRouter()

  const [priceProduct, setPriceProduct] = useState(value.amount * value.productPrice)

  const valueOnChange = e => {
    let math = e.match(/^\d+$/)
    if (math === null) {
      math = 0
    }
    setPriceProduct(math * value.productPrice)
    const getLocalstorage = JSON.parse(localStorage.getItem('shopping'))
    const newData = []
    getLocalstorage.forEach(element => {
      const indexID = element.productid === value.productid
      if (indexID) {
        newData.push({ ...element, amount: parseInt(math, 10) })
      } else {
        newData.push(element)
      }
    })
    dispatch(addItem(newData))
  }

  const deleteCardProduct = () => {
    const getLocalstorage = JSON.parse(localStorage.getItem('shopping'))
    const newData = []
    getLocalstorage.forEach(element => {
      const indexID = element.productid === value.productid
      if (!indexID) {
        newData.push(element)
      }
    })
    dispatch(addItem(newData))
    router.reload()
  }

  return (
    <Card>
      <CardContent>
        <form>
          <Grid container spacing={5}>
            <Grid item xs={6}>
              <Card>
                <CardMedia sx={{ pt: '100%', position: 'relative' }}>
                  <ProductImgStyle src={`${process.env.NEXT_PUBLIC_DRIVE_SELECT_IMAGE}${value.productImg}`} />
                </CardMedia>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Grid item xs={12} sx={{ mt: 3 }}>
                <Grid container spacing={5}>
                  <Tooltip title='ลบสินค้านี้ออก'>
                    <IconButton
                      color='primary'
                      aria-label='upload picture'
                      component='span'
                      sx={{ ml: 'auto' }}
                      onClick={() => deleteCardProduct()}
                    >
                      <Icon icon='typcn:delete-outline' color='red' width='28' height='28' />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
              <h4>{value.productName}</h4>
              <Grid container spacing={5}>
                <Grid item xs={6}>
                  <TextField fullWidth label={value.productPrice.toLocaleString()} disabled />
                </Grid>
                <Grid item xs={1}>
                  <h4>/</h4>
                </Grid>
                <Grid item xs={5}>
                  <TextField fullWidth label={value.currency} disabled />
                </Grid>
              </Grid>
              <br />

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    InputProps={{ inputProps: { min: 0 } }}
                    type='number'
                    fullWidth
                    label='จำนวนสินค้า'
                    placeholder='จำนวนสินค้า'
                    defaultValue={value.amount}
                    onChange={e => valueOnChange(e.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField fullWidth label={priceProduct.toLocaleString() + ' บาท'} disabled />
                </Grid>
              </Grid>
              <br />
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default CardProductConfirm
