export interface IPagesForm {
  title: string;
  content: string;
}

export interface IPages {
  id: string;
  title: string;
  content: string;
}

export interface IPagesAPI {
  [id: string]: IPages;
}
