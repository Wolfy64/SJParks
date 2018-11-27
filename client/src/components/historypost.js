import React, { Component } from 'react'   

export default class Post extends React.Component{
  constructor() {
    super()
    this.state = {
      loadMore: false,
    }
    }

  showMore = () =>{
    this.state.loadMore ? this.setState({loadMore: false}) : this.setState({loadMore: true})
  }      
      
  render (){
    return (
        <div>
            <div className="card">

                <div className="dark-blue white-text">
                    <i className="fas fa-caret-right text-primary"></i>

                    <p className="white-text">{this.props.post.name}</p>
                    <p className="white-text">{this.props.post.date} at {this.props.post.time}</p>
                </div>

                <div>
                    {this.props.post.parkIDs.map((parkID, index)=>
                        <p key={index}>{parkID}</p>
                    )}
                </div>

                <div className="gray bottom-round">
                <button onClick={this.showMore}
                     className="blue-link">
                        {this.state.loadMore ? (
                        <span>Show less</span>
                        ) : (
                        <span>{this.props.post.parkIDs.length>3 ? (this.props.post.parkIDs.length-3).toString()+" more.." : null}</span>
                        )
                      }
                </button>
                </div>

                <p>{this.props.post.message}</p>

            </div>
        </div>
      )
  }
}