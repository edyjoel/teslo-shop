import { Grid, Typography, CardActionArea, Link, CardMedia, Box, Button } from '@mui/material';
import { initialData } from '../../database/seed-data';
import NextLink from 'next/link';
import { ItemCounter } from '../ui';
import { FC, useContext } from 'react';
import { CartContext } from '../../context';
import { ICartProduct } from '../../interfaces/cart';
import { IOrderItem } from '../../interfaces';

interface Props {
  editable?: boolean;
  products?: IOrderItem[];
}

export const CartList:FC<Props> = ({editable = false, products}) => {
  const {cart, updateCartQuantity, removeCartProduct} = useContext(CartContext);

  const onNewCartQuantityValue = (product: ICartProduct, newQuantityValue: number) => {
    product.quantity = newQuantityValue;
    updateCartQuantity(product);
  }

  const productsToShow = products ? products : cart;

  return (
    <>
      {
        productsToShow.map(product => (
          <Grid container spacing={2} key={product.slug + product.size}>
            <Grid item xs={3}>
              <NextLink href={`/product/${product.slug}`} passHref>
                <Link>
                  <CardActionArea>
                    <CardMedia
                      image={`/products/${product.image}`}
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
                <Typography variant='body1'>Talla: <strong>{product.size}</strong></Typography>
                {
                  editable
                  ? (
                    <ItemCounter currentValue={product.quantity} updatedQuantity={(value) => onNewCartQuantityValue(product as ICartProduct, value)} maxValue={10}
                    />
                    )
                  : (
                    <Typography variant='h6'>{product.quantity} {product.quantity > 1 ? 'productos' : 'producto'}</Typography>
                    )
                }
                {/* <ItemCounter currentValue={0} updatedQuantity={function (value: number): void {
                  throw new Error('Function not implemented.');
                } } maxValue={0} /> */}
              </Box>
            </Grid>
            <Grid item xs={2} display='flex' alignItems='center' flexDirection='column'>
              <Typography variant='subtitle1'>$ {product.price}</Typography>
              {
                editable && (
                  <Button variant='text' color='secondary'
                  onClick={() => removeCartProduct(product as ICartProduct)}
                  >
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