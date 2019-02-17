import React from 'react';
import UsersForm from './UsersForm';
import UsersList from './UsersList';
import { Wrapper } from './styles';
import makeRequest from '../../utils/makeRequest';


class Users extends React.Component {
  state = {users: []}

  componentDidMount() {
       makeRequest("/api/users")
      .then(res => res.json())
      .then(data => {
        this.setState({ users: data.users });
      })
      .catch(err => err);
  }

  render(){
    const handleDelete = async (_id) => {
      console.log(_id);
      if(window.confirm(
        "Are you sure you want to permanently delete "
          .concat(this.state.users.filter(user => user._id === _id)[0].fullName)
          .concat(" from the system? \nTHIS ACTION CAN NOT BE UNDONE")
      )) {
        const request = await makeRequest('/api/users','DELETE', {_id})
        const { success, message } = await request.json();
        
        if (success) {
          this.setState({
            users: this.state.users.filter(user => user._id !== _id)
          })
        } else {
          this.setState({message});
        }
      }
    }
  
    const handleSendForm = (dataForm) => {
        makeRequest('/api/users', 'POST', dataForm)
          .then(res => res.json())
          .then(data => {
            const {users} = this.state
            users.unshift(data.user)
            this.setState({
              users
            })
          })
          .catch(err => console.log(err));
      }

    return(
      <>
      <Wrapper>
        <UsersForm handleSendForm={handleSendForm}/>
      </Wrapper>
      <Wrapper>
        <UsersList handleDelete={handleDelete} users={this.state.users} />
      </Wrapper>
     </>
    )
  }

}

export default Users;
