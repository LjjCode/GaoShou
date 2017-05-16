'use strict';

import React, {
    Component
} from 'react';

import {
    Navigator
} from 'react-native';

import Index from './Splash';

class App extends Component {
    render() {
        let defaultName = 'Index';
        let defaultComponent = Index;
        return ( < Navigator initialRoute={
				{
					name: defaultName,
					component: defaultComponent
				}
			}
                             configureScene={(route) => {
                return Navigator.SceneConfigs.PushFromRight ;
              }}
                             renderScene={
				(route, navigator) => {
					let Component = route.component;
					return <Component {...route.params} navigator={navigator} />
				}
			}
            />
        );
    }
}

export default App;