export interface IPages {
  page: string;
  title: string;
  content: string;
}

export interface IPagesAPI {
  [id: string]: IPages;
}
