const API_URL = 'https://api.thecatapi.com/v1';
const API_KEY =
  'api_key=live_R8yXM2pmEmMYDYYyD2j1Z3fcauA8fbDZpAJkZMWkXLEVleX8He2bTwC5TzofKpeo';

function fetchBreeds() {
  const url = `${API_URL}/breeds?${API_KEY}`;
  return fetch(url).then(res => res.json());
}

function fetchCatByBreed(breedId) {
  const url = `${API_URL}/images/search?${API_KEY}&breed_ids=${breedId}`;
  return fetch(url).then(res => res.json());
}

export { fetchBreeds, fetchCatByBreed };
