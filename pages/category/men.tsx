import { Typography } from '@mui/material'
import type { NextPage } from 'next'
import { ShopLayout } from '../../components/layouts'
import { ProductList } from '../../components/product'
import { FullScreenLoading } from '../../components/ui'
import { useProducts } from '../../hooks'
// import { initialData } from '../database/products'

const MenPage: NextPage = () => {

  const {products, isLoading} = useProducts('/products?gender=men')

  return (
    <ShopLayout title={'Teslo-Shop - Category Men'} pageDescription={'Encuentra los mejores productos de Teslo aquí.'}>
      <Typography variant='h1' component='h1'>Hombres</Typography>
      <Typography variant='h2' sx={{marginBottom: 1}}>Todos los productos para hombres</Typography>
      {
        isLoading ? <FullScreenLoading /> :
        <ProductList products={products} />
      }
    </ShopLayout>
  )
}

export default MenPage
