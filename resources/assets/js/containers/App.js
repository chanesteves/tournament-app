import React from 'react';

import Tournament from '../components/Tournament';
 
/* An example React component */
class App extends React.Component {
    render() {
        return (
            <div className="app">
                <div className="app-header">  
                </div>

                <Tournament />
            </div>
        );
    }
}
 
export default App;