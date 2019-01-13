import React from 'react';
import UserImage from './UserImage';
import UserForm from './UserForm';
import PasswordForm from './PasswordForm';
import styled from 'styled-components';

const Header = styled.h1`
  padding: 16px;
  margin-left: 15px;
  margin-bottom: 20px;
`


const ProfilePage = () => (
  <>
    <Header>Profile Page</Header>
    <UserImage />
    <UserForm />
    <PasswordForm />
  </>
);

export default ProfilePage;
