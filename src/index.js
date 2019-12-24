/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import './config/ReactotronConfig';
import {Provider} from 'react-redux';
import CodePush from 'react-native-code-push';
import OneSignal from 'react-native-onesignal';

import Routes from './routes';
import * as NavigationService from './services/navigation';

import store from './store';

class App extends Component {
  constructor(props) {
    super(props);

    OneSignal.init('425023f4-b2b0-4494-8ee1-3adb515d1adf');

    OneSignal.addEventListener('received', this.onRecived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onRecived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onRecived = data => {}; // disparado automaticamente ao receber notificação push e o usuario estiver com aplicação aberta

  onOpened = notification => {}; // disparada quando clicamos na notificação quando aplicação esta fechada

  onIds = id => {}; // disparada quando usuario faz registro no serviço de notificações

  render() {
    return (
      <Provider store={store}>
        <StatusBar barStyle="light-content" backgroundColor="#141419" />
        <Routes ref={nav => NavigationService.setNavigator(nav)} />
      </Provider>
    );
  }
}

export default CodePush({
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
})(App);
