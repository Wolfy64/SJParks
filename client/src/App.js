import React from 'react';
import './App.css';
import Sidenav from './components/sidenav'
import Topnav from './components/topnav'

class App extends React.Component{
    
  render (){
    
    return (
    <div>
        <Sidenav page="hi" />
        <div className="page">
        
            <Topnav />
            
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus leo mauris, placerat et pharetra in, auctor id diam. Curabitur mattis lacus id tellus varius, sit amet semper orci ultrices. Aenean ultricies nunc nec erat lacinia congue. Aenean nec enim consequat, tempus sapien id, tempus enim. Nam tincidunt aliquet tortor, ac sodales eros pretium vel. Pellentesque congue ex sed dui pharetra, nec dignissim diam dignissim. Duis vestibulum porttitor dolor, a porta orci cursus eget. Suspendisse eu justo sed sem lobortis molestie et nec lorem. Duis risus ante, rhoncus et felis sed, consectetur facilisis magna. Praesent eleifend turpis sit amet sem elementum, non ultricies sem lacinia. Vestibulum non porta enim, a consequat mauris.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus leo mauris, placerat et pharetra in, auctor id diam. Curabitur mattis lacus id tellus varius, sit amet semper orci ultrices. Aenean ultricies nunc nec erat lacinia congue. Aenean nec enim consequat, tempus sapien id, tempus enim. Nam tincidunt aliquet tortor, ac sodales eros pretium vel. Pellentesque congue ex sed dui pharetra, nec dignissim diam dignissim. Duis vestibulum porttitor dolor, a porta orci cursus eget. Suspendisse eu justo sed sem lobortis molestie et nec lorem. Duis risus ante, rhoncus et felis sed, consectetur facilisis magna. Praesent eleifend turpis sit amet sem elementum, non ultricies sem lacinia. Vestibulum non porta enim, a consequat mauris.</p>
        </div>
        
    </div>
    );
  }
};


export default App;