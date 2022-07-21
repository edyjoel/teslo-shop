import { Box, Button, Chip, Grid, Typography } from "@mui/material"
import { ShopLayout } from "../../components/layouts"
import { ProductSlideshow } from '../../components/product/ProductSlideshow';
import { ItemCounter } from "../../components/ui";
import { SizeSelector } from "../../components/product";
import { IProduct } from "../../interfaces";
import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { dbProducts } from "../../database";

interface Props {
  product: IProduct
}

const ProductPage: NextPage<Props> = ({product}) => {

  // const router = useRouter()
  // const {products: product, isLoading} = useProducts(`/products/${router.query.slug}`)

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
              <ItemCounter />
              <SizeSelector
                selectedSize={product.sizes[0]}
                sizes={product.sizes}
              />
            </Box>
            <Button color='secondary' className="circular-btn">
              Agregar al carrito
            </Button>
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