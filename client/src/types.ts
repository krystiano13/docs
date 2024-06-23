export interface Invite {
  id: number;
  user_id: number;
  document_id: number;
  role: string;
  title: string;
  user: string;
}

export interface File {
  id: number;
  title: string;
  shared: boolean;
  user?: string;
}
