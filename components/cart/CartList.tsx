import { Grid, Typography, CardActionArea, Link, CardMedia, Box, Button } from '@mui/material';
import { initialData } from '../../database/products';
import NextLink from 'next/link';
import { ItemCounter } from '../ui';
import { FC } from 'react';

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
]

interface Props {
  editable?: boolean;
}

const CartList:FC<Props> = ({editable = false}) => {
  return (
    <>
      {
        productsInCart.map(product => (
          <Grid container spacing={2} key={product.slug}>
            <Grid item xs={3}>
              <NextLink href='/product/slug' passHref>
                <Link>
                  <CardActionArea>
                    <CardMedia
                      image={`/products/${product.images[0]}`}
                      component='img'
                      sx={{borderRadius: '5px'}}
                    />
                  </CardActionArea>
                </Link>
              </NextLink>
            </Grid>
            <Grid item xs={7}>
              <Box display='flex' flexDirection='column'>
                <Typography variant='body1'>{product.title}</Typography>
                <Typography variant='body1'>Talla: <strong>M</strong></Typography>
                {
                  editable
                  ? <ItemCounter />
                  : <Typography variant='h6'>3 items</Typography>
                }
                <ItemCounter />
              </Box>
            </Grid>
            <Grid item xs={2} display='flex' alignItems='center' flexDirection='column'>
              <Typography variant='subtitle1'>$ {product.price}</Typography>
              {
                editable && (
                  <Button variant='text' color='secondary'>
                    Remover
                  </Button>
                )
              }
            </Grid>
          </Grid>
        ))
      }
    </>
  )
}

export default CartList