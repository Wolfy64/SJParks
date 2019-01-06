import React from 'react';
import UserImage from './UserImage';
import UserForm from './UserForm';
import PasswordForm from './PasswordForm';
import styled from 'styled-components';

const Pos = styled.h1`
  padding: 16px;
`


const ProfilePage = () => (
  <>
    <Pos>Profile Page</Pos>
    <UserImage />
    <UserForm />
    <PasswordForm />
  </>
);

export default ProfilePage;
