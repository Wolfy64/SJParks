import React from 'react';
import UsersForm from './UsersForm';
import UsersList from './UsersList';
import styled from 'styled-components';

const Wrapper = styled.div`
  float: left;
  width: 300px;
  padding:20px;
  margin-right: 10%;
`;

const Wrapper2 = styled.div`
  float: left;
  width: 40%;
`;

const Users = () => (
  <>
    <Wrapper>
      <UsersForm/>
    </Wrapper>
    <Wrapper2>
      <UsersList/>
    </Wrapper2>
  </>
);

export default Users;