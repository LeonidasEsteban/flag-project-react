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



const [useStore] = create(set => ({
  ...initialState,
  fetchCountryList: async () => {
    const response = await fetch('https://restcountries.eu/rest/v2/all');
    // console.log('response =>', response);
    const countryList = await response.json();
    set({ countryList, filteredCountries: countryList })},
  filterByRegion: region => {
    console.log('filterByRegion region =>', region);
    set(state => {
      console.log('state =>', state);
      const countryFilteredByRegion = state.countryList.filter((country) => country.region === region);
      console.log('countryFilteredByRegion =>', countryFilteredByRegion);

      return { filteredCountries: countryFilteredByRegion, filterByRegion: region }
    })
  },
  reset: () => set({ count: 0 })
}))

export default useStore;