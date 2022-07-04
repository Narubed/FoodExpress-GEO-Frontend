// ** Next Imports
import Head from 'next/head'
import { Router, useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Provider } from 'react-redux'
import { wrapper, store } from '../store/store'

// ** Loader Import
import NProgress from 'nprogress'

// ** Emotion Imports
import { CacheProvider } from '@emotion/react'

// ** Config Imports
// import themeConfig from '../../src/configs/themeConfig'
const themeConfig = dynamic(() => import('../../src/configs/themeConfig'), { loading: () => <p>...</p> })

// ** Component Imports
// import UserLayout from '../../src/layouts/UserLayout'
// import ThemeComponent from '../../src/@core/theme/ThemeComponent'
const UserLayout = dynamic(() => import('../../src/layouts/UserLayout'), { loading: () => <p>...</p> })
const ThemeComponent = dynamic(() => import('../../src/@core/theme/ThemeComponent'), { loading: () => <p>...</p> })

// ** Contexts
import { SettingsConsumer, SettingsProvider } from '../../src/@core/context/settingsContext'

// ** Utils Imports
import { createEmotionCache } from '../../src/@core/utils/create-emotion-cache'

// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css'

// ** Global css styles
import '../../styles/globals.css'

const clientSideEmotionCache = createEmotionCache()

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
}

// ** Configure JSS & ClassName
const App = props => {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [authorized, setAuthorized] = useState(false)
  useEffect(() => {
    // on initial load - run auth check
    authCheck(router.asPath)

    // on route change start - hide page content by setting authorized to false
    const hideContent = () => setAuthorized(false)
    router.events.on('routeChangeStart', hideContent)

    // on route change complete - run auth check
    // router.events.on('routeChangeComplete', authCheck)
    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off('routeChangeStart', hideContent)

      router.events.off('routeChangeComplete', authCheck)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function authCheck(url) {
    // redirect to login page if accessing a private page and not logged in
    const publicPaths = ['/pages/login', '/pages/404']
    const user = sessionStorage.getItem('token')
    if (!publicPaths.includes(publicPaths) && !user) {
      setAuthorized(false)
      router.push({
        pathname: '/pages/login'

        // query: { returnUrl: router.asPath }
      })
    } else {
      setAuthorized(true)
    }
  }

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  // Variables
  const getLayout = Component.getLayout ?? (page => <UserLayout>{page}</UserLayout>)

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>{`Partner-Foodexpress`}</title>
        <meta
          name='description'
          content={`Welcome to NBA Digital Service Center บริษัทเอ็นบีเอ ดิจิตอล เซอร์วิส เซ็นเตอร์ ครบเครื่องครบวงจร บริการ เคาน์เตอร์ เซอร์วิส ออกแบบสื่อสิ่งพิมพ์ออนไลน์และออฟไลน์ บัญชี กราฟฟิก ออกแบบเว็บไซต์ ขนส่ง.`}
        />
        <meta name='keywords' content='FoodExpress โปรเเกรมขนส่งอาหาร ของบริษัทเอ็นบีเอ ดิจิตอล เซอร์วิส เซ็นเตอร์' />
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>

      <SettingsProvider>
        <SettingsConsumer>
          {({ settings }) => {
            return (
              <ThemeComponent settings={settings}>
                {getLayout(
                  <Provider store={store}>
                    <Component {...pageProps} />
                  </Provider>
                )}
              </ThemeComponent>
            )
          }}
        </SettingsConsumer>
      </SettingsProvider>
    </CacheProvider>
  )
}

export default wrapper.withRedux(App)
