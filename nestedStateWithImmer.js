const redux = require("redux");
const produce = require("immer").produce;

const AREA_UPDATED = "AREA_UPDATED";

const initialState = {
  name: "Tejas",
  address: {
    street: {
      area: "ABC",
      building: "QWE",
    },
    city: "Thane",
    country: "India",
  },
};

const updateArea = (area) => {
  return {
    type: AREA_UPDATED,
    payload: area,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AREA_UPDATED:
      //   return {
      //     ...state,
      //     address: {
      //       ...state.address,
      //       street: {
      //         ...state.address.street,
      //         area: action.payload,
      //       },
      //     },
      //   };

      return produce(state, (draft) => {
        draft.address.street.area = action.payload;
      });

    default:
      return state;
  }
};

const store = redux.createStore(reducer);
console.log(`Intial State`, store.getState());
const unSubscribe = store.subscribe(() =>
  console.log(`Updated State`, store.getState())
);

store.dispatch(updateArea("DEF"));
unSubscribe();
