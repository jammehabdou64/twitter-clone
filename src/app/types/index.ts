export type UserStateType = {
  user: {};
};

export type UserActionType = {
  type: string;
  payload: any;
};

export type PostStateType = {
  posts: Array<any>;
  post: {} | any;
  loading?: boolean;
};

export type PostActionType = {
  type: string;
  payload: any;
};

export type ModalType = {
  showModal: boolean;
  post: any;
};

export type ModalActionType = {
  type: string;
  payload: any;
};
