import { cartProductService } from 'resources/cart-product';
import { productService } from 'resources/product';
import { CartProductDto } from 'types';

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

export default {
  getFullCartProducts,
};