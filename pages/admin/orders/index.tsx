import { AdminLayout } from '../../../components/layouts/AdminLayout';
import { ConfirmationNumberOutlined } from '@mui/icons-material';
import { DataGrid, GridColDef, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid';
import { Chip, Grid } from '@mui/material';
import useSWR from 'swr';
import { IOrder, IUser } from '../../../interfaces';

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'Orden ID',
    width: 250,
  },
  {
    field: 'email',
    headerName: 'Correo',
    width: 250,
  },
  {
    field: 'name',
    headerName: 'Nombre completo',
    width: 300,
  },
  {
    field: 'total',
    headerName: 'Monto total',
    width: 300,
  },
  {
    field: 'isPaid',
    headerName: 'Pagado',
    renderCell: ({row}: GridRenderCellParams) => {
      return row.isPaid
        ? (<Chip variant='outlined' label='Pagada' color='success' />)
        : (<Chip variant='outlined' label='Pendiente' color='error' />)
    }
  },
  {
    field: 'noProducts',
    headerName: 'No. Productos',
    align: 'center',
    width: 100,
  },
  {
    field: 'check',
    headerName: 'Ver orden',
    renderCell: ({row}: GridRenderCellParams) => {
      return (
        <a href={`/admin/orders/${row.id}`} target="_blank" rel="noreferrer">
          Ver orden
        </a>
      )
    }
  },
  {
    field: 'createdAt',
    headerName: 'Creada en',
    width: 300,
  },
]

const PageOrders = () => {

  const {data, error} = useSWR<IOrder[]>('/api/admin/orders');

  if(!data && !error) return (<></>);

  const rows = data!.map((order, index) => ({
    id: order._id,
    email: (order.user as IUser).email,
    name: (order.user as IUser).name,
    total: order.total,
    isPaid: order.isPaid,
    noProducts: order.numberOfItems,
    createdAt: order.createdAt
  }));

  return (
    <AdminLayout
      title="Ordenes"
      subTitle='Mantemiento de ordenes'
      icon={<ConfirmationNumberOutlined />}
    >
      <Grid container className="fadeIn">
        <Grid item xs={12} sx={{height: 650, width: '100%'}}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </Grid>
      </Grid>
    </AdminLayout>
  )
}

export default PageOrders;