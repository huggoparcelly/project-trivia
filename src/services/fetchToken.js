const fetchAPI = () => async (dispatch) => {
  try {
    const tokenRequest = await fetch('https://opentdb.com/api_token.php?command=request');
    const tokenReturn = await tokenRequest.json();
    localStorage.setItem('token', tokenReturn.token);
    dispatch(requestApiSuccess());
  } catch (error) {
    dispatch(requestApiFail(error));
  }
};
export default fetchAPI;
