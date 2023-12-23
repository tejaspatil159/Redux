const redux = require("redux");
const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
const bindActionCreators = redux.bindActionCreators;

const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";
const ICECREAM_ORDERED = "ICECREAM_ORDERED";
const ICECREAM_RESTOCKED = "ICECREAM_RESTOCKED";

const OrderCake = (qty = 1) => {
  return {
    type: CAKE_ORDERED,
    payload: qty,
  };
};

const RestockCake = (qty = 1) => {
  return {
    type: CAKE_RESTOCKED,
    payload: qty,
  };
};

const OrderIceCream = (qty = 1) => {
  return {
    type: ICECREAM_ORDERED,
    payload: qty,
  };
};

const RestockIceCream = (qty = 1) => {
  return {
    type: ICECREAM_RESTOCKED,
    payload: qty,
  };
};

const initialCakeState = {
  noOfCakes: 10,
};

const initialIceCreamState = {
  noOfIceCreams: 20,
};

const CakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return { ...state, noOfCakes: state.noOfCakes - action.payload };
    case CAKE_RESTOCKED:
      return { ...state, noOfCakes: state.noOfCakes + action.payload };
    default:
      return state;
  }
};

const IceCreamReducer = (state = initialIceCreamState, action) => {
  switch (action.type) {
    case ICECREAM_ORDERED:
      return { ...state, noOfIceCreams: state.noOfIceCreams - action.payload };
    case ICECREAM_RESTOCKED:
      return { ...state, noOfIceCreams: state.noOfIceCreams + action.payload };
    default:
      return state;
  }
};

const RootReducer = combineReducers({
  cake: CakeReducer,
  iceCream: IceCreamReducer,
});

const store = createStore(RootReducer);
console.log(`Initial state`, store.getState());
const unSubscribed = store.subscribe(() =>
  console.log(`Updated State`, store.getState())
);

const actions = bindActionCreators(
  { OrderCake, RestockCake, OrderIceCream, RestockIceCream },
  store.dispatch
);

actions.OrderCake();
actions.OrderCake();
actions.OrderCake();
actions.RestockCake(3);
actions.OrderIceCream();
actions.OrderIceCream();
actions.OrderIceCream();
actions.RestockIceCream(3);

unSubscribed();
