const redux = require("redux");
const createStore = redux.createStore;
const CAKE_ORDERED = "CAKE_ORDERED";

const initialState = {
  noOfCakes: 10,
};

const cakeOrder = () => {
  return {
    type: CAKE_ORDERED,
    quatity: 1,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return { ...state, noOfCakes: state.noOfCakes - 1 };
    default:
      return state;
  }
};

const store = createStore(reducer);
console.log(`Initial state`, store.getState());

const unsubscribed = store.subscribe(() =>
  console.log(`Update state`, store.getState())
);

store.dispatch(cakeOrder());
store.dispatch(cakeOrder());
store.dispatch(cakeOrder());

unsubscribed();
