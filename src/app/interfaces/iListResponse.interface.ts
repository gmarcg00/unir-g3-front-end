import {ITeacherInfoInterface} from "./iTeacherInfoInterface";

export interface IListResponseInterface {
  total: number;
  data: ITeacherInfoInterface[];
}
