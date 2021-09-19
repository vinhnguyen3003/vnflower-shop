import { convertToCurrency } from "./currency-method";

export const calcTotalCart = (carts) => {
    let total = 0;
    carts.forEach(cart => {
        const {normalPrice, discountPrice} = cart.product.productPrice;
        total = total + (discountPrice !== 0 ? discountPrice : normalPrice)*cart.quantity;
    })
    return convertToCurrency(total);
}