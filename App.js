import React, { Component } from 'react';
import { Provider } from 'react-redux';
import {
  Image
} from 'react-native';
import { StackNavigator, createBottomTabNavigator } from 'react-navigation';
import LocationsMap from './app/screens/Locations/LocationsMap';
import configureStore from './store';
import LocationsList from './app/screens/Locations/LocationsList';
import LocationsContainer from './app/screens/Locations/LocationsContainer';
import BookingLocation from './app/screens/StudyRoom/BookingLocation';
import BookingTime from './app/screens/StudyRoom/BookingTime';
import StudyRoomList from './app/screens/StudyRoom/StudyRoom';
import StudyRoomReserve from './app/screens/StudyRoom/StudyRoomReserve';
import Feedback from './app/screens/Feedback/Feedback';
import BookingWebView from './app/screens/StudyRoom/BookingWebView';

const StudyRoomStack = StackNavigator({
  StudyRoomList: { screen: StudyRoomList },
  BookingLocation: { screen: BookingLocation },
  BookingTime: { screen: BookingTime },
  StudyRoomReserve: { screen: StudyRoomReserve },
  BookingWebView: { screen: BookingWebView },


},
{
// For now, use this to toggle between List view and Map view. We will eventually add a toggle button
  initialRouteName: 'BookingLocation',
});

const LocationsStack = StackNavigator({
  LocationsContainer: { screen: LocationsContainer },
  List: { screen: LocationsList },
  Map: { screen: LocationsMap },

  initialRouteName: 'LocationContainer',
});

const FeedbackStack = StackNavigator({
  Feedback: { screen: Feedback },
});

StudyRoomStack.navigationOptions = {
  tabBarIcon: ({ focused }) => {
    const image = focused
      ? require('./assets/studyTabSelected.png')
      : require('./assets/studyTab.png');
    return (
      <Image
        source={image}
        style={{ width: 25, height: 25 }}
      />
    );
  },
  tabBarOptions: {
    showIcon: true,
    activeTintColor: '#108BF8',
    inactiveTintColor: 'gray',
    showLabel: false
  }
};

LocationsStack.navigationOptions = {
  tabBarIcon: ({ focused }) => {
    const image = focused
      ? require('./assets/locationsTabSelected.png')
      : require('./assets/locationsTab.png');
    return (
      <Image
        source={image}
        style={{ width: 25, height: 25 }}
      />
    );
  },
  tabBarOptions: {
    showIcon: true,
    activeTintColor: '#108BF8',
    inactiveTintColor: 'gray',
    showLabel: false
  }
};

FeedbackStack.navigationOptions = {
  tabBarIcon: ({ focused }) => {
    const image = focused
      ? require('./assets/feedbackTabSelected.png')
      : require('./assets/feedbackTab.png');
    return (
      <Image
        source={image}
        style={{ width: 25, height: 25 }}
      />
    );
  },
  tabBarOptions: {
    showIcon: true,
    activeTintColor: '#108BF8',
    inactiveTintColor: 'gray',
    showLabel: false
  }
};


const StudySmartTabNavigator = createBottomTabNavigator(
  {
    Study: StudyRoomStack,
    Locations: LocationsStack,
    Feedback: FeedbackStack
  },
);

const store = configureStore();

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <StudySmartTabNavigator />
      </Provider>

    );
  }
}
