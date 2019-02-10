import React from 'react';
import UserImage from './UserImage';
import UserForm from './UserForm';
import PasswordForm from './PasswordForm';
import { UsersDB } from '../../dummyDB';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-bottom: 40px;
  color: ${props => props.theme.colors.secondary};
  .userImage, .userForm {
    margin-right: 50px;
  }
  .profileInfo {
    display: flex;
    flex-direction: column;
    padding: 0 10px;
    width: 280px;
    justify-content: flex-end;
    margin-top: 30px;
    p {
        margin: 0.3rem;
    }
  }
  @media screen and (max-width: ${(props) => props.theme.displays.tablet}) {
    margin-bottom: 20px;
    justify-content: center;
    .profileInfo{
      margin-top: 20px;
    }
  }
`

const ProfilePage = () => (
  <>
    <Wrapper>
      <UserImage />
      <div className='profileInfo'>
        <p>Name: {UsersDB.name}</p>
        <p>Email: {UsersDB.email}</p>
        <p>Phone: {UsersDB.phone}</p>
      </div>
    </Wrapper>
    <Wrapper>
      <UserForm />
      <PasswordForm />
    </Wrapper>
  </>
);

export default ProfilePage;
