import { IData } from "./iData.interface";

export interface ITeacherInfoInterface {
  id: number;
  name: string;
  last_names: string;
  phone: string;
  email: string;
  username: string;
  image: string;
  role: number;
  latitude: number;
  longitude: number;
  description: string;
  price_hour: number;
  knowledge_branches: IData[];
  active: boolean;
  average_rating: number;
}
