// Register User
export const registerSueccess= ({token,user}) =>({
    type:   'REGISTER_SUCCESS',
    payload:{token,user}
})

export const registerFail=()=>({
    type:   'REGISTER_FAIL',   
})

export const setCurrentUser=user=>({
        type:   'CURRENT_USER',
        payload:user   
})

export const authError=()=>({
    type:'AUTH_ERROR'
})

export const loginSueccess= ({token,user}) =>({
    type:   'LOGIN_SUCCESS',
    payload:{token,user}
})

export const loginFail=()=>({
    type:   'LOGIN_FAIL',   
})

export const logout=()=>({
    type:   'LOG_OUT',   
})
