/* eslint-disable no-nested-ternary */
/* eslint-disable camelcase */
import { useRouter } from 'next/router'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import { useDispatch } from 'react-redux'
import { filter } from 'lodash'
import dayjs from 'dayjs'
import 'dayjs/locale/th'
import axios from 'axios'
import { styled } from '@mui/material/styles'

// material
import {
  Card,
  Table,
  Stack,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Badge,
  TextField,
  Box,
  Button,
  IconButton,
  Chip
} from '@mui/material'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import MobileDateRangePicker from '@mui/lab/MobileDateRangePicker'
import dynamic from 'next/dynamic'

// import {
//   UnderCheckOrderListHead,
//   UnderCheckOrderListToolbar,
//   UnderCheckOrderMoreMenu
// } from '../../views/under-check-orders/companents'

const UnderCheckOrderListHead = dynamic(
  () => import('../../views/under-check-orders/companents/UnderCheckOrderListHead'),
  { loading: () => <p>...</p> }
)

const InputTakeOrderId = dynamic(() => import('../../views/take-orders/InputTakeOrderId'), {
  loading: () => <p>...</p>
})
const Scrollbar = dynamic(() => import('../../utils/Scrollbar'), { loading: () => <p>...</p> })
const Label = dynamic(() => import('src/utils/Label'), { loading: () => <p>...</p> })
const SearchNotFound = dynamic(() => import('../../utils/SearchNotFound'), { loading: () => <p>...</p> })

// ----------------------------------------------------------------------
const TABLE_HEAD = [
  { id: 'order_rider_product_name', label: 'ชื่อสินค้า', alignRight: false },
  { id: 'order_rider_amount', label: 'จำนวน', alignRight: false },
  { id: 'order_rider_status', label: 'สถานะ', alignRight: false },
  { id: 'rider_first_name', label: 'ชื่อไรเดอร์', alignRight: false },
  { id: 'rider_tel', label: 'เบอร์ไรเดอร์', alignRight: false },
  { id: '' }
]

// ----------------------------------------------------------------------

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

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order

    return a[1] - b[1]
  })
  if (query) {
    return filter(
      array,
      _user =>
        _user.newLevel.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        _user.order_status.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        _user.order_product_total.toLocaleString().toLowerCase().indexOf(query.toLowerCase()) !== -1
    )
  }

  return stabilizedThis.map(el => el[0])
}

function AdminCheckOrderApp() {
  const dispatch = useDispatch()
  const router = useRouter()

  // eslint-disable-next-line no-undef
  const [Orderlist, setOrderlist] = useState([])
  const [OrderlistFilter, setOrderlistFilter] = useState(null)
  const [page, setPage] = useState(0)
  const [order, setOrder] = useState('asc')
  const [selected, setSelected] = useState([])
  // eslint-disable-next-line camelcase
  const [selected_id, setSelected_id] = useState([])
  const [orderBy, setOrderBy] = useState('name')
  const [filterName, setFilterName] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const [valueDate, setValueDate] = useState([null, null])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const getOrdder = await axios.get(`${process.env.NEXT_PUBLIC_WEB_FOODEXPRESS}/getAllOrderExpressJoinRider`)

    const filter_id = getOrdder.data.data.filter(
      item => item.order_rider_consignee_id === sessionStorage.getItem('_id')
    )
    const filterStatus = filter_id.filter(item => item.order_rider_status === 'ไรเดอร์รับมอบหมายงานแล้ว')
    console.log(filterStatus)
    setOrderlist(filterStatus)
  }, [])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = Orderlist.map(n => n.order_id)
      setSelected(newSelecteds)

      return
    }
    setSelected([])
    setSelected_id([])
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - Orderlist.length) : 0
  const filteredOrder = applySortFilter(Orderlist, getComparator(order, orderBy), filterName)

  const isUserNotFound = filteredOrder.length === 0

  const statusObj = {
    รอจัดส่ง: { color: 'info' },
    ไรเดอร์รับมอบหมายงานแล้ว: { color: 'warning' },
    รอตรวจสอบ: { color: 'primary' },
    จัดส่งสำเร็จ: { color: 'success' },
    ผู้ใช้ยกเลิก: { color: 'error' },
    ผู้ดูแลระบบยกเลิก: { color: 'error' }
  }

  return (
    <>
      <Container>
        <Stack direction='row' alignItems='center' justifyContent='space-between' mb={5}>
          <Typography variant='h4' gutterBottom>
            <div>เช็คออเดอร์</div>
          </Typography>
          <InputTakeOrderId Orderlist={Orderlist} />
        </Stack>
        <br />

        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UnderCheckOrderListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={Orderlist.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredOrder.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                    const {
                      id_order_rider_id,
                      order_rider_product_name,
                      order_rider_status,
                      order_rider_amount,
                      rider_first_name,
                      rider_tel
                    } = row
                    const isItemSelected = selected.indexOf(id_order_rider_id) !== -1

                    return (
                      <TableRow
                        hover
                        key={id_order_rider_id}
                        tabIndex={-1}
                        role='checkbox'
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        <TableCell padding='checkbox' />
                        <TableCell component='th' scope='row' padding='none'>
                          <Stack direction='row' alignItems='center' spacing={2}>
                            <Typography variant='subtitle2' noWrap>
                              <Label color='primary'>{order_rider_product_name}</Label>
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align='center'>{order_rider_amount.toLocaleString()}</TableCell>
                        <TableCell align='center'>
                          <Chip
                            label={row.order_rider_status}
                            color={statusObj[row.order_rider_status].color}
                            sx={{
                              height: 24,
                              fontSize: '0.75rem',
                              textTransform: 'capitalize',
                              '& .MuiChip-label': { fontWeight: 500 }
                            }}
                          />
                        </TableCell>

                        <TableCell align='center'>{rider_first_name.toLocaleString()}</TableCell>
                        <TableCell align='center'>{rider_tel.toLocaleString()}</TableCell>
                        {/* <TableCell align='center'>{order_product_total.toLocaleString()}</TableCell> */}
                        {/* <TableCell align='right'>
                          {order_product_date
                            ? dayjs(order_product_date).add(543, 'year').locale('th').format('DD MMMM YYYY')
                            : null}
                        </TableCell> */}
                      </TableRow>
                    )
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align='center' colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component='div'
            count={Orderlist.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </>
  )
}

export default AdminCheckOrderApp
