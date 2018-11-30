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

                <div className="gray bottom-round">
                
                        {this.props.post.parkIDs.length<3 ? ( //if length >3
                            <div>
                            {this.props.post.parkIDs.map((parkID, index)=> //show all parkID's and no button
                                <p key={index}>{parkID}</p>
                            )}
                            </div>
                        ) : ( 
                            <div>
                            {this.state.loadMore ? ( //else check loadMore, if true - show all & button 
                                <div>
                                    {this.props.post.parkIDs.map((parkID, index)=> //show all parkID's and no button
                                        <p key={index}>{parkID}</p>
                                    )}
                                    <button onClick={this.showMore}
                                    className="blue-link">Show less</button>
                                </div>
                                
                            ) : (
                                <div>
                                    {this.props.post.parkIDs.slice(0, 3).map((parkID, index)=> //show all parkID's and no button
                                        <p key={index}>{parkID}</p>
                                    )}
                                    <button onClick={this.showMore}
                                    className="blue-link">{this.props.post.parkIDs.length>3 ? (
                                        this.props.post.parkIDs.length-3).toString()+" more.." : null}
                                    </button>
                                </div>
                            )}
                            </div>
                            
                            
                        )
                      }
                
                </div>

                <p>{this.props.post.message}</p>

            </div>
        </div>
      )
  }
}