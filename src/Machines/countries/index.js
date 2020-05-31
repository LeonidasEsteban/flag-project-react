import { Machine, assign } from "xstate";

// Context
const context = {
  countries: [],
};

// Services
const getData = async () => {
  const countries = await fetch("https://restcountries.eu/rest/v2/all");
  const data = await countries.json();
  return data;
};

// Actions

const saveUserData = assign({
  countries: (_, event) => event.data,
});

const countriesMachine = Machine(
  {
    id: "countries",
    initial: "loading",
    context: context,
    states: {
      loading: {
        invoke: {
          src: getData,
          onDone: {
            target: "success",
            actions: ["saveUserData"],
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
      getData,
    },
  }
);

export default countriesMachine;