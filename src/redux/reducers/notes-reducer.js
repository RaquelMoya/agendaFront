import {NOTE_DETAIL, NOTES_TITLE, LOGOUT} from '../types';

const initialState = {
    note: {},
    notes: []
};

const noteReducer = (state = initialState, action) => {
    switch(action.type){
        //GUARDO EN EL ESTADO LOS DATOS DEL USUARIO LOGUEADO
        case NOTE_DETAIL :
            return {...state, note: action.payload};

        case NOTES_TITLE :
            return {...state, notes: action.payload};
       
        case LOGOUT :
            return initialState;

        default :
            return state
    }
}

export default noteReducer;