var redux = require('redux');

console.log('Starting Redux Example');

var stateDefault = {
  name: 'Anonymous',
  hobbies: [],
  movies: []
};

var nextHobbyId = 1;
var nextMovieId = 1;

// OLD REDUCER: Works with the full state, and all functionality

// var oldReducer = (state = stateDefault, action) => {
//   //state = state || {name: 'Anonymous'};
//   switch (action.type) {
//     case 'CHANGE_NAME':
//       return {
//         ...state,
//         name: action.name
//       };
//     case 'ADD_HOBBY':
//       return {
//         ...state,
//         hobbies: [
//           ...state.hobbies,
//           {
//             id: nextHobbyId++,
//             hobby: action.hobby
//           }
//         ]
//       };
//     case 'REMOVE_HOBBY':
//         return {
//           ...state,
//           hobbies: state.hobbies.filter((hobby) => hobby.id !== action.id)
//         };
//     case 'ADD_MOVIE':
//         return {
//           ...state,
//           movies: [
//             ...state.movies,
//             {
//               id: nextMovieId++,
//               title: action.name,
//               genre: action.genre
//             }
//           ]
//         };
//     case 'REMOVE_MOVIE':
//         return {
//           ...state,
//           movies: state.movies.filter((movie) => movie.id !== action.id)
//         };
//     default:
//       return state;
//   }
// };

var nameReducer = (state = 'Anonymous', action) => {
  switch (action.type) {
    case 'CHANGE_NAME':
      return action.name;
    default:
      return state;
  }
};

var hobbiesReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_HOBBY':
      return [
          ...state,
          {
            id: nextHobbyId++,
            hobby: action.hobby
          }
        ];
    case 'REMOVE_HOBBY':
        return state.filter((hobby) => hobby.id !== action.id)
    default:
      return state;
  }
};

var moviesReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_MOVIE':
      return [
          ...state,
          {
            id: nextMovieId++,
            title: action.title,
            genre: action.genre
          }
        ];
    case 'REMOVE_MOVIE':
        return state.filter((movie) => movie.id !== action.id)
    default:
      return state;
  }
};

var reducer = redux.combineReducers({
  name: nameReducer,
  hobbies: hobbiesReducer,
  movies: moviesReducer
});

var store = redux.createStore(reducer, redux.compose(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

// Subscribe to Changes
var unsubscribe = store.subscribe(() => {
  var state = store.getState();

  console.log('Name is', state.name);
  console.log('New state', store.getState());
  document.getElementById('app').innerHTML = state.name;
});

//unsubscribe();

var currentState = store.getState();
console.log('currentState', currentState);

var action = {
  type: 'CHANGE_NAME',
  name: 'Steve'
};

store.dispatch(action);

store.dispatch({
  type: 'ADD_HOBBY',
  hobby: 'Running'
});

store.dispatch({
  type: 'ADD_HOBBY',
  hobby: 'Walking'
});

// Remove hobby
store.dispatch({
  type: 'REMOVE_HOBBY',
  id: 2
});

store.dispatch({
  type: 'ADD_MOVIE',
  title: 'Going out in style',
  genre: 'Comedy'
});

store.dispatch({
  type: 'ADD_MOVIE',
  title: 'Interstellar',
  genre: 'Thriller'
});

// Remove movie
store.dispatch({
  type: 'REMOVE_MOVIE',
  id: 2
});

store.dispatch({
  type: 'CHANGE_NAME',
  name: 'Marie Mifsud'
});
