const BASE_URL = "https://restcountries.eu/rest/v2";

const api = {
  countries: {
    async getCountries() {
      const response = await fetch(`${BASE_URL}/all`);
      const data = await response.json();
      return data;
    },
    async getFilterCountries(name) {
      const response = await fetch(`${BASE_URL}/name/${name}`);
      const data = await response.json();
      if (data.status === 404) {
        return Promise.reject();
      } else {
        return data;
      }
    },
  }
}

export default api;