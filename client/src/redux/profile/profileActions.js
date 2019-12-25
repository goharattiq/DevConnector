export const currentProfile =(data)=>({
        type: "GET_PROFILE",
        payload: data
})

export const profileError =(msg,status)=>({
    type: "PROFILE_ERROR",
    payload: {msg,status}
})

export const clearProfile =()=>({
    type: "PROFILE_ERROR"
})

export const updateProfile=(data)=>({
    type: "UPDATE_PROFILE",
    payload: data
})

export const DeleteAccount=()=>({
    type: "ACCOUNT_DELETED"
})

export const getProfiles =(data)=>({
    type: "GET_PROFILES",
    payload: data
})

export const getRepos = (data)=>({
    type:"GET_REPOS",
    payload:data
})