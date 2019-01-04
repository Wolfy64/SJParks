import React, { Component } from 'react'   

export default class Post extends React.Component{
  constructor() {
    super()
    this.state = {
      loadMore: false,
      isOpen: false,
    }
    }

  showMore = () =>{
    this.state.loadMore ? this.setState({loadMore: false}) : this.setState({loadMore: true})
  }  
  open = () =>{
    this.state.isOpen ? this.setState({isOpen: false}) : this.setState({isOpen: true})
  }     
      
  render (){
    return (
        <div>
        {this.state.isOpen ? (
            <div>
                <div onClick={this.open} className="dark-blue white-text">
                        <i className="fas fa-caret-down text-primary"></i>
                    <p className="white-text">{this.props.post.name}</p>
                    <p className="white-text">{this.props.post.date} at {this.props.post.time}</p>
                </div>

                <div className="gray bottom-round">
                
                        {this.props.post.parkIDs.length<3 ? ( 
                            <div>
                            {this.props.post.parkIDs.map((parkID, index)=> //show all parkID's and no button
                                <p key={index}>{parkID}</p>
                            )}
                            </div>
                        ) : ( 
                            <div>
                            {this.state.loadMore ? ( //if length >3 check loadMore === true - show all & button 
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
        ) : ( //if the section isOpen === false
            <div>
                <div onClick={this.open} className="dark-blue white-text">
                        <i className="fas fa-caret-right text-primary"></i>
                    <p className="white-text">{this.props.post.name}</p>
                    <p className="white-text">{this.props.post.date} at {this.props.post.time}</p>
                </div>
            </div>
        )
        }
        </div>
    )
  }
}