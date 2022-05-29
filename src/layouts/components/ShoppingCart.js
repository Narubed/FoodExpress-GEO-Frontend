// ** React Import
import { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'
import { useSelector, useDispatch } from 'react-redux'
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Fade from '@mui/material/Fade'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Badge from '@mui/material/Badge'

// ** Third Party Imports
import { usePopper } from 'react-popper'

const BuyNowButton = () => {
  // ** States

  const [ShoppingCount, setShoppingCount] = useState([])
  const [open, setOpen] = useState(false)
  const [popperElement, setPopperElement] = useState(null)
  const [referenceElement, setReferenceElement] = useState(null)

  const dispatch = useDispatch()

  const sampleListData = useSelector(state => state.list)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const localStroge = localStorage.getItem('shopping')
    const valueShopping = JSON.parse(localStroge)
    if (valueShopping) {
      setShoppingCount(valueShopping)
    }

    // eslint-disable--line react-hooks/exhaustive-deps
  }, [dispatch])

  const { styles, attributes, update } = usePopper(referenceElement, popperElement, {
    placement: 'top-end'
  })

  const handleOpen = () => {
    setOpen(true)
    update ? update() : null
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Box
      className='upgrade-to-pro-button mui-fixed'
      sx={{ right: theme => theme.spacing(20), bottom: theme => theme.spacing(180), zIndex: 11, position: 'fixed' }}
    >
      <Link href='/product-app/product-confirm' passHref>
        <Button
          startIcon={
            <Badge
              badgeContent={sampleListData.length !== undefined ? sampleListData.length : ShoppingCount.length}
              color='secondary'
            >
              <Icon icon='noto:shopping-cart' />
            </Badge>
          }
          variant='contained'
          onMouseEnter={handleOpen}
          onMouseLeave={handleClose}
          ref={e => setReferenceElement(e)}
          href='https://themeselection.com/products/materio-mui-react-nextjs-admin-template/'
          sx={{
            backgroundColor: '#8A2BE2',
            boxShadow: '0 1px 20px 1px #FF00FF',
            '&:hover': {
              boxShadow: 'none',
              backgroundColor: '#9400D3'
            }
          }}
        >
          Shop
        </Button>
      </Link>
      <Fade in={open} timeout={700}>
        <Box
          style={styles.popper}
          ref={setPopperElement}
          {...attributes.popper}
          onMouseEnter={handleOpen}
          onMouseLeave={handleClose}
          sx={{ pb: 4, minWidth: theme => (theme.breakpoints.down('sm') ? 400 : 300) }}
        >
          <Paper elevation={9} sx={{ borderRadius: 1, overflow: 'hidden' }}>
            <Link href='/product-app/product-confirm' passHref>
              <img width='100%' alt='materio-pro-banner' src='/images/logoNBA/noImage/foodexpress.png' />
            </Link>
            <CardContent>
              <Typography sx={{ mb: 4 }} variant='h6'>
                เช็ครายการสินค้าและสั่งซื้อ
              </Typography>
              <Typography sx={{ mb: 4 }} variant='body2'>
                สามารถคลิ๊กเพิ่อตรวจสอบ และจัดการออเดอร์ของท่านได้
              </Typography>

              <Link href='/product-app/product-confirm' passHref>
                <Button variant='contained'>หน้าจัดการออเดอร์</Button>
              </Link>
            </CardContent>
          </Paper>
        </Box>
      </Fade>
    </Box>
  )
}

export default BuyNowButton
