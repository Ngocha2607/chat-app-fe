export interface UserProfile {
  username: string;
}

export interface AuthUser extends UserProfile {
  _id: string;
}
