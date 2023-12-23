const redux = require("redux");
const createStore = redux.createStore;
const produce = require("immer").produce;
const reduxLogger = require("redux-logger");
const createLogger = reduxLogger.createLogger();
const applyMiddleware = redux.applyMiddleware;
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

const RestockCake = (qty) => {
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

const RestockIceCream = (qty) => {
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
      return produce(state, (draft) => {
        draft.noOfCakes = state.noOfCakes - action.payload;
      });
    case CAKE_RESTOCKED:
      return produce(state, (draft) => {
        draft.noOfCakes = state.noOfCakes + action.payload;
      });
    default:
      return state;
  }
};

const IceCreamReducer = (state = initialIceCreamState, action) => {
  switch (action.type) {
    case ICECREAM_ORDERED:
      return produce(state, (draft) => {
        draft.noOfIceCreams = state.noOfIceCreams - action.payload;
      });
    case ICECREAM_RESTOCKED:
      return produce(state, (draft) => {
        draft.noOfIceCreams = state.noOfIceCreams + action.payload;
      });
    default:
      return state;
  }
};

const RootReducer = redux.combineReducers({
  cake: CakeReducer,
  iceCream: IceCreamReducer,
});

const store = createStore(RootReducer, applyMiddleware(createLogger));
console.log(`Initial state`, store.getState());
const unSubscribe = store.subscribe(() => {});

const actions = bindActionCreators(
  { OrderCake, RestockCake, OrderIceCream, RestockIceCream },
  store.dispatch
);
actions.OrderCake();
actions.RestockCake(10);
actions.OrderIceCream();
actions.RestockIceCream(10);
unSubscribe();
