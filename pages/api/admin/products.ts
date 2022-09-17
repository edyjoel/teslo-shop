import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { IProduct } from '../../../interfaces';
import { Product } from '../../../models';
import { isValidObjectId } from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';

type Data =
| {message: string}
| IProduct[]
| IProduct

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  switch (req.method) {
    case 'GET':
      return getProducts(req, res);
    case 'POST':
      return createProduct(req, res);
    case 'PUT':
      return updateProduct(req, res);
    default:
      return res.status(400).json({ message: 'Bad request' })
  }

}

const getProducts = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();
  const products = await Product.find()
    .sort({ title: 'asc' })
    .lean();
  await db.disconnect();

  const updatedProducts = products.map(product => {
    product.images = product.images.map(image => {
      return image.includes('http') ? image : `${process.env.HOST_NAME}/products/${image}`
    });

    return product;
  })

  res.status(200).json(updatedProducts);
}
const updateProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

  const {_id = '', images = []} = req.body as IProduct;

  if(isValidObjectId(_id)) {
    return res.status(400).json({ message: 'El id del producto no es valido' })
  }

  if(images.length < 2) {
    return res.status(400).json({ message: 'El producto debe tener al menos 2 imagenes' })
  }

  try {
    await db.connect();
    const product  = await Product.findById(_id);

    if(!product) {
      await db.disconnect();
      return res.status(400).json({ message: 'El producto no existe' })
    }

    product.images.forEach( async(image) => {
      if(!images.includes(image)) {
        const [fileId, extension] = image.substring(image.lastIndexOf('/') + 1).split('.');
        await cloudinary.uploader.destroy(fileId);
      }
    })

    await product.update(req.body);
    await db.disconnect();

    return res.status(200).json(product)
  } catch (error) {
    await db.disconnect();
    return res.status(400).json({ message: 'Error al actualizar el producto' })
  }

}

const createProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const {images = []} = req.body as IProduct;

  if(images.length < 2) {
    return res.status(400).json({ message: 'El producto debe tener al menos 2 imagenes' })
  }

  try {
    await db.connect();

    const productInDB = await Product.findOne({ slug: req.body.slug });

    if(productInDB) {
      await db.disconnect();
      return res.status(400).json({ message: 'El producto ya existe' })
    }

    const product = await Product.create(req.body);
    await product.save();
    await db.disconnect();

    return res.status(200).json(product)
  } catch (error) {
    await db.disconnect();
    return res.status(400).json({ message: 'Error al crear el producto' })
  }
}