import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';


import Result from '../App/Result';
import History from '../App/History'
import Home from '../App/Home';

import HeaderElement from '../Components/HeaderElement'
import {stylesHeader} from '../Components/style'




const AppStackNav = createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            title: 'Text To Speech',
            headerStyle: {
                backgroundColor: stylesHeader.HeaderBackground,
                shadowColor: 'transparent',
            },
            headerTitleStyle: {
                color: stylesHeader.HeaderTextColor,
            },
            headerLeft: HeaderElement.infoLogo,
            headerRight: HeaderElement.historyLogo
        }
    },
    Result: {
        screen: Result,
        navigationOptions: {
            title: 'Resultat',
            headerBackTitle: 'Retour',
            headerStyle: {
                backgroundColor: stylesHeader.HeaderBackground,
                shadowColor: 'transparent'
            },
            headerTitleStyle: {
                color: stylesHeader.HeaderTextColor,
            }
        }
    },
    History: {
        screen: History,
        navigationOptions: {
            title: 'Historique',
            headerBackTitle: 'Retour',
            headerStyle: {
                backgroundColor: stylesHeader.HeaderBackground,
                shadowColor: 'transparent'
            },
            headerTitleStyle: {
                color: stylesHeader.HeaderTextColor,
            }
        }
    }
});

export default createAppContainer(AppStackNav);