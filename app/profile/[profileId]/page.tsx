"use client"

import { Show } from "@/components/Show";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import HomeIcon from '@mui/icons-material/Home';
import UserProfileCard from "@/components/UserProfileCard";
import UserProfileCardSkeleton from "@/components/UserProfileCardSkeleton";
import { UserDataResponse } from "@/types/types";
import { Box, Button, Grid } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type UserProfilePageParams = {
  params: {
    profileId: string;
  }
};

export default function UserProfilePage({ params }: UserProfilePageParams) {
  const router = useRouter();
  const goHome = () => router.push('/');
  const goBack = () => router.back();
  const [user, setUser] = useState<UserDataResponse | undefined>(undefined);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    setLoadingUser(true);
    fetch(`/api/user/${params.profileId}`).then((response) => {
      if (!response.ok) throw new Error('Network error');

      return response.json();
    }).then((data) => {
      if (!data) throw new Error('Invalid data received');
      setUser(data);
    }).finally(() => {
      setLoadingUser(false);
    });
  }, [params.profileId]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={5} />
      <Grid item xs={2}>
        <Button onClick={goBack} variant="contained">
          <ChevronLeftIcon />
          Go Back
        </Button>
        <Button onClick={goHome} variant="outlined">
          <HomeIcon />
          Home
        </Button>
      </Grid>
      <Grid item xs={5} />

      <Grid item xs={5} />
      <Grid item xs={2}>
        <Show>
          <Show.When condition={loadingUser}>
            <UserProfileCardSkeleton />
          </Show.When>
          <Show.Else>
            <UserProfileCard
              firstName={user?.firstName ?? ''}
              lastName={user?.lastName ?? ''}
              email={user?.email ?? ''}
              gender={user?.gender ?? ''}
              profilePic={user?.profilePic ?? ''}
              friends={user?.friends ?? []}
            />
          </Show.Else>
        </Show>
      </Grid>
    </Grid>
  );
}
