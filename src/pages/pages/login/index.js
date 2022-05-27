// ** React Imports
import { useState } from 'react'
import dynamic from 'next/dynamic'
import { addItem } from '../../../store/actions'
import axios from 'axios'
import Swal from 'sweetalert2'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel from '@mui/material/FormControlLabel'

// ** Icons Imports
const EyeOffOutline = dynamic(() => import('mdi-material-ui/EyeOffOutline'), { loading: () => <p>...</p> })
const EyeOutline = dynamic(() => import('mdi-material-ui/EyeOutline'), { loading: () => <p>...</p> })
const Facebook = dynamic(() => import('mdi-material-ui/Facebook'), { loading: () => <p>...</p> })
const Twitter = dynamic(() => import('mdi-material-ui/Twitter'), { loading: () => <p>...</p> })
const Github = dynamic(() => import('mdi-material-ui/Github'), { loading: () => <p>...</p> })
const Google = dynamic(() => import('mdi-material-ui/Google'), { loading: () => <p>...</p> })

// ** Configs
// import themeConfig from '../../../../src/configs/themeConfig'
const themeConfig = dynamic(() => import('../../../../src/configs/themeConfig'), { loading: () => <p>...</p> })

// ** Layout Import
// import BlankLayout from '../../../../src/@core/layouts/BlankLayout'
const BlankLayout = dynamic(() => import('../../../../src/@core/layouts/BlankLayout'), { loading: () => <p>...</p> })

// ** Demo Imports
// import FooterIllustrationsV1 from '../../../../src/views/pages/auth/FooterIllustration'
const FooterIllustrationsV1 = dynamic(() => import('../../../../src/views/pages/auth/FooterIllustration'), {
  loading: () => <p>...</p>
})

// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const LoginPage = () => {
  const dispatch = useDispatch()

  // ** State
  const [values, setValues] = useState({
    username: '',
    password: '',
    showPassword: false
  })

  // ** Hook
  const theme = useTheme()
  const router = useRouter()

  const handleChange = prop => event => {
    console.log(event.target.value)
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  const loginSubmit = async () => {
    const localStroge = localStorage.getItem('shopping')
    const data = JSON.parse(localStroge)
    if (data) {
      dispatch(addItem(data))
    }

    const loginData = {
      partner_username: values.username,
      partner_password: values.password
    }
    await axios
      .post(`${process.env.NEXT_PUBLIC_API_NBA_V1}/login_partner`, loginData)
      .then(response => {
        if ('token' in response.data) {
          if (response.data.data.partner_status === 'active') {
            console.log(typeof response.data.token)
            Swal.fire({
              icon: 'success',
              title: 'ยินดีต้อนรับเข้าสู่ระบบ',
              showConfirmButton: false,
              timer: 1500
            })
            setTimeout(() => {
              sessionStorage.setItem('token', response.data.token)
              sessionStorage.setItem('_id', response.data.data._id)
              sessionStorage.setItem('name', response.data.data.partner_name)
              sessionStorage.setItem('level', response.data.data.partner_level)
              sessionStorage.setItem('sublevel', response.data.data.partner_sublevel)
              router.push('/')
            }, 1500)
          } else {
            Swal.fire({
              icon: 'error',
              title: 'ระบบมีปัญหากรุณาติดต่อผู้ดูแล',
              showConfirmButton: false,
              timer: 1500
            })
          }
        } else {
          Swal.fire({
            icon: 'error',
            title: 'ระบบมีปัญหากรุณาติดต่อผู้ดูแล',
            showConfirmButton: false,
            timer: 1500
          })
        }
      })
      .catch(response => {
        Swal.fire({
          icon: 'error',
          title: 'ชื่อผู้ใช้งานหรือรหัสผิดพลาด',
          showConfirmButton: false,
          timer: 1500
        })
      })

    // if ('token' in response.data) {
    //   console.log(response)
    // } else {
    //   Swal.fire({
    //     icon: 'success',
    //     title: 'Your work has been saved',
    //     showConfirmButton: false,
    //     timer: 1500
    //   })
    // }
  }

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <a>
              <img width={100} alt='upgrade to premium' src={`/images/logoNBA/logoFoodexpress.png`} />
            </a>
            <Typography
              variant='h6'
              sx={{
                ml: 3,
                lineHeight: 1,
                fontWeight: 600,
                textTransform: 'uppercase',
                fontSize: '1.5rem !important'
              }}
            >
              {themeConfig.templateName}
            </Typography>
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
              ยินดีตอนรับสู่ระบบสั่งซื้อสินค้า 👋🏻
            </Typography>
            <Typography variant='body2'>Welcome to the foodexpress management system.</Typography>
          </Box>
          <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
            <TextField
              autoFocus
              fullWidth
              value={values.username}
              id='username'
              onChange={handleChange('username')}
              label='ชื่อผู้ใช้งาน'
              sx={{ marginBottom: 4 }}
            />
            <FormControl fullWidth>
              <InputLabel htmlFor='auth-login-password'>Password</InputLabel>
              <OutlinedInput
                label='รหัสผ่าน'
                value={values.password}
                id='auth-login-password'
                onChange={handleChange('password')}
                type={values.showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      aria-label='toggle password visibility'
                    >
                      {values.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <br />
            <br />
            <Box
              sx={{ mb: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}
            >
              {/* <FormControlLabel control={<Checkbox />} label='Remember Me' /> */}

              <Link passHref href='/'>
                <LinkStyled onClick={e => e.preventDefault()}>ลืมรหัสผ่าน?</LinkStyled>
              </Link>
            </Box>
            <Button
              type='submit'
              fullWidth
              size='large'
              variant='contained'
              sx={{ marginBottom: 7 }}
              onClick={() => loginSubmit()}
            >
              เข้าสู่ระบบ
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              {/* <Typography variant='body2' sx={{ marginRight: 2 }}>
                New on our platform?
              </Typography> */}
              {/* <Typography variant='body2'>
                <Link passHref href='/pages/register'>
                  <LinkStyled>Create an account</LinkStyled>
                </Link>
              </Typography> */}
            </Box>
            {/* <Divider sx={{ my: 5 }}>or</Divider>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Link href='/' passHref>
                <IconButton component='a' onClick={e => e.preventDefault()}>
                  <Facebook sx={{ color: '#497ce2' }} />
                </IconButton>
              </Link>
              <Link href='/' passHref>
                <IconButton component='a' onClick={e => e.preventDefault()}>
                  <Twitter sx={{ color: '#1da1f2' }} />
                </IconButton>
              </Link>
              <Link href='/' passHref>
                <IconButton component='a' onClick={e => e.preventDefault()}>
                  <Github
                    sx={{ color: theme => (theme.palette.mode === 'light' ? '#272727' : theme.palette.grey[300]) }}
                  />
                </IconButton>
              </Link>
              <Link href='/' passHref>
                <IconButton component='a' onClick={e => e.preventDefault()}>
                  <Google sx={{ color: '#db4437' }} />
                </IconButton>
              </Link>
            </Box> */}
          </form>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 />
    </Box>
  )
}
LoginPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default LoginPage
