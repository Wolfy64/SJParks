import React from 'react';
import UserImage from './UserImage';
import UserForm from './UserForm';
import PasswordForm from './PasswordForm';
import { UsersDB } from '../../dummyDB';
import {Container} from './styled'

const ProfilePage = () => (
  <>
    <Container>
      <UserImage />
      <div className='profileInfo'>
        <p>Name: {UsersDB.name}</p>
        <p>Email: {UsersDB.email}</p>
        <p>Phone: {UsersDB.phone}</p>
      </div>
    </Container>
    <Container>
      <UserForm />
      <PasswordForm />
    </Container>
  </>
);

export default ProfilePage;
