// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import dynamic from 'next/dynamic'

// ** Demo Components Imports

const CardUser = dynamic(() => import('../../../src/views/cards/CardUser'), { loading: () => <p>...</p> })
const CardImgTop = dynamic(() => import('../../../src/views/cards/CardImgTop'), { loading: () => <p>...</p> })
const CardMobile = dynamic(() => import('../../../src/views/cards/CardMobile'), { loading: () => <p>...</p> })
const CardSupport = dynamic(() => import('../../../src/views/cards/CardSupport'), { loading: () => <p>...</p> })
const CardTwitter = dynamic(() => import('../../../src/views/cards/CardTwitter'), { loading: () => <p>...</p> })
const CardFacebook = dynamic(() => import('../../../src/views/cards/CardFacebook'), { loading: () => <p>...</p> })
const CardLinkedIn = dynamic(() => import('../../../src/views/cards/CardLinkedIn'), { loading: () => <p>...</p> })
const CardAppleWatch = dynamic(() => import('../../../src/views/cards/CardAppleWatch'), { loading: () => <p>...</p> })
const CardMembership = dynamic(() => import('../../../src/views/cards/CardMembership'), { loading: () => <p>...</p> })
const CardInfluencer = dynamic(() => import('../../../src/views/cards/CardInfluencer'), { loading: () => <p>...</p> })
const CardNavigation = dynamic(() => import('../../../src/views/cards/CardNavigation'), { loading: () => <p>...</p> })
const CardWithCollapse = dynamic(() => import('../../../src/views/cards/CardWithCollapse'), { loading: () => <p>...</p> })
const CardVerticalRatings = dynamic(() => import('../../../src/views/cards/CardVerticalRatings'), { loading: () => <p>...</p> })
const CardNavigationCenter = dynamic(() => import('../../../src/views/cards/CardNavigationCenter'), { loading: () => <p>...</p> })
const CardHorizontalRatings = dynamic(() => import('../../../src/views/cards/CardHorizontalRatings'), { loading: () => <p>...</p> })


const CardBasic = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sx={{ paddingBottom: 4 }}>
        <Typography variant='h5'>Basic Cards</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardImgTop />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardUser />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardWithCollapse />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CardMobile />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CardHorizontalRatings />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardAppleWatch />
      </Grid>
      <Grid item xs={12} md={8}>
        <CardMembership />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardInfluencer />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardVerticalRatings />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardSupport />
      </Grid>
      <Grid item xs={12} sx={{ pb: 4, pt: theme => `${theme.spacing(17.5)} !important` }}>
        <Typography variant='h5'>Navigation Cards</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <CardNavigation />
      </Grid>
      <Grid item xs={12} md={6}>
        <CardNavigationCenter />
      </Grid>
      <Grid item xs={12} sx={{ pb: 4, pt: theme => `${theme.spacing(17.5)} !important` }}>
        <Typography variant='h5'>Solid Cards</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardTwitter />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardFacebook />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardLinkedIn />
      </Grid>
    </Grid>
  )
}

export default CardBasic
