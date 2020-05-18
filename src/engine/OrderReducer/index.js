import {
  addIngridient,
  deleteIngridient,
  updateIngridient,
  reduceFillings,
  calculateTotals,
} from './helpers';

const initialState = {
  size: '',
  additional: [],
  fillings: [],
  sauces: [],
  additional: [],
  user: {},
};

export const orderInitialState = JSON.parse(localStorage.getItem('order')) || initialState;

export const ORDER_ACTIONS = {
  UPDATE_PIZZA_SIZE: 'UPDATE_PIZZA_SIZE',
  UPDATE_PIZZA_BASE: 'UPDATE_PIZZA_BASE',
  ADD_PIZZA_INGRIDIENT: 'ADD_PIZZA_INGRIDIENT',
  DELETE_PIZZA_INGRIDIENT: 'DELETE_PIZZA_INGRIDIENT',
  UPDATE_PIZZA_INGRIDIENT: 'UPDATE_PIZZA_INGRIDIENT',
  UPDATE_CHECKOUT: 'UPDATE_CHECKOUT',
  REDUCE_FILLINGS: 'REDUCE_FILLINGS',
  CLEAR_INGRIDIENTS: '',
};

const orderReducer = (prevState, action) => {
  const newState = (() => {
    let newState, totals;

    switch (action.type) {
      case ORDER_ACTIONS.UPDATE_PIZZA_SIZE:
        return {
          ...prevState,
          size: action.payload,
        };
      case ORDER_ACTIONS.UPDATE_PIZZA_BASE:

        return {
          ...prevState,
          base: [action.payload],
        };
      case ORDER_ACTIONS.ADD_PIZZA_INGRIDIENT:
        newState = addIngridient(prevState, action.payload);
        totals = calculateTotals({ ...prevState, ...newState });

        return {
          ...prevState,
          ...newState,
          ...totals,
        };
      case ORDER_ACTIONS.DELETE_PIZZA_INGRIDIENT:
        newState = deleteIngridient(prevState, action.payload);
        totals = calculateTotals({ ...prevState, ...newState });

        return {
          ...prevState,
          ...newState,
          ...totals,
        };
      case ORDER_ACTIONS.UPDATE_PIZZA_INGRIDIENT:
        newState = updateIngridient(prevState, action.payload);
        totals = calculateTotals({ ...prevState, ...newState });

        return {
          ...prevState,
          ...newState,
          ...totals,
        };
      case ORDER_ACTIONS.REDUCE_FILLINGS:
        newState = reduceFillings(prevState.fillings);
        totals = calculateTotals({ ...prevState, ...newState });

        return {
          ...prevState,
          ...newState,
          ...totals,
        };
      case ORDER_ACTIONS.UPDATE_CHECKOUT:
        return {
          ...prevState,
          user: action.payload,
        };
      case ORDER_ACTIONS.CLEAR_INGRIDIENTS:
        return {
          ...prevState,
          additional: [],
          fillings: [],
          sauces: [],
          
        }
      default:
        return prevState;
    }
  })();

  localStorage.setItem('order', JSON.stringify(newState));

  return newState;
};

export default orderReducer;
