// Modules
import { Machine, assign } from "xstate";

// Api
import api from '../../api';

// Context
export const initialContext = {
  countries: [],
  searchValue: '',
};

// Services
const getCountries = async (context) => {
  const { searchValue } = context;
  console.log(searchValue);
  if (searchValue !== '') {
     const data = await api.countries.getFilterCountries(searchValue);
     return data;
  } else {
    const data = await api.countries.getCountries();
    return data;
  }
};

// Actions
const saveUserData = assign({
  countries: (_, event) => event.data,
});

export const countriesMachine = Machine(
  {
    id: "countries",
    initial: "loading",
    context: initialContext,
    on: {
      UPDATE_SEARCH: {
        target: 'loading',
        cond: (context, event) =>
          context.searchValue !== event.search,
        actions: assign({
          searchValue: (_, event) => event.search,
        })
      },
    },
    states: {
      loading: {
        invoke: {
          src: getCountries,
          onDone: {
            target: "success",
            actions: "saveUserData",
          },
          onError: {
            target: "failure",
            actions: assign({ error: (context, event) => event.data }),
          },
        },
      },
      success: {},
      failure: {
        on: {
          RETRY: "loading",
        },
      },
    },
  },
  {
    actions: {
      saveUserData,
    },
    services: {
      getCountries,
    },
  }
);