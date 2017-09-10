import React, { Component } from 'react';
import MultipleFileUpload from './components/multipleFileUpload/multipleFileUpload';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
class App extends Component {


  render() {

    return (
      <MuiThemeProvider>
        <MultipleFileUpload />
      </MuiThemeProvider>
    );
  }
}

export default App;