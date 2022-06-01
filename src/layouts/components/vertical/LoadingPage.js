/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'

export default function LoadingPage() {
  const valueLoading = useSelector(state => state.loading)

  return (
    <div>
      <Dialog aria-labelledby='customized-dialog-title' open={valueLoading}>
        <DialogContent dividers>
          <img src='../../../../images/GIF/cat.gif' frameBorder='0' allowFullScreen width='100%' height='120px' />
          <br />
          loading...
          <br />
          <img src='../../../../images/GIF/loading3.gif' frameBorder='0' allowFullScreen width='100%' height='20px' />
        </DialogContent>
      </Dialog>
    </div>
  )
}
