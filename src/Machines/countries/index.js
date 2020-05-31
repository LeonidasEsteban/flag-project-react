import { Machine, assign } from "xstate";

// Context
export const initialContext = {
  countries: [],
};

// Services
const getCountries = async () => {
  const response = await fetch("https://restcountries.eu/rest/v2/all");
  const data = await response.json();
  return data;
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