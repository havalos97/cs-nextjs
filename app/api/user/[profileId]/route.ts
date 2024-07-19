import { NextRequest, NextResponse } from 'next/server';
import * as jsonUserList from '../../mockaroo_user_list.json';
import { APIUserRequest, FriendData } from '@/types/types';
import HttpStatusCode from '@/utils/HttpStatusCodes';
import { getValue } from '@/utils/ObjectUtils';
const userList = Array.from(jsonUserList);

export async function GET (_: NextRequest, { params }: APIUserRequest) {
  const { profileId } = params;
  if (isNaN(+profileId)) {
    return NextResponse.json(
      new Error('Invalid profileId'),
      {
        status: HttpStatusCode.FORBIDDEN,
      },
    );
  }

  const user = userList.find((user) => user.id === +profileId);
  if (!user) {
    return NextResponse.json(
      new Error('User not found'),
      {
        status: HttpStatusCode.I_AM_A_TEAPOT,
      },
    );
  }

  const friendList = user.friends.reduce((friends, friendId) => {
    const friendData = userList.find((user) => user.id === friendId);
    // Use of reduce instead of concatenating .filter().map() to avoid traversing the object multiple times
    if (friendData) {
      friends.push({
        firstName: getValue(friendData, 'firstName') ?? '',
        lastName: getValue(friendData, 'lastName') ?? '',
        profileLink: getValue(friendData, 'profileLink') ?? '',
      });
    }
    return friends;
  }, [] as FriendData[]);
  
  return NextResponse.json(
    {
      ...user,
      friends: friendList,
    },
    {
      status: HttpStatusCode.OK,
    },
  );
}
