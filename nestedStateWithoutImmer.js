const redux = require("redux");
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;
const STREET_UPDATED = "STREET_UPDATED";

const updateStreet = (street) => {
  return {
    type: STREET_UPDATED,
    payload: street,
  };
};

const initialState = {
  name: "Tejas",
  address: {
    street: 123,
    city: "Thane",
    country: "India",
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case STREET_UPDATED:
      return {
        ...state,
        address: {
          ...state.address,
          street: action.payload,
        },
      };
    default:
      return state;
  }
};

const store = createStore(reducer);
console.log(`Intial state`, store.getState());
const unSubscribe = store.subscribe(() =>
  console.log(`Updated State`, store.getState())
);

const actions = bindActionCreators({ updateStreet }, store.dispatch);
actions.updateStreet(456);
unSubscribe();
