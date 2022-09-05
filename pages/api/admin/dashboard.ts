import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { Order, Product, User } from '../../../models';

type Data = {
  numberOfOrders: number;
  paidOrders: number;
  notPaidOrders: number; // isPaid: true
  numberOfClients: number; // role: client
  numberOfProducts: number;
  productsWithNoInventory: number; // 0
  lowInventory: number; // productos con menos de 10 unidades
}

export default async function handler (req: NextApiRequest, res: NextApiResponse<Data>) {

  // const orders = await getOrders();
  // const numberOfOrders = orders.length;
  // const paidOrders = orders.filter(order => order.isPaid).length;
  // const notPaidOrders = orders.filter(order => !order.isPaid).length;

  // const numberOfClients = orders.map(order => order.user).length;

  // const products = await getProducts();
  // const numberOfProducts = products.length;

  // const productsWithNoInventory = products.filter(product => product.inStock === 0).length;
  // const lowInventory = products.filter(product => product.inStock < 10).length;

  await db.connect();

  // const numberOfOrders = await Order.count();
  // const paidOrders = await Order.count({isPaid: true});
  // const numberOfClients = await User.find({role: 'client'}).count();
  // const numberOfProducts = await Product.count();
  // const productsWithNoInventory = await Product.count({inStock: 0});
  // const lowInventory = await Product.count({inStock: {$lte: 10}});

  const [
    numberOfOrders,
    paidOrders,
    numberOfClients,
    numberOfProducts,
    productsWithNoInventory,
    lowInventory
  ] = await Promise.all([
    Order.count(),
    Order.count({isPaid: true}),
    User.find({role: 'client'}).count(),
    Product.count(),
    Product.count({inStock: 0}),
    Product.count({inStock: {$lte: 10}})
  ]);

  await db.disconnect();


  res.status(200).json({
    numberOfOrders: numberOfOrders,
    paidOrders: paidOrders,
    notPaidOrders: numberOfOrders - paidOrders,
    numberOfClients: numberOfClients,
    numberOfProducts: numberOfProducts,
    productsWithNoInventory: productsWithNoInventory,
    lowInventory: lowInventory
  })
}