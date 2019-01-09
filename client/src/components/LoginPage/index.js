import React, { Component } from 'react';
import styled from 'styled-components';
import Button from '../UI/Generic/Button';
import Input from '../UI/Form/Input';

const Screen = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${props => props.theme.colors.dark};
  padding: 10%;

  h1 {
    text-align: center;
  }

  .card {
    display: flex;
    height: 400px;
    max-width: 400px;
    padding: 40px 30px 60px;
    background-color: white;
    border-radius: 15px;
    margin: 0 auto;
    justify-content: space-between;
    box-shadow: -5px 3px 3px black;
  }
`;

export default () => (
  <Screen>
    <form action='/api/login' method='POST'>
      <div className='card'>
        <h1>SJParks</h1>
        <Input
          name='username'
          label='User ID:'
          placeholder='Enter Your Username'
          type='text'
          required
        />
        <Input
          name='psw'
          label='Password:'
          placeholder='Enter Password'
          type='password'
          required
        />
        <Button type='submit' name='LOGIN' />
      </div>
    </form>
  </Screen>
);
