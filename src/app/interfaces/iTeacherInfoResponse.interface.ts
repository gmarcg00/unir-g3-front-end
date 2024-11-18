import {IData} from "./iData.interface";

export interface ITeacherInfoResponseInterface{
  id: number;
  name: string;
  last_names: string;
  phone: string;
  email: string;
  username: string;
  image: string;
  role: number;
  description: string;
  price_hour: number;
  knowledge_branches: IData[];
}
