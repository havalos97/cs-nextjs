export type BaseUserData = {
  firstName:   string;
  lastName:    string;
  profileLink: string;
}

export type FriendData = BaseUserData;

export type UserDataResponse = BaseUserData & {
  id:          number;
  email:       string;
  gender:      string;
  profilePic: string;
  friends:     FriendData[];
}

export type APIUserRequest = {
  params: {
    profileId: string
  }
};
