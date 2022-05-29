// ** MUI Imports
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import useMediaQuery from '@mui/material/useMediaQuery'
import InputAdornment from '@mui/material/InputAdornment'
import Marquee from 'react-fast-marquee'
import { purple } from '@mui/material/colors'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import { styled } from '@mui/material/styles'

const ImgStyled = styled('img')(({ theme }) => ({
  width: '100%',
  height: '100%',

  // marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

// ** Icons Imports

// ** Components
import ModeToggler from '../../../../src/@core/layouts/components/shared-components/ModeToggler'
import UserDropdown from '../../../../src/@core/layouts/components/shared-components/UserDropdown'
import NotificationDropdown from '../../../../src/@core/layouts/components/shared-components/NotificationDropdown'

const Transition = React.forwardRef((props, ref) => <Slide direction='up' ref={ref} {...props} />)

const AppBarContent = props => {
  const [Announce, setAnnounce] = useState([])
  const [open, setOpen] = useState(true)
  const [AnnounceAdvert, setAnnounceAdvert] = useState(null)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const getAnnounceSlide = await axios.get(`${process.env.NEXT_PUBLIC_WEB_FOODEXPRESS}/getAnnounceSlide`)
    const AnnounceAdverts = await axios.get(`${process.env.NEXT_PUBLIC_WEB_FOODEXPRESS}/getAnnounceAdvert`)
    console.log(AnnounceAdverts.data.data)
    setAnnounce(getAnnounceSlide.data.data[0].announce_slide_data)
    setAnnounceAdvert(AnnounceAdverts.data.data[0].announve_advert_image)
  }, [])

  const handleClose = () => {
    setOpen(false)
  }

  // ** Props
  const { hidden, settings, saveSettings, toggleNavVisibility } = props

  // ** Hook
  const hiddenSm = useMediaQuery(theme => theme.breakpoints.down('sm'))

  return (
    <>
      <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
          <Marquee
            style={{ color: purple[500], backgroundColor: purple[100], borderRadius: '15px' }}
            pauseOnHover
            speed='30'
            gradientColor={[249, 47, 242]}
          >
            {Announce}
          </Marquee>
        </Box>
        <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
          {hiddenSm ? null : (
            <Box
              component='a'
              target='_blank'
              rel='noreferrer'
              sx={{ mr: 4, display: 'flex' }}
              href='https://github.com/themeselection/materio-mui-react-nextjs-admin-template-free'
            >
              <img
                height={24}
                alt='github stars'
                src='https://img.shields.io/github/stars/themeselection/materio-mui-react-nextjs-admin-template-free?style=social'
              />
            </Box>
          )}
          <ModeToggler settings={settings} saveSettings={saveSettings} />
          <NotificationDropdown />
          <UserDropdown />
        </Box>
      </Box>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby='alert-dialog-slide-description'
      >
        {/* <DialogTitle>ประกาศจากเอ็นบีเอ</DialogTitle> */}
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
            {AnnounceAdvert !== null ? (
              <ImgStyled
                rounded={false}
                raised={false}
                alt='Image'
                className='previewimg'
                src={
                  `${process.env.NEXT_PUBLIC_DRIVE_SELECT_IMAGE}${AnnounceAdvert}`
                  // eslint-disable-next-line global-require
                  // require(`../../assets/img/${AnnounceAdvert}`).default
                }
              />
            ) : null}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color='error' onClick={handleClose}>
            ออก
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default AppBarContent
