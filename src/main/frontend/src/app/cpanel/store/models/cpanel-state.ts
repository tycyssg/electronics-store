import * as Root from '../../../store/model/root.state';
import { CategoryState } from './category-state';

export interface CpanelState extends Root.State {
  categories: CategoryState;
}
