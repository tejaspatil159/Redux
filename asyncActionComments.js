const redux = require("redux");
const axios = require("axios");
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;
const applyMiddleware = redux.applyMiddleware;
const reduxThunk = require("redux-thunk");
const thunkMiddleware = reduxThunk.thunk;
const reduxLogger = require("redux-logger");
const createLogger = reduxLogger.createLogger();

const initialState = {
  loading: false,
  data: [],
  error: "",
};

const COMMENTS_FETCH_REQUESTED = "COMMENTS_FETCH_REQUESTED";
const COMMENTS_FETCH_SUCCESS = "COMMENTS_FETCH_SUCCESS";
const COMMENTS_FETCH_FAILURE = "COMMENTS_FETCH_FAILURE";

const commentsFetchRequested = () => {
  return {
    type: COMMENTS_FETCH_REQUESTED,
  };
};

const commentsFetchSuccess = (comments) => {
  return {
    type: COMMENTS_FETCH_SUCCESS,
    payload: comments,
  };
};

const commentsFetchFailure = (error) => {
  return {
    type: COMMENTS_FETCH_FAILURE,
    payload: error,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case COMMENTS_FETCH_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case COMMENTS_FETCH_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        error: "",
      };
    case COMMENTS_FETCH_FAILURE:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
  }
};

const fetchData = () => {
  return (dispatch) => {
    dispatch(commentsFetchRequested());
    axios
      .get("https://jsonplaceholder.typicode.com/comments")
      .then((res) => {
        const comments = res.data.map((comment) => comment.email);
        dispatch(commentsFetchSuccess(comments));
      })
      .catch((error) => dispatch(commentsFetchFailure(error.message)));
  };
};

const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware, createLogger)
);

store.subscribe(() => {});

const actions = bindActionCreators({ fetchData }, store.dispatch);
actions.fetchData();
