import { v4 as uuidv4 } from 'uuid';

export const setAlert = (msg, alertType) => {
    const id = uuidv4();
    return {
        type: 'SET_ALERT',
        payload: { msg, alertType, id }
    }

}

export const removeAlert = (id) => {
    return {
        type: 'REMOVE_ALERT',
        payload: id
    }
}