export interface IChatInfoResponse {
  id: number;
  user: {
    id: number;
    name: string;
    last_names: string;
    image: string;
  }
}
