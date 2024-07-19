import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import { UserDataResponse } from '@/types/types';
import { Show } from './Show';

type UserProfileCardProps = Partial<UserDataResponse>;

const UserProfileCard: React.FC<UserProfileCardProps> = ({ 
  firstName, 
  lastName, 
  email, 
  gender, 
  profilePic, 
  friends 
}) => {
  return (
    <Card>
      <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
        <CardMedia
          component="img"
          sx={{ width: 140, height: 140, borderRadius: '50%' }}
          image={profilePic}
          alt={`${firstName} ${lastName}`}
        />
      </Box>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {firstName} {lastName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Email: <a className="next-link" href={`mailto:${email}`}>{email}</a>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Gender: {gender}
        </Typography>
        <Typography variant="h6" component="div" sx={{ marginTop: 2 }}>
          Friends
        </Typography>
        <List>
          <Show>
            <Show.When condition={friends?.length === 0}>
              <ListItem>
                <ListItemText primary="No friends to show" />
              </ListItem>
            </Show.When>
            <Show.Else>
              <ul>
                {
                  (friends ?? []).map((friend, index) => (
                    <li key={index}>
                      <ListItem>
                        <Link href={friend.profileLink}>
                          <ListItemText primary={`${friend.firstName} ${friend.lastName}`} />
                        </Link>
                      </ListItem>
                    </li>
                  ))
                }
              </ul>
            </Show.Else>
          </Show>
        </List>
      </CardContent>
    </Card>
  );
};

export default UserProfileCard;
