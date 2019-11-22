import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Palette from './Palette';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import seedColors from './seedColors';
import NewPaletteForm from './NewPaletteForm';
import { generatePalette } from './colorHelpers';

class App extends Component {
  constructor(props) {
    super(props);
    const savePalettes = JSON.parse(window.localStorage.getItem("palettes"));
    this.state = { palettes: savePalettes || seedColors };
    this.savePalette = this.savePalette.bind(this);
    this.findPalette = this.findPalette.bind(this);
  }
  findPalette(id) {
    return this.state.palettes.find(function(palette){
      return palette.id === id;
    });
  }
  savePalette(newPalete) {
    this.setState(
      { palettes: [...this.state.palettes, newPalete] },  this.syncLocalstorage
    );
  }
  syncLocalstorage() {
    // save paletts to LS
    window.localStorage.setItem(
      "palettes", 
        JSON.stringify(this.state.palettes)
      );
  }
  render() {
    return (
      <Switch>
        <Route 
          exact 
          path="/palette/new" 
          render={(routeProps) =>
          <NewPaletteForm savePalette={this.savePalette} palettes={this.state.palettes} {...routeProps} />} 
        />
        <Route 
          path="/palette/:paletteId/:colorId" 
          render={routeProps => 
            <SingleColorPalette 
              colorId={routeProps.match.params.colorId}
              palette={generatePalette(
              this.findPalette(routeProps.match.params.paletteId)
            )} 
            />}
        />
        <Route 
          exact 
          path="/" 
          render={(pouteProps) => <PaletteList palettes={this.state.palettes} {...pouteProps} />} />
        <Route 
          exact 
          path="/palette/:id" 
          render={routeProps => 
            <Palette palette={generatePalette(
              this.findPalette(routeProps.match.params.id)
            )} 
            />} 
        />
      </Switch>
      // <div>
      //   <Palette palette={generatePalette(seedColors[4])} />
      // </div>
    );
  }
}

export default App;
