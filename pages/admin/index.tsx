import { AttachmentOutlined, AttachMoneyOutlined, CreditCardOffOutlined, CreditCardOutlined, DashboardOutlined, GroupOutlined, CategoryOutlined, CancelPresentationOutlined, ProductionQuantityLimitsOutlined, AccessTimeOutlined } from '@mui/icons-material';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { SummaryTile } from '../../components/admin';
import { AdminLayout } from '../../components/layouts/AdminLayout';
import { DashboardSummaryResponse } from '../../interfaces/dashboard';
const DashboardPage = () => {

  const {data, error} = useSWR<DashboardSummaryResponse>('/api/admin/dashboard', { refreshInterval: 30 * 1000 });

  const [refreshIn, setRefreshIn] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshIn(refreshIn => refreshIn > 0 ? refreshIn - 1 : 30);
    }, 1000);

    return () => clearInterval(interval);
  }, [])

  if(!error && !data) {
    return <></>
  }

  if(error) {
    console.log(error);
    return <Typography variant="h1">Error</Typography>
  }

  const {
    numberOfOrders,
    paidOrders,
    numberOfClients,
    numberOfProducts,
    productsWithNoInventory,
    lowInventory,
    notPaidOrders,
  } = data!;

  return (
    <AdminLayout
      title="Dashboard"
      subTitle="Estadísticas y datos de la tienda"
      icon={<DashboardOutlined />}
    >
      <Grid container spacing={2}>
        <SummaryTile title={numberOfOrders} subTitle='Ordenes totales' icon={<CreditCardOutlined color="secondary" sx={{fontSize: 40}} />}  />
        <SummaryTile title={paidOrders} subTitle='Ordenes pagadas' icon={<AttachMoneyOutlined color="success" sx={{fontSize: 40}} />}  />
        <SummaryTile title={notPaidOrders} subTitle='Ordenes pendientes' icon={<CreditCardOffOutlined color="error" sx={{fontSize: 40}} />}  />
        <SummaryTile title={numberOfClients} subTitle='Clientes' icon={<GroupOutlined color="primary" sx={{fontSize: 40}} />}  />
        <SummaryTile title={numberOfProducts} subTitle='Productos' icon={<CategoryOutlined color="warning" sx={{fontSize: 40}} />}  />
        <SummaryTile title={productsWithNoInventory} subTitle='Sin existencias' icon={<CancelPresentationOutlined color="error" sx={{fontSize: 40}} />}  />
        <SummaryTile title={lowInventory} subTitle='Bajo inventario' icon={<ProductionQuantityLimitsOutlined color="warning" sx={{fontSize: 40}} />}  />
        <SummaryTile title={8} subTitle='Actualización en:' icon={<AccessTimeOutlined color="secondary" sx={{fontSize: 40}} />}  />
      </Grid>
    </AdminLayout>
  )
}

export default DashboardPage

