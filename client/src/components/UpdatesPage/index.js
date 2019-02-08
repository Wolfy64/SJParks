import React from 'react';
import Graph from './Graph';
import Post from './Historypost';
import Button from '../UI/Generic/Button';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 46%;
  margin: 0 2%;
  #graph{
    display: flex;
    justify-content: center;
    margin-left: -40px;
  }
  @media screen and (max-width: ${(props) => props.theme.displays.tablet}) {
    width: 100vw;
    margin: 0;
    .updateButton {
      margin: 30px auto;
    }
  }
  .updateButton {
    display: flex;
    justify-content: center;
    margin: 50px auto;
  };
`;

class Updates extends React.Component {
  state = {
    history: [
      { _id: '825y78',
        name: 'Jeff Tomson', date: '11/28/18', time: '11:20',
        parkIDs: [
          'ROthgSE',
          'ROzdfSE',
          'ROSzdE',
          'ROzddSE',
          'DFzndgROSE',
          'ROzdfSE'
        ],
        message:
          'Bramhall Park and Rose Garden, \nDear resident, we recommend not visiting Rose Garden or Bramhall Park due to a fire in the Almaden area. We will update you as soon as it is safe to visit the park.'
      }
    ]
  }

  render() {
    return (
      <>
        <Wrapper>
          <Graph />
          <Button
            className="updateButton"
            to="/admin/:id/newupdate"
            name="New Text Update"
          />
        </Wrapper>
        <Wrapper>
          {this.state.history.map(post => (
            <Post key={post._id} post={post} />
          ))}
        </Wrapper>
      </>
    );
  }
}
export default Updates;
