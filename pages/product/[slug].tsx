import { Box, Button, Chip, Grid, Typography } from "@mui/material"
import { ShopLayout } from "../../components/layouts"
import { ProductSlideshow } from '../../components/product/ProductSlideshow';
import { ItemCounter } from "../../components/ui";
import { SizeSelector } from "../../components/product";
import { ICartProduct, IProduct } from "../../interfaces";
import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { dbProducts } from "../../database";
import { useContext, useState } from "react";
import { ISize } from '../../interfaces/products';
import { useRouter } from "next/router";
import { CartContext } from "../../context";

interface Props {
  product: IProduct
}

const ProductPage: NextPage<Props> = ({product}) => {

  const router = useRouter();
  const {addProductToCart} = useContext(CartContext)

  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    image: product.images[0],
    price: product.price,
    size: undefined,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    quantity: 1
  })

  const selectedSize = (size: ISize) => {
    setTempCartProduct(currentProduct => ({
      ...currentProduct,
      size
    }))
  }

  const onUpdateQuantity = (quantity: number) => {
    setTempCartProduct(currentProduct => ({
      ...currentProduct,
      quantity
    }))
  }

  const onAddProduct = () => {
    if(!tempCartProduct.size) return;

    addProductToCart(tempCartProduct)
    router.push('/cart');
  }

  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <ProductSlideshow
            images={product.images}
          />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Box display='flex' flexDirection='column'>
            <Typography variant="h1" component='h1'>{product.title}</Typography>
            <Typography variant="subtitle1" component='h2'>${product.price}</Typography>
            <Box sx={{my: 2}}>
              <Typography variant="subtitle2">Cantidad</Typography>
              <ItemCounter
                currentValue={tempCartProduct.quantity}
                updatedQuantity={onUpdateQuantity}
                maxValue={product.inStock > 5 ? 5 : product.inStock}
              />
              <SizeSelector
                selectedSize={tempCartProduct.size}
                sizes={product.sizes}
                onSelectedSize={selectedSize}
              />
            </Box>
            {
              (product.inStock > 0)
              ? (
                <Button color='secondary' className="circular-btn" onClick={onAddProduct}>
                  {
                    tempCartProduct.size
                    ?
                      'Agregar al carrito'
                    : 'Selecciona una talla'
                  }
                </Button>
              ) : (
                <Chip label='No hay disponibles' color='error' variant='outlined' />
              )
            }
            {/* <Chip label='No hay disponibles' color='error' variant='outlined' /> */}
            <Box sx={{mt: 3}}>
              <Typography variant='subtitle2'>Descripcion</Typography>
              <Typography variant='body2'>{product.description}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

// export const getServerSideProps: GetServerSideProps = async ({params}) => {
//   const {slug = ''} = params as {slug: string};
//   const product = dbProducts.getProductBySlug(slug)

//   if (!product) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//       }
//     }
//   }

//   return {
//     props: {
//       product
//     }
//   }
// }

export const getStaticPaths: GetStaticPaths = async (ctx) => {

  const productSlugs = await dbProducts.getAllProductsSlugs()

  return {
    paths: productSlugs.map(({slug}) => ({
      params: {
        slug
      }
    })),
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({params}) => {

  const {slug} = params as {slug: string};

  const product = await dbProducts.getProductBySlug(slug)

  if(!product) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      product
    },
    revalidate: 86400, // 60 * 60 * 24
  }
}

export default ProductPage