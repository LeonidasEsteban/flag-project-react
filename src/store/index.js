import create from "zustand";

const initialState = {
  countryList: [],
  filteredCountries: [],
  countryListByName: [],
  // coutryFilteredByRegion: [],
  // countryFilteredByRegion: [],
  // filterByRegion: '',
  latestSearch: '',
}



const [useStore] = create((set, get) => ({
  ...initialState,
  fetchCountryList: async () => {
    const response = await fetch('https://restcountries.eu/rest/v2/all');
    const countryList = await response.json();
    set({ countryList, filteredCountries: countryList })},
  filterByRegion: region => {
    const { countryList, filteredCountries } = get();
    let countryFilteredByRegion;

    if(filteredCountries.length) {
      countryFilteredByRegion = filteredCountries.filter((country) => country.region === region);
    } else {
      countryFilteredByRegion = countryList.filter((country) => country.region === region);
    }

    set({ filteredCountries: countryFilteredByRegion })
  },
  filterByName: name => {
    const { countryList, filteredCountries } = get();
    let countryFilteredByName;

    if(filteredCountries.length && name !== '') {
      countryFilteredByName = filteredCountries.filter(country => country.name.toLowerCase().includes(name.toLowerCase()));;
    } else {
      countryFilteredByName = countryList.filter(country => country.name.toLowerCase().includes(name.toLowerCase()));
    }

    set({ filteredCountries: countryFilteredByName })
  }
}))

export default useStore;