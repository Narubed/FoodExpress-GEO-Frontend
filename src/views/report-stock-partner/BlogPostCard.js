/* eslint-disable global-require */
/* eslint-disable camelcase */
import PropTypes from 'prop-types'
import { alpha, styled } from '@mui/material/styles'
import { Box, Link, Card, Grid, Avatar, Typography, CardContent } from '@mui/material'

import Label from '../../utils/Label'

// ----------------------------------------------------------------------

const CardMediaStyle = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)'
})

const TitleStyle = styled(Link)({
  height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical'
})

const AvatarStyle = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
  position: 'absolute',
  left: theme.spacing(3),
  bottom: theme.spacing(-2)
}))

const InfoStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(3),
  color: theme.palette.text.disabled
}))

const CoverImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
})

// ----------------------------------------------------------------------

BlogPostCard.propTypes = {
  post: PropTypes.object.isRequired,
  report: PropTypes.object.isRequired,
  index: PropTypes.number
}

export default function BlogPostCard({ post, index, report }) {
  // const { cover, title, view, comment, share, author, createdAt } = post;
  const {
    spr_partner_id,
    spr_product_name,
    spr_product_amount,
    spr_timestamp,
    spr_product_image,
    spr_product_currency,
    spr_status
  } = report
  const latestPostLarge = index === 0
  const latestPost = index === 1 || index === 2

  return (
    <Grid item xs={12} sm={latestPostLarge ? 12 : 6} md={latestPostLarge ? 6 : 3}>
      <Card sx={{ position: 'relative' }}>
        <CardMediaStyle
          sx={{
            ...((latestPostLarge || latestPost) && {
              pt: 'calc(100% * 4 / 3)',
              '&:after': {
                top: 0,
                content: "''",
                width: '100%',
                height: '100%',
                position: 'absolute',
                bgcolor: theme => alpha(theme.palette.grey[900], 0.72)
              }
            }),
            ...(latestPostLarge && {
              pt: {
                xs: 'calc(100% * 4 / 3)',
                sm: 'calc(100% * 3 / 4.66)'
              }
            })
          }}
        >
          <AvatarStyle
            alt={spr_product_image}
            // eslint-disable-next-line import/no-dynamic-require
            src={`${process.env.NEXT_PUBLIC_DRIVE_SELECT_IMAGE}${spr_product_image}`}
            sx={{
              ...((latestPostLarge || latestPost) && {
                zIndex: 9,
                top: 24,
                left: 24,
                width: 40,
                height: 40
              })
            }}
          />

          <CoverImgStyle
            alt={spr_product_image}
            src={`${process.env.NEXT_PUBLIC_DRIVE_SELECT_IMAGE}${spr_product_image}`}
          />
        </CardMediaStyle>

        <CardContent
          sx={{
            pt: 4,
            ...((latestPostLarge || latestPost) && {
              bottom: 0,
              width: '100%',
              position: 'absolute'
            })
          }}
        >
          <Typography gutterBottom variant='caption' sx={{ color: 'text.disabled', display: 'block' }}>
            {/* {dayjs(report_order_date_timestamp).locale('th').format('DD MMMM YYYY')} */}
          </Typography>

          <TitleStyle
            to='#'
            color='inherit'
            variant='subtitle2'
            underline='hover'
            sx={{
              ...(latestPostLarge && { typography: 'h5', height: 60 }),
              ...((latestPostLarge || latestPost) && {
                color: 'common.white'
              })
            }}
          >
            <div>{spr_product_name}</div>
          </TitleStyle>

          <InfoStyle>
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                ml: index === 0 ? 0 : 1.5,
                ...((latestPostLarge || latestPost) && {
                  color: 'grey.500'
                })
              }}
            >
              <Typography variant='caption'>
                {spr_status === 'รับเข้า' ? (
                  <a>
                    {' '}
                    <Label color='primary'>
                      {spr_status} {spr_product_amount} {spr_product_currency}
                    </Label>
                  </a>
                ) : (
                  <a>
                    {' '}
                    <Label color='error'>
                      {spr_status} {spr_product_amount} {spr_product_currency}
                    </Label>
                  </a>
                )}
              </Typography>
            </Box>
          </InfoStyle>
        </CardContent>
      </Card>
    </Grid>
  )
}
