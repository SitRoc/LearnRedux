var redux = require('redux');

console.log('Starting Redux Example');

// State Default used for OLD REDUCER

// var stateDefault = {
//   name: 'Anonymous',
//   hobbies: [],
//   movies: []
// };

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

// Name reducer and action generators
// ----------------------------------
var nameReducer = (state = 'Anonymous', action) => {
  switch (action.type) {
    case 'CHANGE_NAME':
      return action.name;
    default:
      return state;
  }
};

var changeName = (name) => {
  return {
    type: 'CHANGE_NAME',
    name
  }
};

// Hobbies reducer and action generators
// ----------------------------------
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

var addHobby = (hobby) => {
  return {
    type: 'ADD_HOBBY',
    hobby
  }
};

var removeHobby = (id) => {
  return {
    type: 'REMOVE_HOBBY',
    id
  }
};

// Movies reducer and action generators
// ----------------------------------
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

var addMovie = (title, genre) => {
  return {
    type: 'ADD_MOVIE',
    title,
    genre
  }
};

var removeMovie = (id) => {
  return {
    type: 'REMOVE_MOVIE',
    id
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

store.dispatch(changeName('Steve'));

store.dispatch(addHobby('Running'));

store.dispatch(addHobby('Walking'));

// Remove hobby
store.dispatch(removeHobby(2));

store.dispatch(addMovie('Going in Style', 'Comedy'));

store.dispatch(addMovie('Interstellar', 'Thriller'));

// Remove movie
store.dispatch(removeMovie(2));


store.dispatch(changeName('Marie Mifsud'));

// store.dispatch({
//   type: 'CHANGE_NAME',
//   name: 'Marie Mifsud'
// });
