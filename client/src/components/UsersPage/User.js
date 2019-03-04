/*jshint esversion: 8 */
import React from 'react';
import Button from '../UI/Generic/Button';
import styled from 'styled-components';

const Primary = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: ${props=>props.theme.colors.primary};
  color: ${props=>props.theme.colors.light};
  i {
    width: 15px;
  }
`;

const Details = styled.div`
  div {
    padding: 10px;
    border-radius: 0 0 5px 5px;
    background-color: ${props=>props.theme.colors.lightbg};
  }
  button {
    width: 50%;
    margin: 20px 25%;
  }
  .flex{
    display: flex;
    justify-content: space-between;
  }
`;

class User extends React.Component {
  state = { showUser: false };
  
  handleShowUser = () => this.setState({ showUser: !this.state.showUser });

  render() {
    const { showUser } = this.state;
    const { user } = this.props;

    let userDetails;

    if (showUser) {
      userDetails = (
        <Details>
            <div className="flex">
              <p>{user.email}</p>
              <p>{user.phone}</p>
            </div>
          <Button delete name='Delete User' onClick={this.props.deleteUser}/>
        </Details>
      );
    }
    
    if(showUser){
      return (
        <>
          <Primary onClick={this.handleShowUser}>
            <div>
              <i className='fas fa-caret-down' />
              <span>{user.fullName}</span>
            </div> 
            <div className='end'>{user.access}</div>
          </Primary>
          <>{userDetails}</>
        </>
      );
    } else {
      return (
        <>
          <Primary onClick={this.handleShowUser}>
            <div>
              <i className='fas fa-caret-right' />
              <span>{user.fullName}</span>
            </div> 
            <div className='end'>{user.access}</div>
          </Primary>
          <>{userDetails}</>
        </>
      );
    }
  }
}

export default User;
