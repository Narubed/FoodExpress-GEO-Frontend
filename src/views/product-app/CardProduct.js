// ** MUI Imports
import React from 'react'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'

import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'

import { styled } from '@mui/material/styles'
import { Icon } from '@iconify/react'
import LoadingButton from '@mui/lab/LoadingButton'
import { purple } from '@mui/material/colors'
import Button from '@mui/material/Button'

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  '&:hover': {
    width: '103%',
    height: '103%'
  },
  '&:last-child': {
    borderRight: 'solid 1px #cccccc'
  },
  position: 'absolute'
})

const ProductImgList = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover'
})

const ColorButton = styled(LoadingButton)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  '&:hover': {
    backgroundColor: purple[200],
    color: '#3c52b2'
  }
}))
const Transition = React.forwardRef((props, ref) => <Slide direction='up' ref={ref} {...props} />)

const CardImgTop = ({ values }) => {
  const [showModal, setShowModal] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [defaultValues, setDefaultValues] = React.useState()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(async () => {
    console.log(values)
    setDefaultValues(values)
  })

  const AddProduct = async () => {
    console.log(values)
    const localStroge = localStorage.getItem('shopping')
    const valueShopping = []
    if (localStroge === null) {
      localStorage.setItem('shopping', JSON.stringify([values]))
    } else {
      const data = JSON.parse(localStroge)
      valueShopping = data
      console.log(data)
      const findIndexShopping = data.findIndex(value => value.productid === values.productid)
      if (findIndexShopping === -1) {
        valueShopping.push(values)
        localStorage.setItem('shopping', JSON.stringify(valueShopping))
      }
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1500)
  }

  return (
    <>
      <Card>
        <CardMedia sx={{ pt: '100%', position: 'relative' }}>
          {!defaultValues || defaultValues.length === 0 ? null : (
            <ProductImgStyle
              src={`${process.env.NEXT_PUBLIC_DRIVE_SELECT_IMAGE}${defaultValues.productImg}`}
              onClick={() => setShowModal(true)}
            />
          )}
        </CardMedia>
        <CardContent>
          <Typography variant='body2' sx={{ marginBottom: 6 }}>
            {!defaultValues || defaultValues.length === 0 ? null : defaultValues.productName}
          </Typography>
          <Typography variant='body2'>
            <Stack direction='row' alignItems='center' justifyContent='space-between'>
              <ColorButton
                size='small'
                endIcon={<Icon icon='clarity:add-line' />}
                loading={loading}
                loadingPosition='end'
                variant='outlined'
                onClick={() => AddProduct()}
              >
                เพิ่มสินค้า{' '}
              </ColorButton>
              <Typography variant='subtitle2' sx={{ mt: -3 }}>
                &nbsp;
                <div>
                  {' '}
                  {!defaultValues || defaultValues.length === 0 ? null : defaultValues.productPrice.toLocaleString()}฿
                </div>
              </Typography>
            </Stack>
          </Typography>
        </CardContent>
      </Card>
      <Dialog
        open={showModal}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setShowModal(false)}
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle> {!defaultValues || defaultValues.length === 0 ? null : defaultValues.productName}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
            {!defaultValues || defaultValues.length === 0 ? null : (
              <ProductImgList src={`${process.env.NEXT_PUBLIC_DRIVE_SELECT_IMAGE}${defaultValues.productImg}`} />
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowModal(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default CardImgTop
