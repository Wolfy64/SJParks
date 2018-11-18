import React from 'react'
import Graph from './graph'
import Post from './historypost'

class Updates extends React.Component{
    render () {
      return (
          <div>
            <div className="col-lg-4">
              <Graph />
              <button>New Text Update</button>
            </div>
            <Post className="col-lg-4" />
          </div>
      )
    }
}
export default Updates;