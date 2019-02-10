import React from 'react';
import UsersForm from './UsersForm';
import UsersList from './UsersList';
import {Wrapper} from './styles';

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
