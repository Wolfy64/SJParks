import React from 'react';
import UsersForm from './UsersForm';
import UsersList from './UsersList';
import styled from 'styled-components';

const Wrapper = styled.div`
  float: left;
  select {
    margin-top: 13px;
  }
  label{
    margin-top: 13px;
  }

`;

const Wrapper2 = styled.div`
  float: left;
  margin-left: 200px;
  margin-top: 9px;
  p{
    margin-bottom: 30px;  
  }


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
