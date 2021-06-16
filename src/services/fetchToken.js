// const requestApiSuccess = (api) => ({
//   type: 'API_SUCCESS',
//   payload: {
//     api,
//   },
// });
// const requestApiFail = (error) => ({
//   type: 'API_FAIL',
//   payload: {
//     error,
//   },
// });

async function fetchAPI() {
  try {
    const tokenRequest = await fetch('https://opentdb.com/api_token.php?command=request');
    const tokenReturn = await tokenRequest.json()
      .then((response) => localStorage.setItem('token', response.token));
    localStorage.setItem('token', tokenReturn.token);
    // dispatch(requestApiSuccess());
  } catch (error) {
    // dispatch(requestApiFail(error));
  }
}

export default fetchAPI;
