import React, {Component} from 'react';
import './App.css';
import { ReactComponent as MoreIcon} from './more.svg';
import { ReactComponent as LinkIcon} from './link.svg';
import {
  Window,
  TitleBar,
  ProgressCircle,
  Button,
  NavPane,
  NavPaneItem
} from 'react-desktop/windows';

class App extends Component {
  static defaultProps = {
    color: '#293742',
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
                    <Button
                    className="menubar-btn"
                    push color={this.props.color}
                    onClick={this.openMenu}
                    theme={this.state.theme}>
                        <MoreIcon width='15px' fill='white'/>
                    </Button>
                    MAPPIO
                </span>
            }
            background={this.props.color}
            onMinimizeClick={this.minimise}
            onMaximizeClick={this.toggleMaximise}
            onCloseClick={this.close}
            controls/>
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
            {this.renderItem('Settings', 'settings')}
          </NavPane>
      </Window>
    );
  }

  renderItem(title, contentUrl) {
    return (
      <NavPaneItem
        title={title}
        icon={<LinkIcon width='16px' fill='white'/>}
        theme={this.props.theme}
        background="#ffffff"
        selected={this.state.selected === title}
        onSelect={() => {
          this.setState({ selected: title });
          window.setContent({title, contentUrl});
        }}
        padding="10px 20px"
        push>
        <ProgressCircle color={this.props.color} />
      </NavPaneItem>
    );
  }
}

export default App;
