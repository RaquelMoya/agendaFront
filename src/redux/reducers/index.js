
import {combineReducers} from 'redux';

import credentials from './datosLogin-reducer';
import task from './tasks-reducer';
import note from './notes-reducer';
import contact from './contacts-reducer';


const rootReducer = combineReducers({
    credentials,
    task,
    note,
    contact
});

export default rootReducer;