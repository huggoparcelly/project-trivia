async function fetchTrivia() {
  const token = localStorage.getItem('token');
  const fetchApi = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const trivia = await fetchApi.json();
  return trivia;
}
export default fetchTrivia;
