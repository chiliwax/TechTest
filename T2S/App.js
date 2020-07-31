import React from 'react';
import NavigationService from './navigators/NavigationService';
import AppStackNav from './navigators/AppStackNav';



export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <AppStackNav ref={navigatorRef => {
                NavigationService.setTopLevelNavigator(navigatorRef);
              }}/>
        )
    };
}

