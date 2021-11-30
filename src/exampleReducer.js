export const nameReducer = (state = "Neoito", action) => {
  switch (action.type) {
    case "NAME_CHANGE":
      return action.payload;
    default:
      return state;
  }
}
