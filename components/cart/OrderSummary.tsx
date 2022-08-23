import { Grid, Typography } from "@mui/material"
import { FC, useContext } from "react"
import { currency } from "../../utils"
import { CartContext } from "../../context"

interface Props {
  orderValues?: {
    numberOfItems: number;
    subTotal: number;
    total: number;
    tax: number;
  }
}

export const OrderSummary: FC<Props> = ({orderValues}) => {
  const {numberOfItems, subTotal, total, tax} = useContext(CartContext)

  const summaryValues = orderValues ? orderValues : {numberOfItems, subTotal, total, tax};

  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography variant="body1">No. Productos</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography variant="body1">{summaryValues.numberOfItems} {summaryValues.numberOfItems > 1 ? 'productos' : 'producto'}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="body1">SubTotal</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography variant="body1">{`${currency.format(summaryValues.subTotal)}`}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="body1">Impuestos ({Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100}%)</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography variant="body1">{`${currency.format(summaryValues.tax)}`}</Typography>
      </Grid>
      <Grid item xs={6} sx={{mt:2}}>
        <Typography variant="subtitle1">Total:</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end' sx={{mt:2}}>
        <Typography variant='subtitle1'>{`${currency.format(summaryValues.total)}`}</Typography>
      </Grid>
    </Grid>
  )
}
