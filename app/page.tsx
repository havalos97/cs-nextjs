"use client"

import React, { useEffect, useState } from "react";
import Table from "@/components/Table";
import { UserDataResponse } from "@/types/types";
import { Grid } from "@mui/material";

const Home: React.FC = () => {
  const [userList, setUserList] = useState<UserDataResponse[] | undefined>(
    undefined
  );

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch('/api/users');
      return data.json();
    }
    fetchData().then((data) => {
      if (!Array.isArray(data)) throw new Error('Invalid data received');
      setUserList(data);
    })
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={3} />
      <Grid item xs={6}>
        <Table
          columns={[
            { name: 'profileLink', title: 'Profile Link' },
            { name: 'firstName', title: 'First Name' },
            { name: 'lastName', title: 'Last Name' },
            { name: 'email', title: 'Email' },
            { name: 'gender', title: 'Gender' },
          ]}
          rows={
            userList && userList.map((user) => ({
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              gender: user.gender,
              profileLink: user.profileLink,
              profilePic: user.profilePic,
            }))
          }
        />
      </Grid>
    </Grid>
  )
}

export default Home;
