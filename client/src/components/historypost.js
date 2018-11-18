import React, { Component } from 'react'
let data = [
    {name:'Jeff Tomson',
    date: "11/28/18",
    time: "11:20",
    parkIDs: ['ROSE', 'ROSE'],
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
    

export default class Post extends React.Component{
  render (){
    return (
      <div>{data.map((e, index)=>
          <div className="card" key={index}>
        <div className="dark-blue white-text">
            <i>Arrow</i>
            <p className="white-text">{e.name}</p>
            <p className="white-text">{e.date} at {e.time}</p>
        </div>
        <div>{e.parkIDs.map((park)=><p>{park}</p>)}</div>
        <div className="gray bottom-round">
            <a className="blue-link">11 more...</a>
        </div>
        <p>{e.message}</p>
      </div>
          
          
          )}</div>
      )
  }
};