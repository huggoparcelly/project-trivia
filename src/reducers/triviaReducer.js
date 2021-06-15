const initialState = {
  trivia: {},
}

function triviaReducer (state = initialState, action) {
  switch (action.type) {
    case 'RECEIVE_TRIVIA':
      return {
        ...state,
        trivia: action.state,
      };
  
    default:
      return state;
  }
}