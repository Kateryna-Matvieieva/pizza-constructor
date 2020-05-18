import _ from "lodash";

export const addIngridient = (prevState, newState) => {
  const key = Object.keys(newState)[0];
  const payload = newState[key];

  const value = prevState[key] ? [...prevState[key], payload] : [payload];

  return { [key]: value };
};

export const deleteIngridient = (prevState, newState) => {
  const key = Object.keys(newState)[0];
  const payload = newState[key];

  const value = [...prevState[key]].filter((item) => {
    return !_.isEqual(item, payload);
  });

  return { [key]: value };
};

export const updateIngridient = (prevState, newState) => {
  const key = Object.keys(newState.item)[0];
  const payload = newState.item[key];
  const { portion } = newState;

  const value = [...prevState[key]].filter((item) => {
    const { portion } = payload;
    return !_.isEqual({ ...item, portion }, payload);
  });

  return { [key]: [...value, { ...payload, portion }] };
};

const getCoast = (arr = []) => {
  return arr
    .map(({ price, portion = 1 }) => price * portion)
    .reduce((sum, item) => sum + item, 0);
};

const getWeight = (arr = []) => {
  return arr
    .map(({ weight, portion = 1 }) => weight * portion)
    .reduce((sum, item) => sum + item, 0);
};

export const calculateTotals = (newState) => {
  const totalCoast =
    getCoast(newState.base) +
    getCoast(newState.fillings) +
    getCoast(newState.sauces) +
    getCoast(newState.additional);

  const totalWeight =
    getWeight(newState.base) +
    getWeight(newState.fillings) +
    getWeight(newState.sauces) +
    getWeight(newState.additional);

  return { totalCoast, totalWeight };
};
export const reduceFillings = (fillings) => {
  fillings = fillings.sort((a, b) => b.portion - a.portion);
  fillings[0].portion = fillings[0].portion - 1;

  return  { fillings };
}