import React from 'react';
import Graph from './graph';
import Post from './historypost';
import Button from './UI/Generic/Button';

class Updates extends React.Component {
  constructor() {
    super();
    this.state = {
      history: [
        {
          _id: '825y78',
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
          _id: '825jsd78',
          name: 'Peterson Laderhavin',
          date: Date.now(),
          time: '11:20',
          parkIDs: ['ROSE'],
          message:
            'Bramhall Park and Rose Garden, \nDear resident, we recommend not visiting Rose Garden or Bramhall Park due to a fire in the Almaden area. We will update you as soon as it is safe to visit the park.'
        },

        {
          _id: '8ewiug',
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
          <div>
          <Graph />
          <Button link='/admin/newupdate' name='New Text Update' />
        </div>
        {this.state.history.map(post => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    );
  }
}
export default Updates;
