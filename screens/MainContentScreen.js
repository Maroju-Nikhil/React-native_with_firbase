import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  Text,
  Root,
} from "native-base";
import * as Font from "expo-font";
import { ActivityIndicator } from "react-native";
import ListViewScreen from './ListViewScreen';
import GridViewScreen from './GridViewScreen';
import CardViewScreen from './CardViewScreen';
import ScrollViewScreen from './ScrollViewScreen';
import ModalViewScreen from './ModalViewScreen';

export default class MainContentScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      loading: true,
      tabStatus1:true,
      tabStatus2:false,
      tabStatus3:false,
      tabStatus4:false,
      tabStatus5:false
    };
  }
  
  switchScreen(index) {
    this.setState({index: index})

      switch(index) {
        case 0:
          this.setState({
  
            tabStatus1:true,
            tabStatus2:false,
            tabStatus3:false,
            tabStatus4:false,
            tabStatus5:false
          })
          // code block
          break;
        case 1:
          this.setState({
  
            tabStatus1:false,
            tabStatus2:true,
            tabStatus3:false,
            tabStatus4:false,
            tabStatus5:false
          })
          // code block
          break;
        case 2:
          // code block
          this.setState({
  
            tabStatus1:false,
            tabStatus2:false,
            tabStatus3:true,
            tabStatus4:false,
            tabStatus5:false
          })
          break;
        case 3:
          this.setState({
  
            tabStatus1:false,
            tabStatus2:false,
            tabStatus3:false,
            tabStatus4:true,
            tabStatus5:false
          })
          // code block
          break;
          case 4:
            this.setState({
    
              tabStatus1:false,
              tabStatus2:false,
              tabStatus3:false,
              tabStatus4:false,
              tabStatus5:true
            })
      }
 }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
    });
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) {
      return (
        <Root>
          <ActivityIndicator />
        </Root>
      );
    }
      let AppComponent = ListViewScreen;

      if(this.state.index == 0)
       {
           AppComponent = ListViewScreen
       }
      else if(this.state.index == 1) AppComponent = GridViewScreen
      else if(this.state.index == 2) AppComponent = CardViewScreen
      else if(this.state.index == 3) AppComponent = ScrollViewScreen
      else if(this.state.index == 4) AppComponent = ModalViewScreen
      else AppComponent=ListViewScreen

    return (
      <Container>
        <Content >
        <AppComponent />
        </Content>
        <Footer>
          <FooterTab>
            <Button active={this.state.tabStatus1} onPress={() => this.switchScreen(0)}>
              <Text>List View</Text>
            </Button>
            <Button active={this.state.tabStatus2} onPress={() => this.switchScreen(1) }>
              <Text>Grid View</Text>
            </Button>
            <Button active={this.state.tabStatus3} onPress={() => this.switchScreen(2) }>
              <Text>Card View</Text>
            </Button>
            <Button active={this.state.tabStatus4} onPress={() => this.switchScreen(3) }>
              <Text>Scoll View</Text>
            </Button>
            <Button active={this.state.tabStatus5} onPress={() => this.switchScreen(4) }>
                <Text>
                    Modal View
                </Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
