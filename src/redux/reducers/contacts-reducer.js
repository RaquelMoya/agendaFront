import {CONTACT_DETAIL, CONTACTS_NAME, LOGOUT} from '../types';

const initialState = {
    contact: {},
    contacts: []
};

const contactReducer = (state = initialState, action) => {
    switch(action.type){
        //GUARDO EN EL ESTADO LOS DATOS DEL USUARIO LOGUEADO
        case CONTACT_DETAIL :
            return {...state, contact: action.payload};

        case CONTACTS_NAME :
            return {...state, contacts: action.payload};
       
        case LOGOUT :
            return initialState;

        default :
            return state
    }
}

export default contactReducer;