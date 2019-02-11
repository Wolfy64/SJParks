import React from 'react';
import UsersForm from './UsersForm';
import UsersList from './UsersList';
import {Wrapper} from './styles';

<<<<<<< HEAD
const Wrapper = styled.div`
  width: 50%;
  .usersForm {
    max-width: 300px;
    margin: 0 50px 50px 0;
  }
  @media screen and (max-width: ${props => props.theme.displays.tablet}) {
    width: 100%;
    .usersForm {
      padding: 0 10px;
      margin: 0 auto;
    }
    .usersList {
      margin: 40px 0;
    }
  }
`;

=======
>>>>>>> 3ece4f469ac81cafabbf085cba4fbcb209256ea5
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
