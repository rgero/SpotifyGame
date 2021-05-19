// This is the spotify reducer
const spotifyReducerDefaultState = {
  token: ""
};
const spotifyReducer = (state = spotifyReducerDefaultState, action) => {
    switch(action.type){
        case "SET_TOKEN":
          return {
            ...state,
            token: action.newToken
          }
        case "SET_EXTENDED":
          return {
            ...state,
            extended: action.extended
          }
        default:
            return state;
    }
};

export default spotifyReducer;