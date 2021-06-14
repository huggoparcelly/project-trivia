const initialStore = {
  user: {
    email: '',
    name: '',
  },
};

function loginReducer(state = initialStore, action) {
  switch (action.type) {
  case 'LOGIN':
    return {
      user: action.state,
    };
  default:
    return state;
  }
}

export default loginReducer;
