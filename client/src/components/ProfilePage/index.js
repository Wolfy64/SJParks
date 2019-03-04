/*jshint esversion: 8 */
import React from 'react';
import UserImage from './UserImage';
import UserForm from './UserForm';
import ProfileInfo from './ProfileInfo';
import PasswordForm from './PasswordForm';
import {Container} from './styled';

const ProfilePage = () => (
  <>
    <Container>
      <UserImage />
      <ProfileInfo />
    </Container>
    <Container>
      <UserForm />
      <PasswordForm />
    </Container>
  </>
);

export default ProfilePage;
