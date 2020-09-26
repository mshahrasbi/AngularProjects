import { InitialState } from '@ngrx/store/src/models';
import { User } from '../user.model';

export interface State {
    user: User;
}

const initialState: State = {
    user: null
};

export function authReducder(state = initialState, action)  {
    return state;
}
