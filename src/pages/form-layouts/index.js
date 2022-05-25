// ** MUI Imports
import Grid from '@mui/material/Grid'
import dynamic from 'next/dynamic'

// ** Styled Component
// import DatePickerWrapper from '../../../src/@core/styles/libs/react-datepicker'
const DatePickerWrapper = dynamic(() => import('../../../src/@core/styles/libs/react-datepicker'), { loading: () => <p>...</p> })

// ** Demo Components Imports
const FormLayoutsBasic = dynamic(() => import('../../../src/views/form-layouts/FormLayoutsBasic'), { loading: () => <p>...</p> })
const FormLayoutsIcons = dynamic(() => import('../../../src/views/form-layouts/FormLayoutsIcons'), { loading: () => <p>...</p> })
const FormLayoutsSeparator = dynamic(() => import('../../../src/views/form-layouts/FormLayoutsSeparator'), { loading: () => <p>...</p> })
const FormLayoutsAlignment = dynamic(() => import('../../../src/views/form-layouts/FormLayoutsAlignment'), { loading: () => <p>...</p> })

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

const FormLayouts = () => {
  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <FormLayoutsBasic />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormLayoutsIcons />
        </Grid>
        <Grid item xs={12}>
          <FormLayoutsSeparator />
        </Grid>
        <Grid item xs={12}>
          <FormLayoutsAlignment />
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

export default FormLayouts
