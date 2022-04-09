import {TASK_DETAIL, TASKS_TITLE, LOGOUT} from '../types';

const initialState = {
    task: {},
    tasks: []
};

const taskReducer = (state = initialState, action) => {
    switch(action.type){
        //GUARDO EN EL ESTADO LOS DATOS DEL USUARIO LOGUEADO
        case TASK_DETAIL :
            return {...state, task: action.payload};

        case TASKS_TITLE :
            return {...state, tasks: action.payload};
       
        case LOGOUT :
            return initialState;

        default :
            return state
    }
}

export default taskReducer;