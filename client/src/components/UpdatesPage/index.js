import React from 'react';
import Graph from './Graph';
import Post from './Historypost';
import Button from '../UI/Generic/Button';
import styled from 'styled-components';

const Wrapper = styled.div`
    float: left;
    width: 470px;
    .recharts-surface {
        margin-left:-3.5rem;
        margin-right: 50px;
    };
    .updateButton{
        margin: 50px;
        width: 300px;
    };
`;

class Updates extends React.Component {
    constructor() {
        super();
        this.state = {
            history: [
                {_id: '825y78',
                name: 'Jeff Tomson',
                date: '11/28/18',
                time: '11:20',
                parkIDs: ['ROthgSE', 'ROzdfSE', 'ROSzdE', 'ROzddSE', 'DFzndgROSE', 'ROzdfSE','ROthgSE', 'ROzdfSE', 'ROSzdE', 'ROzddSE', 'DFzndgROSE', 'ROzdfSE'],
                message: 'Bramhall Park and Rose Garden, \nDear resident, we recommend not visiting Rose Garden or Bramhall Park due to a fire in the Almaden area. We will update you as soon as it is safe to visit the park.'
                },
                {_id: '825y78', 
                name: 'Jeff Tomson', 
                date: '11/28/18',
                time: '11:20',
                parkIDs: ['ROthgSE', 'ROzdfSE', 'ROSzdE', 'ROzddSE', 'DFzndgROSE', 'ROzdfSE'],
                message: 'Bramhall Park and Rose Garden, \nDear resident, we recommend not visiting Rose Garden or Bramhall Park due to a fire in the Almaden area. We will update you as soon as it is safe to visit the park.'
                },
                {_id: '825y78', 
                name: 'Jeff Tomson', 
                date: '11/28/18',
                time: '11:20',
                parkIDs: ['ROthgSE', 'ROzdfSE', 'ROSzdE', 'ROzddSE', 'DFzndgROSE', 'ROzdfSE'],
                message: 'Bramhall Park and Rose Garden, \nDear resident, we recommend not visiting Rose Garden or Bramhall Park due to a fire in the Almaden area. We will update you as soon as it is safe to visit the park.'
                },
                {_id: '825y78',
                name: 'Jeff Tomson',
                date: '11/28/18',
                time: '11:20',
                parkIDs: ['ROthgSE', 'ROzdfSE', 'ROSzdE', 'ROzddSE', 'DFzndgROSE', 'ROzdfSE'],
                message: 'Bramhall Park and Rose Garden, \nDear resident, we recommend not visiting Rose Garden or Bramhall Park due to a fire in the Almaden area. We will update you as soon as it is safe to visit the park.'
                },
<<<<<<< HEAD
=======
                {_id: '825u78', 
                name: 'Jeff Tomson', 
                date: '11/28/18',
                time: '11:20',
                parkIDs: ['ROthgSE', 'ROzdfSE', 'ROSzdE', 'ROzddSE', 'DFzndgROSE', 'ROzdfSE'],
                message: 'Bramhall Park and Rose Garden, \nDear resident, we recommend not visiting Rose Garden or Bramhall Park due to a fire in the Almaden area. We will update you as soon as it is safe to visit the park.'
                }, 
>>>>>>> eaef81a2e80adcbf94a698067c4206b063585bb7
            ]
        };
    }

    render() {
        return (
        <div>
<<<<<<< HEAD
            <div>
                <Graph />
                <Button to='/api/message' name='New Text Update' />
            </div>
=======
            <Wrapper>
                <Graph className='recharts-surface' />
                <Button className='updateButton' to='/admin/newupdate' name='New Text Update' />
            </Wrapper>
            <Wrapper>
>>>>>>> eaef81a2e80adcbf94a698067c4206b063585bb7
            {this.state.history.map(post => (
                <Post key={post._id} post={post} />
            ))}
            </Wrapper>
        </div>
        );
    }
}
export default Updates;
