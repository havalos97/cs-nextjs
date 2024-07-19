import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const UserProfileCardSkeleton: React.FC = () => {
  return (
    <Card>
      <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
        <Skeleton variant="circular" width={140} height={140} />
      </Box>
      <CardContent>
        <List>
          <ListItem>
            <ListItemText primary={<Skeleton variant="text" width="100%" />} />
          </ListItem>
          <ListItem>
            <ListItemText primary={<Skeleton variant="text" width="100%" />} />
          </ListItem>
          <ListItem>
            <ListItemText primary={<Skeleton variant="text" width="100%" />} />
          </ListItem>
          <ListItem>
            <ListItemText primary={<Skeleton variant="text" width="100%" />} />
          </ListItem>
          <ListItem>
            <ListItemText primary={<Skeleton variant="text" width="100%" />} />
          </ListItem>
          <ListItem>
            <ListItemText primary={<Skeleton variant="text" width="100%" />} />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};

export default UserProfileCardSkeleton;
