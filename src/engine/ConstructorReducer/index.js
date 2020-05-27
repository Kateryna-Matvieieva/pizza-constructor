export const appInitialState = {
  recievedDataStatus: false,
  pizzaData: {
    size: ["small", "medium", "large"],
    sizeCM: { small: 25, medium: 30, large: 35 },
    ingridientsAmount: {
      fillings: { small: 10, medium: 15, large: 20 },
      minFillings: { small: 3, medium: 4, large: 5 },
      base: 1,
      sauces: 3,
      minSauces: 1,
      additional: 2,
    },
  },
};

export const APP_ACTIONS = {
  UPDATE_RECIEVED_DATA: "UPDATE_RECIEVED_DATA",
};

const ConstructorReducer = (prevState, action) => {
  switch (action.type) {
    case APP_ACTIONS.UPDATE_RECIEVED_DATA:
      return {
        ...prevState,
        ...action.payload,
        recievedDataStatus: true,
      };
    default:
      return prevState;
  }
};

export default ConstructorReducer;
