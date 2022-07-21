import { Typography } from '@mui/material'
import type { NextPage } from 'next'
import { ShopLayout } from '../../components/layouts'
import { ProductList } from '../../components/product'
import { FullScreenLoading } from '../../components/ui'
import { useProducts } from '../../hooks'
// import { initialData } from '../database/products'

const WomenPage: NextPage = () => {

  const {products, isLoading} = useProducts('/products?gender=women')

  return (
    <ShopLayout title={'Teslo-Shop - Category Women'} pageDescription={'Encuentra los mejores productos de Teslo aquí.'}>
      <Typography variant='h1' component='h1'>Mujeres</Typography>
      <Typography variant='h2' sx={{marginBottom: 1}}>Todos los productos para mujeres</Typography>
      {
        isLoading ? <FullScreenLoading /> :
        <ProductList products={products} />
      }
    </ShopLayout>
  )
}

export default WomenPage
