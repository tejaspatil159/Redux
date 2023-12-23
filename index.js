const redux = require("redux");
const CreateStore = redux.createStore;
const CAKE_ORDERED = "CAKE_ORDERED";

const initialState = {
  noOfCakes: 10,
};

const OrderCake = () => {
  return {
    type: CAKE_ORDERED,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return { noOfCakes: state.noOfCakes - 1 };
    default:
      return state;
  }
};

const store = CreateStore(reducer);
console.log(`Initial State`, store.getState());

const unSubscribe = store.subscribe(() =>
  console.log(`Updated State`, store.getState())
);

store.dispatch(OrderCake());
unSubscribe();
