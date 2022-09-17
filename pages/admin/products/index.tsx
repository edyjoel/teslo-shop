import { AdminLayout } from '../../../components/layouts/AdminLayout';
import { ConfirmationNumberOutlined, CategoryOutlined, AddBoxOutlined } from '@mui/icons-material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Box, Button, CardMedia, Chip, Grid, Link } from '@mui/material';
import useSWR from 'swr';
import { IOrder, IUser } from '../../../interfaces';
import { IProduct } from '../../../interfaces/products';
import NextLink from 'next/link';

const columns: GridColDef[] = [
  {
    field: 'img',
    headerName: 'Foto',
    renderCell: ({row}: GridValueGetterParams) => {
      return (
        <a href={`/product/${row.slug}`} target="_blank" rel="noreferrer">
          <CardMedia
            component='img'
            alt={row.title}
            className='fadeIn'
            image={row.img}
          />
        </a>
      )
    }
  },
  {
    field: 'title',
    headerName: 'Título',
    width: 250,
    renderCell: ({row}: GridValueGetterParams) => {
      return (
        <NextLink href={`/admin/products/${row.slug}`} passHref>
          <Link underline='always'>
            {row.title}
          </Link>
        </NextLink>
      )
    }
  },
  {
    field: 'gender',
    headerName: 'Género',
  },
  {
    field: 'type',
    headerName: 'Tipo',
  },
  {
    field: 'inStock',
    headerName: 'Inventario',
  },
  {
    field: 'price',
    headerName: 'Precio',
  },
  {
    field: 'sizes',
    headerName: 'Tallas',
    width: 250,
  },
]

const PageProducts = () => {

  const {data, error} = useSWR<IProduct[]>('/api/admin/products');

  if(!data && !error) return (<></>);

  const rows = data!.map((product) => ({
    id: product._id,
    img: product.images[0],
    title: product.title,
    gender: product.gender,
    type: product.type,
    inStock: product.inStock,
    price: product.price,
    sizes: product.sizes.join(', '),
    slug: product.slug,
  }));

  return (
    <AdminLayout
      title={`Productos (${data?.length})`}
      subTitle='Mantemiento de productos'
      icon={<CategoryOutlined />}
    >

      <Box display='flex' justifyContent='end' sx={{mb: 2}}>
        <Button
          startIcon={<AddBoxOutlined />}
          color='secondary'
          href='/admin/products/new'
        >
          Crear producto
        </Button>
      </Box>

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

export default PageProducts;