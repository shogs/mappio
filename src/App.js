import React, {Component} from 'react';
import './App.css';
import {
  Window,
  TitleBar,
  //Text,
  Button,
  NavPane,
  NavPaneItem
} from 'react-desktop/windows';
//const { remote } = require("electron");

// function getCurrentWindow() {
//   return remote.getCurrentWindow();
// }

class App extends Component {
  static defaultProps = {
    color: '#323233',
    theme: 'dark'
  };

  constructor(props) {
      super(props);
      this.state = {
          isMaximised: false
      };
  }

  close = () => window.closeWindow();
  minimise = () => window.minimizeWindow();
  toggleMaximise = () => {
      window.maxUnmaxWindow();
      this.setState({isMaximised: window.isWindowMaximized()});
  }
  openMenu = (e) => window.openMenu(e.x, e.y);

  render() {
    return (
      <Window
        color={this.props.color}
        theme={this.props.theme}
        chrome
        className='winblow'>
          <TitleBar
            title={
                <span>
                    <Button className="menubar-btn" push color={this.props.color} onClick={this.openMenu} theme={this.state.theme}>
                        <i className="fas fa-bars"></i>
                    </Button>

                    {/* <button class="menubar-btn" onClick={this.openMenu}></button> */}
                    My Awesome App
                </span>
            }
            background={this.props.color}
            onMinimizeClick={this.minimise}
            onMaximizeClick={this.toggleMaximise}
            onCloseClick={this.close}
            controls/>
          {/* <Text color={this.props.theme === 'dark' ? 'white' : '#333'}>
            Hello World
          </Text> */}
          <NavPane
            openLength={200}
            defaultIsPaneExpanded={false}
            push
            canPaneToggle={true}
            color={this.props.color}
            theme={this.props.theme}>
            {this.renderItem('Item 1', 'https://github.com')}
            {this.renderItem('Item 2', 'https://electronjs.org')}
            {this.renderItem('Item 3', 'http://localhost:3000')}
          </NavPane>
      </Window>
    );
  }

  renderItem(title, contentUrl) {
    return (
      <NavPaneItem
        title={title}
        //icon={this.renderIcon(title)}
        icon={this.defaultIcon()}
        theme={this.props.theme}
        background="#ffffff"
        selected={this.state.selected === title}
        onSelect={() => {
          this.setState({ selected: title });
          window.setContent(contentUrl);
        }}
        padding="10px 20px"
        push>
        {/* <Text>{content}</Text> */}
      </NavPaneItem>
    );
  }

  defaultIcon = () => (
    <svg x="0px" y="0px" width="16px" height="16px" viewBox="0 0 16 16">
          <path fill="#ffffff" fill-rule="evenodd" clip-rule="evenodd" d="M4.99,11.99c0.28,0,0.53-0.11,0.71-0.29l6-6c0.18-0.18,0.29-0.43,0.29-0.71
            c0-0.55-0.45-1-1-1c-0.28,0-0.53,0.11-0.71,0.29l-6,6c-0.18,0.18-0.29,0.43-0.29,0.71C3.99,11.54,4.44,11.99,4.99,11.99z
            M8.84,9.97l-2.44,2.44l-1,1l-0.01-0.01c-0.36,0.36-0.85,0.6-1.4,0.6c-1.1,0-2-0.9-2-2c0-0.55,0.24-1.04,0.6-1.4l-0.01-0.01l1-1
            l2.44-2.44C5.69,7.05,5.35,6.99,4.99,6.99c-1.1,0-2.09,0.46-2.81,1.19L2.16,8.16l-1,1l0.02,0.02c-0.73,0.72-1.19,1.71-1.19,2.81
            c0,2.21,1.79,4,4,4c1.1,0,2.09-0.46,2.81-1.19l0.02,0.02l1-1L7.8,13.8c0.73-0.72,1.19-1.71,1.19-2.81
            C8.99,10.64,8.93,10.3,8.84,9.97z M15.99,3.99c0-2.21-1.79-4-4-4c-1.1,0-2.09,0.46-2.81,1.19L9.16,1.16l-1,1l0.02,0.02
            C7.46,2.9,6.99,3.89,6.99,4.99c0,0.36,0.06,0.69,0.15,1.02l2.44-2.44l1-1l0.01,0.01c0.36-0.36,0.85-0.6,1.4-0.6c1.1,0,2,0.9,2,2
            c0,0.55-0.24,1.04-0.6,1.4l0.01,0.01l-1,1L9.97,8.84c0.33,0.09,0.67,0.15,1.02,0.15c1.1,0,2.09-0.46,2.81-1.19l0.02,0.02l1-1
            L14.8,6.8C15.53,6.08,15.99,5.1,15.99,3.99z"/>
    </svg>
  )
}

export default App;
