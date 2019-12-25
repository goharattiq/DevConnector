import uuid from 'uuid';

export const setAlert =(msg,alertType)=>{
    const id = uuid.v4();
    return {
        type:'SET_ALERT',
        payload:{msg,alertType,id}
    }
    
}

export const removeAlert =(id)=>{
    return {
        type:'REMOVE_ALERT',
        payload: id
    }
}