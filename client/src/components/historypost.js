import React, { Component } from 'react'   

export default class Post extends React.Component{
  constructor() {
    super()
    this.state = {
      loadMore: false
    }
    this.users = [
        {name:'Jeff Tomson',
        date: "11/28/18",
        time: "11:20",
        parkIDs: ['ROthgSE', 'ROzdfSE', 'ROSzdE', 'ROzddSE', 'DFzndgROSE', 'ROzdfSE'],
        message: 'Bramhall Park and Rose Garden, \nDear resident, we recommend not visiting Rose Garden or Bramhall Park due to a fire in the Almaden area. We will update you as soon as it is safe to visit the park.'},

        {name:'Peterson Laderhavin',
        date: Date.now(),
        time: "11:20",
        parkIDs: ['ROSE'],
        message: 'Bramhall Park and Rose Garden, \nDear resident, we recommend not visiting Rose Garden or Bramhall Park due to a fire in the Almaden area. We will update you as soon as it is safe to visit the park.'},

        {name:'Fernando Bordalex',
        date: Date.now(),
        time: "11:20",
        parkIDs: ['ROSE'],
        message: 'Bramhall Park and Rose Garden,\nDear resident, we recommend not visiting Rose Garden or Bramhall Park due to a fire in the Almaden area. We will update you as soon as it is safe to visit the park.'}
    ]
    }

  showMore = () =>{
    this.state.loadMore ? this.setState({loadMore: false}) : this.setState({loadMore: true})
  }      
      
  render (){
    return (
        <div>
            {this.users.map((user, index)=>
            <div className="card" key={index}>

                <div className="dark-blue white-text">
                    <i>Arrow</i>
                    <p className="white-text">{user.name}</p>
                    <p className="white-text">{user.date} at {user.time}</p>
                </div>

                <div>
                    {user.parkIDs.map((park, index)=>
                        <p key={index}>{park}</p>
                    )}
                </div>

                <div className="gray bottom-round">
                    <button onClick={this.showMore}
                     className="blue-link">
                        {this.state.loadMore ? (
                        <span>Show less</span>
                        ) : (
                        <span>{user.parkIDs.length>3 ? (user.parkIDs.length-3).toString()+" more.." : null}</span>
                        )
                      }
                        
                    </button>
                </div>

                <p>{user.message}</p>

            </div>     
            )}
        </div>
      )
  }
}