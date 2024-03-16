import { cartProductService } from 'resources/cart-product';
import { productService } from 'resources/product';
import { CartHistoryProduct, CartProductDto } from 'types';

async function getFullCartProducts(userId:string) {
  const cartProducts = await cartProductService.find({
    ownerId: userId,
    isActive: true,
  });
  const results = await Promise.all(cartProducts.results.map<Promise<CartProductDto | null>>(async (product) => {
    const fullProduct = await productService.findOne({ _id: product.productId, isSold: false });
    
    if (!fullProduct) return null;

    return {
      id: product._id,
      title: fullProduct?.title,
      price: fullProduct?.price,
      imageUrl: fullProduct?.imageUrl,
      quantity: product.quantity,
      available: fullProduct.availableCount,
    };
  }));

  const filteredResults = results.filter((product): product is CartProductDto => product != null);

  return filteredResults;
}

function formatDate(date: Date | null): string {
  if (date == null) return 'Date is not set';

  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const year = String(date.getUTCFullYear());
  
  return `${day}.${month}.${year}`;
}

async function getCartHistoryProducts(userId: string) {
  const cartProducts = await cartProductService.find({
    ownerId: userId,
    isActive: false,
  }, {}, { sort: { soldDate: -1 } });


  const results = await Promise.all(cartProducts.results.map<Promise<CartHistoryProduct | null>>(async (product) => {
    const fullProduct = await productService.findOne({ _id: product.productId });
    
    if (!fullProduct) return null;

    return {
      id: product._id,
      title: fullProduct?.title,
      price: fullProduct?.price,
      imageUrl: fullProduct?.imageUrl,
      quantity: product.quantity,
      soldDate: formatDate(product.soldDate),
    };
  }));

  const filteredResults = results.filter((product): product is CartHistoryProduct => product != null);

  return filteredResults;
}

export default {
  getFullCartProducts,
  getCartHistoryProducts,
};