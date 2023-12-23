const redux = require("redux");
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;

const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";

const orderCake = (qty = 1) => {
  return {
    type: CAKE_ORDERED,
    payload: qty,
  };
};

const restockCake = (qty = 1) => {
  return {
    type: CAKE_RESTOCKED,
    payload: qty,
  };
};

const initialState = {
  noOfCakes: 10,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return { ...state, noOfCakes: state.noOfCakes - action.payload };
    case CAKE_RESTOCKED:
      return { ...state, noOfCakes: state.noOfCakes + action.payload };
    default:
      return state;
  }
};

const store = createStore(reducer);
console.log(`Initial State`, store.getState());
const unSubscribe = store.subscribe(() =>
  console.log(`Updated State`, store.getState())
);

// store.dispatch(orderCake(2));
// store.dispatch(restockCake(5));

const actions = bindActionCreators({ orderCake, restockCake }, store.dispatch);
actions.orderCake(2);
actions.restockCake(3);

unSubscribe();
