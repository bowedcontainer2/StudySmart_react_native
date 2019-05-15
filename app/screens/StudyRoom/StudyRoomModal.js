import React, { Component } from 'react';
import {
  Text, View, TouchableOpacity, StyleSheet, FlatList, Modal
} from 'react-native';
import { connect } from 'react-redux';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {
  changeTime, changeDate, changeLocation, loadData
} from '../../Actions/actions';
import SmallShadowButton from '../../components/SmallShadowButton';

class StudyRoomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datePickerVisible: false,
      timePickerVisible: false,
    };
    this.date = new Date();
    this.minDate = new Date();
    this.date.setDate(this.date.getDate() + 7);
  }

  showDatePicker = () => {
    const { datePickerVisible } = this.state;
    this.setState({
      datePickerVisible: !datePickerVisible
    });
  }

  showTimePicker = () => {
    const { timePickerVisible } = this.state;
    this.setState({
      timePickerVisible: !timePickerVisible
    });
  }

  changeSearch = () => {
    this.props.handleModal();
    this.props.getStudyRooms();
  }

  handleConfirm = (setting, thing) => {
    const { datePickerVisible, timePickerVisible } = this.state;
    const { changeTime: changeTimeAction, changeDate: changeDateAction } = this.props;
    if (thing === 'time') {
      let styledTime = setting.toLocaleTimeString();
      const last2ndChar = styledTime[styledTime.length - 2];
      const lastChar = styledTime[styledTime.length - 1];
      styledTime = styledTime.slice(0, -6);
      this.setState({
        time: styledTime + last2ndChar + lastChar,
        timePickerVisible: !timePickerVisible
      });
      changeTimeAction(styledTime + last2ndChar + lastChar);
    } else {
      let chosen = setting;
      let dd = chosen.getDate();
      let mm = chosen.getMonth() + 1; // January is 0!
      const yyyy = chosen.getFullYear();
      if (dd < 10) {
        dd = `0${dd}`;
      }
      if (mm < 10) {
        mm = `0${mm}`;
      }
      chosen = `${mm}/${dd}/${yyyy}`;
      this.setState({
        date: chosen,
        datePickerVisible: !datePickerVisible
      });
      changeDateAction(chosen);
    }
  }

changeLoc = (location, selected) => {
  const currentLocations = this.props.location;
  if (!selected) {
    const index = currentLocations.indexOf(location);
    if (index > -1) {
      currentLocations.splice(index, 1);
    }
  } else if (selected && !currentLocations.includes(location)) {
    currentLocations.push(location);
  }
  this.props.changeLocation(currentLocations);
}

render() {
  const { datePickerVisible, timePickerVisible } = this.state;
  return (
    <Modal
      style={styles.modal}
      transparent
      animationType="fade"
    >
      <View style={[styles.modalContainer, styles.boxWithShadow]}>
        <Text style={styles.promptText}> Study Preferences </Text>
        <SmallShadowButton title="Anywhere" selected changeThing={this.changeLoc} />
        <SmallShadowButton title="Hill" selected={false} changeThing={this.changeLoc} />
        <SmallShadowButton title="Libraries" selected={false} changeThing={this.changeLoc} />
        <SmallShadowButton title="Classrooms" selected={false} changeThing={this.changeLoc} />
        <View style={styles.containerRow}>
          <View style={styles.containerCol}>
            <Text style={styles.promptText}>
              {this.props.date}
            </Text>
            <DateTimePicker
              isVisible={datePickerVisible}
              onConfirm={chosenDate => this.handleConfirm(chosenDate, 'date')}
              onCancel={this.showDatePicker}
              maximumDate={this.date}
              minimumDate={this.minDate}
            />
            <TouchableOpacity
              style={[styles.whiteButton, styles.boxWithShadow]}
              onPress={this.showDatePicker}
            >
              <Text style={styles.titleText}>
            Change
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.containerCol}>
            <Text style={styles.promptText}>
              {this.props.time}
            </Text>
            <DateTimePicker
              mode="time"
              isVisible={timePickerVisible}
              onConfirm={chosenTime => this.handleConfirm(chosenTime, 'time')}
              onCancel={this.showTimePicker}
              is24Hour
              minuteInterval={30}
              titleIOS="Pick a time"
            />
            <TouchableOpacity
              style={[styles.whiteButton, styles.boxWithShadow]}
              onPress={this.showTimePicker}
            >
              <Text style={styles.titleText}>
           Change
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.containerRow}>
        <TouchableOpacity
              style={[styles.whiteButtonAbs, styles.boxWithShadow]}
              onPress={() => this.props.handleModal()}
            >
              <Text style={styles.titleText}>
           Cancel
              </Text>
            </TouchableOpacity>
        <TouchableOpacity
              style={[styles.whiteButtonAbs, styles.boxWithShadow]}
              onPress={() => this.changeSearch()}
            >
              <Text style={styles.titleText}>
            Ok
              </Text>
            </TouchableOpacity>
            </View>
      </View>
    </Modal>
  );
}
}

const promptText = {
  fontFamily: 'System',
  fontSize: 22,
  fontWeight: '200',
  fontStyle: 'normal',
  letterSpacing: 1.92,
  color: '#108BF8',
  width: '80%',
  textAlign: 'center',
};

const styles = StyleSheet.create({
  promptText,
  modalContainer: {
    height: '50%',
    width: '90%',
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 50,
    marginLeft: 20,
    marginRight: 30,
    flex: 0,
    borderRadius: 10
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontFamily: 'System',
    fontSize: 20,
    fontWeight: '600',
    fontStyle: 'normal',
    letterSpacing: 1.92,
    color: '#108BF8',
    padding: 5
  },
  verticalDivider: {
    height: 30,
    backgroundColor: '#e0e0e0',
    width: 2,
    marginBottom: 2,
    marginRight: '10%',
    marginLeft: '10%',
  },
  containerRow: {
    flex: 0,
    flexDirection: 'row',
    marginBottom: 5,
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerCol: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '55%'
  },
  whiteButton: {
    backgroundColor: 'white',
    height: 30,
    width: '65%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 5,

  },
  whiteButtonAbs: {
    backgroundColor: 'white',
    height: 30,
    width: '35%',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 30,
    marginLeft: 35

  },
  boxWithShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 5
  },
});

const mapStateToProps = state => ({
  time: state.study.time,
  date: state.study.date,
  duration: state.study.duration,
  location: state.study.location,
  data: state.study.data,
  unstyledTime: state.study.unstyledTime

});

const mapDispatchToProps = dispatch => ({
  changeTime: (time) => {
    dispatch(changeTime(time));
  },
  changeDate: (date) => {
    dispatch(changeDate(date));
  },
  changeLocation: (location) => {
    dispatch(changeLocation(location));
  },
  loadData: (data) => {
    dispatch(loadData(data));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(StudyRoomModal);