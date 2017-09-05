import React from 'react';
import {
  AsyncStorage,
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
// import Button from 'apsl-react-native-button';
import { Actions, Scene, Router, ActionConst } from 'react-native-router-flux';
//import { Form, Item, Input, Label, List, ListItem, Icon, Body, Right, Switch } from 'native-base';
import { Form, Item, Label, List, ListItem, Input, Switch, Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import colors from '../../Constants/colors';
import firebase, {firebaseApp, firebaseDb} from '../../Constants/firebase';

export default class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName : 'username',
      dafaultThemeColor : 'red',
      switchVal_newWords : false,
      switchVal_stories : false,
      selectedThemeId : 0
    }
  }
  handleSave(){
    firebase.database().ref('Users/').push({
      username : this.state.userName,
      defaultThemeColor : this.state.dafaultThemeColor,
      isNewWordNotifyEnabled : false,
      isNewStoriesNotifyEnabled : false,
      //passCode : this.state.passCode,
      //storyName : this.state.storyName,
      //storyContent : ''
    })
    .then((res)=>console.log(res));

    Actions.ShowStory();
  }
  handleChooseColor(themeId){
    this.setState({selectedThemeId : themeId});
    console.log('themeId', themeId);
  }

  render() {
    return (
    <View style={styles.container}>
      <Header style={styles.headerContainer}>
        <Left>
          <Button transparent onPress={()=>Actions.pop()}>
            <Icon name='arrow-back' style={{color : colors.colorPurpleDark}}/>
          </Button>
        </Left>
        <Body>
          <Title style={styles.headerTitle}>Setting</Title>
        </Body>
        <Right>
          <Button transparent onPress={()=>this.handleSave()}>
            <Text style={styles.headerRightBtn}>Save</Text>
          </Button>
        </Right>
      </Header>
      <View style={styles.viewContainer}>
        <Form>
          <Item floatingLabel>
            <Label style={{fontSize : 15}}>YOUR NAME</Label>
            <Input 
              onChangeText={(text)=>{this.setState({userName : text})}} 
              value={this.state.userName} 
              style={styles.inputBox}
            />
          </Item>
        </Form>
      </View>
      <View style={styles.viewContainer}>
        <Form>
          <Item style={styles.ListItem}>
            <Label style={{fontSize : 15}}>DEFAULT COLOR</Label>    
          </Item>
        </Form>
        {/* <List>
          <ListItem>
            <View style={[styles.colorBoxItem, {backgroundColor:colors.colorPink}]}/>            
            <View style={[styles.colorBoxItem, {backgroundColor:colors.colorNavy}]}/>       
            <View style={[styles.colorBoxItem, {backgroundColor:colors.colorPurple}]}/>       
            <View style={[styles.colorBoxItem, {backgroundColor:colors.colorBlue}]}/>       
            <View style={[styles.colorBoxItem, {backgroundColor:colors.colorGreen}]}/>      
          </ListItem>
        </List> */}
        <List>
          <ListItem>
            <TouchableOpacity onPress={()=>this.handleChooseColor(0)} >
              <View style={[styles.colorBoxItem, {backgroundColor:colors.colorPink, opacity : this.state.selectedThemeId == 0 ? 1.0 : .3}]}/>              
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.handleChooseColor(1)} >
              <View style={[styles.colorBoxItem, {backgroundColor:colors.colorNavy, opacity : this.state.selectedThemeId == 1 ? 1.0 : .3}]}/>              
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.handleChooseColor(2)} >
              <View style={[styles.colorBoxItem, {backgroundColor:colors.colorPurple, opacity : this.state.selectedThemeId == 2 ? 1.0 : .3}]}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.handleChooseColor(3)} >
              <View style={[styles.colorBoxItem, {backgroundColor:colors.colorBlue, opacity : this.state.selectedThemeId == 3 ? 1.0 : .3}]}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.handleChooseColor(4)} >
              <View style={[styles.colorBoxItem, {backgroundColor:colors.colorGreen, opacity : this.state.selectedThemeId == 4 ? 1.0 : .3}]}/>
            </TouchableOpacity>
          </ListItem>
        </List>
      </View>
      
      <View style={styles.viewContainer}>
        <Form>
          <Item style={styles.ListItem}>
            <Label style={{fontSize : 15}}>NOTIFICATIONS</Label>
          </Item>
        </Form>

        <List>
          <ListItem icon>
            <Body>
              <Text style={styles.itemText}>New words in your stories</Text>
            </Body>
            <Right>
              <Switch 
                value = {this.state.switchVal_newWords} 
                onValueChange={(switchVal)=>this.setState({switchVal_newWords : switchVal})} 
                onTintColor={colors.colorPurple}
              />
            </Right>
          </ListItem>

          <ListItem icon>
            <Body>
              <Text style={styles.itemText}>New stories</Text>
            </Body>
            <Right>
              <Switch 
                value = {this.state.switchVal_stories} 
                onValueChange={(switchVal)=>this.setState({switchVal_stories : switchVal})} 
                onTintColor={colors.colorPurple}
              />
            </Right>
          </ListItem>
        </List>
      </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //marginTop : 64
  },
  viewContainer:{
    marginTop : 30
  },
  headerContainer:{
    backgroundColor : colors.colorWhite,
    borderBottomWidth : 0
  },
  headerRightBtn:{
    fontSize :18,
    color : colors.colorPurpleDark
  },
  formContainer:{
    marginTop : 20
  },
  inputBox:{
    marginBottom : 10
  },
  ListItem:{
    borderWidth : 0,
    borderBottomWidth : 0
  },
  itemText:{
    fontSize : 17,
  },
  colorBoxItem:{
    width : 30,
    height : 30,
    marginHorizontal : 6,
    borderRadius : 4
  },
  labelStyle:{
    fontSize : 15
  },

  itemText1:{
    textAlign : 'center',
    textAlignVertical : 'center',
    fontSize : 22,
    color : '#ffffff',
    fontWeight : 'bold'
  }
});