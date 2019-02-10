import React from 'react';
import UsersForm from './UsersForm';
import UsersList from './UsersList';
import styled from 'styled-components';

const Wrapper = styled.div`
<<<<<<< HEAD
  float: left;
  width: 470px;
  .usersForm {
    width: 300px;
=======
  width: 50%;
  .usersForm{
    max-width: 300px;
    margin: 0 50px 50px 0;
  }
  @media screen and (max-width: ${(props) => props.theme.displays.tablet}) {
    width: 100%;
    .usersForm{
      padding: 0 10px;
      margin: 0 auto;
    }
    .usersList{
      margin: 40px 0;
    }
>>>>>>> 7c0f245f40c570c4fcf22fdd8356d20f1b53769c
  }

<<<<<<< HEAD
  @media screen and (max-width: ${props => props.theme.displays.mobileL}) {
    .usersForm {
      margin: auto;
    }
  }
`;

=======
>>>>>>> 7c0f245f40c570c4fcf22fdd8356d20f1b53769c
const Users = () => (
  <>
    <Wrapper>
      <UsersForm />
    </Wrapper>
    <Wrapper>
      <UsersList />
    </Wrapper>
  </>
);

export default Users;
