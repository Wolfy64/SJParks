import React from 'react';
import UserImage from './UserImage';
import UserForm from './UserForm';
import PasswordForm from './PasswordForm';
import styled from 'styled-components';
import { UsersDB } from '../../dummyDB';

const Header = styled.h1`
  padding: 16px;
  margin-left: 15px;
  margin-bottom: 20px;
`

const Wrapper = styled.div`
  width: 300px;
  overflow: auto;
  float: left;
  margin:50px 50px 50px 50px;
    .passwordForm {
      
    }

    p{
      margin: 10px 0;
    };

    div p{
      margin: 37px 0;
    }
`;


const ProfilePage = () => (
  <>
    <Wrapper>
      <UserImage />
      <UserForm />
    </Wrapper>
    <Wrapper>
      <div>
      <p>Name: {UsersDB.name}</p>
      <p>Email: {UsersDB.email}</p>
      <p>Phone: {UsersDB.phone}</p>
      </div>
      <PasswordForm />
    </Wrapper>
  </>
);

export default ProfilePage;
