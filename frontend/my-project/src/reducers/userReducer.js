import { SET_USER } from "./userActions";

const initialState = {
  user: JSON.parse(localStorage.getItem("the_user")) || {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
