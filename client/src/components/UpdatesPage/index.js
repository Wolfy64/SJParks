/*jshint esversion: 8 */
import React from 'react';
import Graph from './Graph';
import UpdatePost from './UpdatePost';
import Button from '../UI/Generic/Button';
import { Wrapper } from './styles';
// import makeRequest from '../../utils/makeRequest';

class Updates extends React.Component {
  state = { history: [] };

  // async componentDidMount() {
  //   const request = await makeRequest('/api/updates');
  //   const { success, payload, message } = await request.json();
  //   success
  //     ? this.setState({ history: payload })
  //     : this.setState({ message });
  // }

  render() {
    const { user } = this.props;
    return (
      <>
        <Wrapper>
          <Graph className="recharts-surface" />
          <Button
            className="updateButton"
            to={`/admin/${user._id}/newupdate`}
            name="New Text Update"
          />
        </Wrapper>

        <Wrapper>
          {this.state.history.map(post => (
            <UpdatePost key={post._id} post={post} />
          ))}
        </Wrapper>
      </>
    );
  }
}
export default Updates;
