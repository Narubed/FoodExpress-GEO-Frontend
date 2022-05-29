// ** Icon imports
import { Icon } from '@iconify/react'

import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'
import ShoppingOutline from 'mdi-material-ui/ShoppingOutline'
import PlaylistEdit from 'mdi-material-ui/PlaylistEdit'

const navigation = () => {
  return [
    {
      title: 'หน้าหลัก',
      icon: HomeOutline,
      path: '/'
    },
    {
      title: 'สินค้าทั้งหมด',
      icon: ShoppingOutline,
      path: '/product-app'
    },
    {
      title: 'เช็คออเดอร์',
      icon: PlaylistEdit,
      path: '/check-orders'
    },
    {
      sectionTitle: 'สำหรับศูนย์ที่อยู่ใต้สังกัต'
    },
    {
      title: 'ออเดอร์ศูนย์',
      icon: PlaylistEdit,
      path: '/under-check-orders'
    },
    {
      title: 'Account Settings',
      icon: AccountCogOutline,
      path: '/account-settings'
    },
    {
      sectionTitle: 'Pages'
    },
    {
      title: 'Login',
      icon: Login,
      path: '/pages/login',
      openInNewTab: true
    },
    {
      title: 'Register',
      icon: AccountPlusOutline,
      path: '/pages/register',
      openInNewTab: true
    },

    {
      title: 'Error',
      icon: AlertCircleOutline,
      path: '/pages/error',
      openInNewTab: true
    },
    {
      sectionTitle: 'User Interface'
    },
    {
      title: 'Typography',
      icon: FormatLetterCase,
      path: '/typography'
    },
    {
      title: 'Icons',
      path: '/icons',
      icon: GoogleCirclesExtended
    },
    {
      title: 'Cards',
      icon: CreditCardOutline,
      path: '/cards'
    },
    {
      title: 'Tables',
      icon: Table,
      path: '/tables'
    },
    {
      icon: CubeOutline,
      title: 'Form Layouts',
      path: '/form-layouts'
    }
  ]
}

export default navigation
