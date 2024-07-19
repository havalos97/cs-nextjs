import { NextResponse } from 'next/server';
import * as jsonUserList from '../mockaroo_user_list.json';
import HttpStatusCode from '@/utils/HttpStatusCodes';
const userList = Array.from(jsonUserList);

export async function GET () {
  return NextResponse.json(
    userList,
    {
      status: HttpStatusCode.OK,
    },
  );
}
