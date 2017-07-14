var redux = require('redux');

console.log('Starting Redux Example');

var stateDefault = {
  searchText: '',
  showCompleted: false,
  todos: []
};

var reducer = (state = stateDefault, action) => {
  //state = state || {name: 'Anonymous'};
  switch (action.type) {
    case 'CHANGE_SEARCH_TEXT':
      return {
        ...state,
        searchText: action.searchText
      };
    default:
      return state;
  }
  return state;
};
var store = redux.createStore(reducer);

var currentState = store.getState();
console.log('currentState', currentState);

var action = {
  type: 'CHANGE_SEARCH_TEXT',
  searchText: 'Steve'
};

store.dispatch(action);

console.log('Search Text should be steve', store.getState());
