// cartReducer.js
import { ADD_ITEM, REMOVE_ITEM, CLEAR_CART } from './CartActions';

const initialState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM: {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      let updatedItems;
      if (!existingItem) {
        updatedItems = [...state.items, { ...newItem, quantity: 1 }];
      } else {
        updatedItems = state.items.map((item) =>
          item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      return {
        ...state,
        items: updatedItems,
        totalAmount: state.totalAmount + newItem.price,
      };
    }
    case REMOVE_ITEM: {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      let updatedItems;
      if (existingItem.quantity === 1) {
        updatedItems = state.items.filter((item) => item.id !== id);
      } else {
        updatedItems = state.items.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        );
      }

      return {
        ...state,
        items: updatedItems,
        totalAmount: state.totalAmount - existingItem.price,
      };
    }
    case CLEAR_CART:
      return initialState;
    default:
      return state;
  }
};

export default cartReducer;
