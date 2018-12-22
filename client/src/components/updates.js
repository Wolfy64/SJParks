import React from 'react';
import Graph from './graph';
import Post from './historypost';
import { Link } from 'react-router-dom';

class Updates extends React.Component {
  constructor() {
    super();
    this.state = {
      history: [
        {
          name: 'Jeff Tomson',
          date: '11/28/18',
          time: '11:20',
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
        },

        {
          name: 'Peterson Laderhavin',
          date: Date.now(),
          time: '11:20',
          parkIDs: ['ROSE'],
          message:
            'Bramhall Park and Rose Garden, \nDear resident, we recommend not visiting Rose Garden or Bramhall Park due to a fire in the Almaden area. We will update you as soon as it is safe to visit the park.'
        },

        {
          name: 'Fernando Bordalex',
          date: Date.now(),
          time: '11:20',
          parkIDs: ['ROSE'],
          message:
            'Bramhall Park and Rose Garden,\nDear resident, we recommend not visiting Rose Garden or Bramhall Park due to a fire in the Almaden area. We will update you as soon as it is safe to visit the park.'
        }
      ]
    };
  }
  render() {
    return (
      <div>
        <div className='col-lg-4'>
          <Graph />
          <Link to='/admin/newupdate'>
            <button>New Text Update</button>
          </Link>
        </div>
        {this.state.history.map(post => (
          <Post post={post} className='col-lg-4' />
        ))}
      </div>
    );
  }
}
export default Updates;
