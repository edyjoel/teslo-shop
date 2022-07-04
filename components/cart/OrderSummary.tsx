import { Grid, Typography } from "@mui/material"

export const OrderSummary = () => {
  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography variant="body1">No. Productos</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography variant="body1">3 items</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="body1">SubTotal</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography variant="body1">${`${105.45}`}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="body1">Impuestos (15%)</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography variant="body1">${`${35.45}`}</Typography>
      </Grid>
      <Grid item xs={6} sx={{mt:2}}>
        <Typography variant="subtitle1">Total:</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end' sx={{mt:2}}>
        <Typography variant='subtitle1'>${`${135.45}`}</Typography>
      </Grid>
    </Grid>
  )
}
