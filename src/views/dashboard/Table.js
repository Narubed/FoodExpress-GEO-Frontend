/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import Paper from '@mui/material/Paper'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import { Icon } from '@iconify/react'
import dayjs from 'dayjs'
import 'dayjs/locale/th'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'

import { visuallyHidden } from '@mui/utils'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

const ImgStyled = styled('img')(({ theme }) => ({
  width: '100%',
  height: '100%',
  borderRadius: theme.shape.borderRadius
}))

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }

  return 0
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) {
      return order
    }

    return a[1] - b[1]
  })

  return stabilizedThis.map(el => el[0])
}

const headCells = [
  {
    id: 'wpr_partner_level',
    numeric: false,
    disablePadding: true,
    label: 'ระดับ'
  },
  {
    id: 'wpr_partner_name',
    numeric: true,
    disablePadding: false,
    label: 'ชื่อ'
  },
  {
    id: 'wpr_partner_total',
    numeric: true,
    disablePadding: false,
    label: 'จำนวน'
  },
  {
    id: 'wpr_status',
    numeric: true,
    disablePadding: false,
    label: 'สถานะ'
  },
  {
    id: 'wpr_slip',
    numeric: true,
    disablePadding: false,
    label: 'หลักฐานการโอน'
  },
  {
    id: 'wpr_timestamp',
    numeric: true,
    disablePadding: false,
    label: 'วันที่ตัดรอบค่าตอบเเทน'
  }
]

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props

  const createSortHandler = property => event => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component='span' sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
}

export default function EnhancedTable() {
  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState('calories')
  const [selected, setSelected] = React.useState([])
  const [page, setPage] = React.useState(0)
  const [dense, setDense] = React.useState(false)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [rows, setRows] = React.useState([])
  const [open, setOpen] = React.useState(false)
  const [slipImage, setSlipImage] = React.useState()

  React.useEffect(async () => {
    const getWalletReport = await axios.get(
      `${process.env.NEXT_PUBLIC_WEB_BACKEND}/wallet_partner/wallet_partner_report`
    )

    const filterPartner = getWalletReport.data.data.filter(
      item => item.wpr_partner_id === sessionStorage.getItem('_id')
    )
    const addLevelPartner = []
    filterPartner.forEach(element => {
      addLevelPartner.push({
        ...element,
        wpr_partner_level: sessionStorage.getItem('level'),
        wpr_partner_name: sessionStorage.getItem('name')
      })
    })
    setRows(addLevelPartner.reverse())
  }, [])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = rows.map(n => n.name)
      setSelected(newSelecteds)

      return
    }
    setSelected([])
  }

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1))
    }

    setSelected(newSelected)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const isSelected = name => selected.indexOf(name) !== -1

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  const statusObj = {
    รอรับค่าคอมมิชชั่น: { color: 'warning' },
    ได้รับค่าคอมมิชชั่นแล้ว: { color: 'success' }
  }

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <TableContainer>
            <div style={{ margin: '25px', fontSize: '150%' }}>ค่าคอมมิสชั่น</div>
            <Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle' size={dense ? 'small' : 'medium'}>
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.name)
                    const labelId = `enhanced-table-checkbox-${index}`

                    return (
                      <TableRow
                        hover
                        onClick={event => handleClick(event, row.name)}
                        role='checkbox'
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row._id}
                        selected={isItemSelected}
                      >
                        <TableCell component='th' id={labelId} scope='row' padding='none'>
                          {row.wpr_partner_level}
                        </TableCell>
                        <TableCell align='right'>{row.wpr_partner_name}</TableCell>
                        <TableCell align='right'>{row.wpr_partner_total.toLocaleString()}</TableCell>
                        <TableCell align='right'>
                          <Chip
                            label={row.wpr_status}
                            color={statusObj[row.wpr_status].color}
                            sx={{
                              height: 24,
                              fontSize: '0.75rem',
                              textTransform: 'capitalize',
                              '& .MuiChip-label': { fontWeight: 500 }
                            }}
                          />
                        </TableCell>
                        <TableCell align='right'>
                          {row.wpr_slip ? (
                            <IconButton
                              aria-label='delete'
                              size='small'
                              onClick={() => {
                                setOpen(true), setSlipImage(row.wpr_slip)
                              }}
                            >
                              <Icon icon='noto-v1:framed-picture' width='42' height='42' />
                            </IconButton>
                          ) : null}
                        </TableCell>
                        <TableCell align='right'>
                          {row.wpr_timestamp
                            ? dayjs(row.wpr_timestamp).add(543, 'year').locale('th').format(' D MMMM YYYY h:mm A')
                            : null}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component='div'
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
      <Dialog
        fullWidth='fullWidth'
        maxWidth='xs'
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpen(false)}
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle>หลักฐานการโอนเงิน</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
            <ImgStyled src={`${process.env.NEXT_PUBLIC_DRIVE_SELECT_IMAGE}${slipImage}`} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>ออก</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
