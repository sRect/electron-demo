export interface LoginStateTypes {
  token: string | null;
  username: string | null;
}

export const loginInitialState: LoginStateTypes = {
  token: null,
  username: null
}
