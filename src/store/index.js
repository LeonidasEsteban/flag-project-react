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
    console.log('filterByRegion =>', region);
    const { countryList } = get();
    const countryFilteredByRegion = countryList.filter((country) => country.region === region);

    set({ filteredCountries: countryFilteredByRegion })
  },
  filterByName: name => {
    console.log('filterByName =>', name);
    const { countryList } = get();
    const countryFilteredByName = countryList.filter(country => country.name.toLowerCase().includes(name.toLowerCase()))

    set({ filteredCountries: countryFilteredByName })
  }
  // reset: () => set({ count: 0 })
}))

export default useStore;