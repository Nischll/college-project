export const ADD_ITEM = 'ADD_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const CLEAR_CART = 'CLEAR_CART';

export const addItem = (item) => ({
  type: ADD_ITEM,
  payload: item,
}); 

export const removeItem = (id) => ({
  type: REMOVE_ITEM,
  payload: id,
});
export const clearCart = () => ({
  type: CLEAR_CART,
});