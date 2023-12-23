const axios = require("axios");
const redux = require("redux");
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const reduxThunk = require("redux-thunk");
const thunkMiddleware = reduxThunk.thunk;

const initialState = {
  loading: false,
  data: [],
  error: "",
};

const POST_FETCH_REQUESTED = "POST_FETCH_REQUESTED";
const POST_FETCH_SUCCESS = "POST_FETCH_SUCCESS";
const POST_FETCH_FAILURE = "POST_FETCH_FAILURE";

const postFetchRequested = () => {
  return {
    type: POST_FETCH_REQUESTED,
  };
};

const postFetchSuccess = (posts) => {
  return {
    type: POST_FETCH_SUCCESS,
    payload: posts,
  };
};

const postFetchFailure = (error) => {
  return {
    type: POST_FETCH_FAILURE,
    payload: error,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_FETCH_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case POST_FETCH_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        error: "",
      };
    case POST_FETCH_FAILURE:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

const fetchData = () => {
  return function (dispatch) {
    dispatch(postFetchRequested());
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        const posts = res.data.map((post) => post.title);
        dispatch(postFetchSuccess(posts));
      })
      .catch((error) => dispatch(postFetchFailure(error.message)));
  };
};

const store = createStore(reducer, applyMiddleware(thunkMiddleware));
store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(fetchData());
