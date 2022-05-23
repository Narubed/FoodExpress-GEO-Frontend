// ** Icon imports
import Login from 'mdi-material-ui/Login'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'

const navigation = () => {
  return [
    {
      title: 'Login',
      icon: Login,
      path: '/pages/login'

      // openInNewTab: true
    },

    // {
    //   title: 'Register',
    //   icon: AccountPlusOutline,
    //   path: '/pages/register',
    //   openInNewTab: true
    // },
    {
      title: 'Error',
      icon: AlertCircleOutline,
      path: '/pages/error'
      
      // openInNewTab: true
    }
  ]
}

export default navigation
