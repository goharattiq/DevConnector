const initialState = {
  token:localStorage.getItem('token'),
  isAuthenticated: false,
  loading:true,
  user:null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'CURRENT_USER':
        return {
            ...state,
            isAuthenticated: true,
            loading:false,
            user:action.payload 
    }
    case 'REGISTER_SUCCESS':
      case 'LOGIN_SUCCESS':
        localStorage.setItem('token',action.payload.token);    
      return {
        ...state,
       ...action.payload,
        isAuthenticated: true,
        loading:false 
      };
      case 'REGISTER_FAIL':
        case 'AUTH_ERROR':
          case 'LOGIN_FAIL':
            case 'LOG_OUT':
              case 'ACCOUNT_DELETED':
        localStorage.removeItem('token');    
      return {
        ...state,
        token:null,
        isAuthenticated: false,
        loading:false 
      };
    default:
      return state;
  }
}
