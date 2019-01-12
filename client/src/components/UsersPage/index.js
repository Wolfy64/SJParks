<<<<<<< HEAD
import React from 'react';
import UsersForm from './UsersForm';
import UsersList from './UsersList';

const Users = () => (
  <>
    <h1>Users Page</h1>
    <UsersForm />
    <UsersList />
  </>
);

export default Users;
=======
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

const Wrapper2 = styled.div`
  float: left;
  width: 470px;
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
>>>>>>> eaef81a2e80adcbf94a698067c4206b063585bb7
