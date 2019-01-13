import React from 'react';
import UsersForm from './UsersForm';
import UsersList from './UsersList';
import styled from 'styled-components';

const Wrapper = styled.div`
  float: left;
  width: 470px;
  .usersForm{
    width: 300px;
  }
`;


const Users = () => (
  <>
    <Wrapper>
      <UsersForm />
    </Wrapper>
    <Wrapper>
      <UsersList/>
    </Wrapper>
  </>
);

export default Users;
