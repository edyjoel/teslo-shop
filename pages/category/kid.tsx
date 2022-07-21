import { Typography } from '@mui/material'
import type { NextPage } from 'next'
import { ShopLayout } from '../../components/layouts'
import { ProductList } from '../../components/product'
import { FullScreenLoading } from '../../components/ui'
import { useProducts } from '../../hooks'
// import { initialData } from '../database/products'

const KidPage: NextPage = () => {

  const {products, isLoading} = useProducts('/products?gender=kid')

  return (
    <ShopLayout title={'Teslo-Shop - Category Kid'} pageDescription={'Encuentra los mejores productos de niños aquí.'}>
      <Typography variant='h1' component='h1'>Niños</Typography>
      <Typography variant='h2' sx={{marginBottom: 1}}>Productos para niños</Typography>
      {
        isLoading ? <FullScreenLoading /> :
        <ProductList products={products} />
      }
    </ShopLayout>
  )
}

export default KidPage
