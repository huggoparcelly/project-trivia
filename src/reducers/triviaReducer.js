const initialState = {
  results: [{
    category: 'Carregando',
    question: 'Carregando',
    correct_answer: 'Carregando',
    incorrect_answers: ['Carregando'],
  }],
};

function trivia(state = initialState, action) {
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

export default trivia;
