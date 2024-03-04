export const getInitialState = async (
  fetchPreloadedState?: () => Promise<object>
) => {
  let loadedState;
  if (fetchPreloadedState) {
    loadedState = await fetchPreloadedState();
  }

  return {
    user: {
      currentUser: null,
      status: 'initial',
    },
    game: {
      currentStatus: 'start',
    },
    theme: {
      mode: 'light',
    },
    ...loadedState,
  };
};
