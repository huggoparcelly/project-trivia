const initialState = {
  results: [{
    category: 'Carregando',
    question: 'Carregando',
    correct_answer: 'Carregando',
    incorrect_answers: ['Carregand'],
  }],
};

function trivia(state = initialState, action) {
  switch (action.type) {
  case 'RECEIVE_TRIVIA':
    return {
      ...state,
      results: action.state.results,
    };

  default:
    return state;
  }
}

export default trivia;
