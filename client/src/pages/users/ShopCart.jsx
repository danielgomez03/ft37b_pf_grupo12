import axios from 'axios';
import { getCartByIdUser ,clean, modifyQuantity ,deleteProduct} from '@/redux/actions';
import React , { useEffect, useState }from 'react';
import { useSelector , useDispatch} from 'react-redux';

// let imagesArray = [];

// async function images() {
//   try {
//     const response = await axios.get("http://localhost:3001/images/products");
//     imagesArray = response.data;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// }

// async function fetchData() {
  
//     await images();
//     // ShopCart(imagesArray)
// }

// // fetchData();
// console.log(imagesArray)







function  ShopCart() {
  // console.log(imagesArray)
  // id de usuario hardcodeado
  const id = "ac5b18b6-6383-4a9f-8e4c-65ad3c93b81a";
  const dispatch = useDispatch();
  const [imagesArray, setImagesArray] = useState([]);
  useEffect(() => {
    
    if (id) {
      dispatch(getCartByIdUser(id));
     
    }
    async function fetchImages() {
      try {
        const response = await axios.get("http://localhost:3001/images/products");
        setImagesArray(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchImages();
   dispatch(clean())
  }, [dispatch, id]);

 const cart = useSelector(state=>state.cartUser)
  console.log(cart)
 
  const calculateTotalProducts = (cart) => {
    let totalProducts = 0;
    for (const product of cart) {
      totalProducts += product.quantity;
    }
    return totalProducts;
  };
  
  const calculateTotalPrice = (cart) => {
    let totalPrice = 0;
    for (const product of cart) {
      const price = parseFloat(product.product.price);
      const quantity = parseInt(product.quantity);
      totalPrice += price * quantity;
    }
    return totalPrice.toFixed(2);
  };
console.log(imagesArray)
  return (
    <div className="border border-gray-300 rounded">
  {cart.length === 0 ? (
    <p>Your cart is empty.</p>
  ) : (
    <ul className="divide-y divide-gray-300">
      {cart.map((product) => {
        console.log(product.productId)
       const image = imagesArray.find((item) => item.productId === product.productId);
        console.log(image)
         return(
        <li key={product.cartId} className="flex items-center py-4">
          
          <img
            src={image ? image.url : ''}
            alt={product.product.name}
            className="w-16 h-16 object-contain mr-4"
          />
          {console.log(imagesArray)}
          <div className="flex-1">
            <h3 className="text-lg font-semibold">{product.product.name}</h3>
            <div className="flex justify-between items-center">
              <div>
                <label htmlFor={`quantity-${product.cartId}`} className="mr-2">
                  Quantity:
                </label>
                <select
                  id={`quantity-${product.cartId}`}
                  className="border border-gray-300 rounded px-2 py-1"
                  value={product.quantity}
                  onChange={(e) => (
                    dispatch(modifyQuantity({
                    userId: id,
                    productId: product.productId,
                    quantity: e.target.value
                  })).then(() => {
                    dispatch(getCartByIdUser(id));
                  })
      )}
                >
                  {[...Array(product.product.stock)].map((_, index) => (
                    <option key={index} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </select>
              </div>
              <span className="font-bold">${product.product.price}</span>
              <button onClick={()=>{ dispatch(deleteProduct({
	userId: id,
	productId: product.productId
})).then(() => {
  dispatch(getCartByIdUser(id));
})

}}>delete</button>
            </div>
          </div>
        </li>
      )}
      )}
    </ul>
  )}
<div className="flex justify-between items-center mt-4">
        <div>
          <span className="font-bold">Total Products:</span>{" "}
          <span>{calculateTotalProducts(cart)}</span>
        </div>
        <div>
          <span className="font-bold">Total Price:</span>{" "}
          <span>${calculateTotalPrice(cart)}</span>
        </div>
      </div>

</div>
  );
}

export default ShopCart;