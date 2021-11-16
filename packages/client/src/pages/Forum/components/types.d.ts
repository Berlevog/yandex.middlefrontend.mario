export type UserProps = {
  avatar?: string;
  name: string;
};

export type ThreadProps = {
  id: number;
  title: string;
  content: string;
  date: string;
  user: UserProps;
};

export type PostProps = {
  id: number;
  threadId: number;
  content: string;
  date: string;
  user: UserProps;
};
