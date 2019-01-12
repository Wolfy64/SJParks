import React from 'react';
import UserImage from './UserImage';
import UserForm from './UserForm';
import PasswordForm from './PasswordForm';
<<<<<<< HEAD
=======
import styled from 'styled-components';
import { UsersDB } from '../../dummyDB';

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

>>>>>>> eaef81a2e80adcbf94a698067c4206b063585bb7

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
