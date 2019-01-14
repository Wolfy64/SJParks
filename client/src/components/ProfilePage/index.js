import React from 'react';
import UserImage from './UserImage';
import UserForm from './UserForm';
import PasswordForm from './PasswordForm';
import { UsersDB } from '../../dummyDB';
import styled from 'styled-components';

const Wrap
per = styled.div`
  width: 300px;
  overflow: auto;
  float: left;
  margin:50px;
  color: ${props => props.theme.colors.secondary};
    .profileInfo{
      margin: 100px 0;
      height: 65px;
    p{
      padding: 0.3rem;
    }
  }
`;

const ProfilePage = () => (
  <>
    <Wrapper>
      <UserImage />
      <UserForm />
    </Wrapper>
    <Wrapper>
      <div className='profileInfo'>
        <p>Name: {UsersDB.name}</p>
        <p>Email: {UsersDB.email}</p>
        <p>Phone: {UsersDB.phone}</p>
      </div>
      <PasswordForm />
    </Wrapper>
  </>
);

export default ProfilePage;
