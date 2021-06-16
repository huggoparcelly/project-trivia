const initialState = {
  timerIsOver: false,
};

function timer(state = initialState, action) {
  switch (action.type) {
  case 'TIMER':
    return {
      timerIsOver: action.state,
    };
  default:
    return state;
  }
}

export default timer;
