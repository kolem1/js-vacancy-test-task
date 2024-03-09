import { AppKoaContext, AppRouter, CartProductDto } from 'types';

import { cartProductService } from 'resources/cart-product';
import { productService } from 'resources/product';

async function handler(ctx: AppKoaContext) {
  const { user } = ctx.state;

  const cartProducts = await cartProductService.find({
    ownerId: user._id,
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

  ctx.body = {
    results: filteredResults,
    totalBill: filteredResults.reduce((acc, { price, quantity }) => acc + price * quantity, 0),
  };
}

export default (router: AppRouter) => {
  router.get('/', handler);
};
