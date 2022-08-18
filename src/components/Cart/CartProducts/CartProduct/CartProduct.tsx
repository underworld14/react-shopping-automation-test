import formatPrice from 'utils/formatPrice';
import { ICartProduct } from 'models';

import { useCart } from 'contexts/cart-context';

import * as S from './style';

interface IProps {
  product: ICartProduct;
}
const CartProduct = ({ product }: IProps) => {
  const { removeProduct, increaseProductQuantity, decreaseProductQuantity } =
    useCart();
  const {
    sku,
    title,
    price,
    style,
    currencyId,
    currencyFormat,
    availableSizes,
    quantity,
  } = product;

  const handleRemoveProduct = () => removeProduct(product);
  const handleIncreaseProductQuantity = () => increaseProductQuantity(product);
  const handleDecreaseProductQuantity = () => decreaseProductQuantity(product);

  return (
    <S.Container data-cy="cart-product-item">
      <S.DeleteButton
        onClick={handleRemoveProduct}
        title="remove product from cart"
        data-cy="remove-item"
      />
      <S.Image
        src={require(`static/products/${sku}-1-cart.webp`)}
        alt={title}
      />
      <S.Details>
        <S.Title>{title}</S.Title>
        <S.Desc>
          {`${availableSizes[0]} | ${style}`} <br />
          Quantity: <span data-cy="cart-item-quantity">{quantity}</span>
        </S.Desc>
      </S.Details>
      <S.Price>
        <p>
          {currencyFormat}{' '}
          <span data-cy="cart-item-price">
            {formatPrice(price, currencyId)}
          </span>
        </p>
        <div>
          <S.ChangeQuantity
            data-cy="decrease-quantity"
            onClick={handleDecreaseProductQuantity}
            disabled={quantity === 1 ? true : false}
          >
            -
          </S.ChangeQuantity>
          <S.ChangeQuantity
            data-cy="increase-quantity"
            onClick={handleIncreaseProductQuantity}
          >
            +
          </S.ChangeQuantity>
        </div>
      </S.Price>
    </S.Container>
  );
};

export default CartProduct;
