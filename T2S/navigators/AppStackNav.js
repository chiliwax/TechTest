import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import Result from '../App/Result';
import Home from '../App/Home';

const AppStackNav = createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            // title: 'T2S',
            // headerStyle: {
            //     backgroundColor: '#36393f',
            //     borderBottomColor: '#36393f',
            //     shadowColor:'transparent',
            // },
            // headerTitleStyle: {
            //     color: '#ecedee',
            // },
           headerShown: false
        }
    },
    Result: {
        screen: Result,
        navigationOptions: {
            title: 'Resultat',
            headerStyle: {
                backgroundColor: '#2f3136',
                borderBottomColor: '#ecedee',
                shadowColor:'transparent'
            },
            headerTitleStyle: {
                color: '#ecedee',
            },
        }
    }
    // Login: {
    //     screen: AllergApp,
    //     navigationOptions: {
    //         header: null
    //     }
    // },
    // Home: {
    //     screen: Home,
    //     navigationOptions: {
    //         headerBackTitle: 'Cancel',
    //         headerLeft: null,

    //     }
    // },
    // AddItem: {
    //     screen: AddItem,
    //     navigationOptions: {
    //         headerTintColor: 'black',
    //         title: 'Add Item',
    //         headerBackTitle: 'Back',
    //         headerStyle: {
    //             backgroundColor: '#ecedee',
    //             borderBottomColor: '#ecedee',
    //         },
    //         headerRight: () => (
    //             <TouchableOpacity onPress={() => NavigationService.navigateH('Home')}>
    //                 <Icon size={25} style={{ marginRight: 10, justifyContent: 'center' }} name="md-close" />
    //             </TouchableOpacity>
    //         ),
    // headerTitleStyle: {
    //     color: '#18c063',
    // },
    //     }
    // },
    // AddItem2: {
    //     screen: AddItem2,
    //     navigationOptions: {
    //         headerTintColor: 'black',
    //         title: 'Add Item',
    //         headerBackTitle: 'Back',
    //         headerStyle: {
    //             backgroundColor: '#ecedee',
    //             borderBottomColor: '#ecedee',
    //         },
    //         headerRight: () => (
    //             <TouchableOpacity onPress={() => NavigationService.navigateH('Home')}>
    //                 <Icon size={25} style={{ marginRight: 10, justifyContent: 'center' }} name="md-close" />
    //             </TouchableOpacity>
    //         ),
    //     }
    // },
    // AddItem3: {
    //     screen: AddItem3,
    //     navigationOptions: {
    //         headerTintColor: 'black',
    //         title: 'Add Item',
    //         headerBackTitle: 'Back',
    //         headerStyle: {
    //             backgroundColor: '#ecedee',
    //             borderBottomColor: '#ecedee',
    //         },
    //         headerRight: () => (
    //             <TouchableOpacity onPress={() => NavigationService.navigateH('Home')}>
    //                 <Icon size={25} style={{ marginRight: 10, justifyContent: 'center' }} name="md-close" />
    //             </TouchableOpacity>
    //         ),
    //     }
    // }
});

export default createAppContainer(AppStackNav);