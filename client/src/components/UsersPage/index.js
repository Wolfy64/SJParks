import React from 'react';
import UsersForm from './UsersForm';
import UsersList from './UsersList';
import styled from 'styled-components';

const Wrapper = styled.div`
  float: left;
  width: 250px;
  margin-right: 200px;
`;

const Wrapper2 = styled.div`
  float: left;
  width: 400px;
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