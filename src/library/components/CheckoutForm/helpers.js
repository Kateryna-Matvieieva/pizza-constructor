export const formatOrder = (order) => {
    const { 
      user,
      size,
      totalCoast,
      totalWeight,
      additional,
      fillings,
      sauces,
      base
    } = order;

    return {
        user,
        pizza: {
          size,
          totalCoast,
          totalWeight,
          ingridients: {
            base,
            fillings,
            sauces,
            additional,
          }
        }
      }
}