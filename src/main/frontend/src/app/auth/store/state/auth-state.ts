import * as Root from '../../../store/model/root.state';
import { AuthUserModel } from '../models/authUser.model';

export interface AuthState extends Root.State {
  authUser: AuthUserModel
}
