const initialState = {
  cartItems: ['items'],
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_ACTION": {
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    }
    case "DELETE_FROM_ACTION": {
      return {
        ...state,
        cartItems: state.cartItems.filter(obj => obj.id !== action.payload.id) 
      }; 
    }

    default:
      return state;
  }
};
