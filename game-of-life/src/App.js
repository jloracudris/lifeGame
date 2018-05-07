import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);    
    this.state = {
      neighbors: [],
      aliveStuff : [],
      rawNeighbors: [],
    }
  }

  componentDidMount() {
    this.seed();
  }

  seed() {
    this.setState({
      aliveStuff : [
        {
          x: 0,
          y: 0,
          isDead: false,
        },
        {
          x: 0,
          y: 1,
          isDead: false,
        },
        {
          x: 1,
          y: 0,
          isDead: false,
        },
        {
          x: 1,
          y: 3,
          isDead: false,
        },
        {
          x: 2,
          y: 1,
          isDead: false,
        },
        {
          x: 2,
          y: 2,
          isDead: false,
        },
      ]
    })
  }

  StartGame = () => {
    this.ExecuteSearch();     
    clearInterval(interval);    
    const interval = setInterval(this.Play, 1000);    
  }

  Play = () => {
    this.KillingRules();
  }


  SearchAndDestoy(seed) {
    const livingSeedsArray = this.state.aliveStuff;
    livingSeedsArray.forEach((el) => {      
      if (el.x === seed.x && el.y === seed.y && seed.neighborsCounter < 2) {
        el.isDead = true;
      }

      if (el.x === seed.x && el.y === seed.y && (seed.neighborsCounter === 2 || seed.neighborsCounter === 2)) {
        el.isDead = false;                
      }

      if (el.x === seed.x && el.y === seed.y && seed.neighborsCounter > 3) {
        el.isDead = true;
      }

    });
    return livingSeedsArray;
  }

  KillingRules = () => {
    let result = [];
    // first rule         
    const neighborArray = this.state.neighbors;
    neighborArray.forEach((seed) => {      
      result = this.SearchAndDestoy(seed, true);
    });    

    this.setState({
        aliveStuff: result
      });
  }

  ExecuteSearch = () => {
    this.findNeigbors().TopLeft();
    this.findNeigbors().Top();
    this.findNeigbors().TopRight();
    this.findNeigbors().LeftSibling();
    this.findNeigbors().RightSibling();
    this.findNeigbors().BottomLeft();
    this.findNeigbors().Bottom();
    this.findNeigbors().BottomRight();    
  }

  SumNeighbors = function (array, seed) {
      const findCoords = array.forEach((element) => {
        if (element.x === seed.x && element.y === seed.y) {          
            element.neighborsCounter++
        }
      });      
  }

  findNeigbors() {
    const self = this;    
    const arrayOfNeigbors = this.state.neighbors;
    const rawNeighbors = [];       
    const TopLeft = function() {
        self.state.aliveStuff.forEach((seed) => {
        // find top left
        const topLeftX = seed.x - 1;
        const topleftY = seed.y - 1;
        if (self.state.aliveStuff.find(z=>z.x === topLeftX && z.y === topleftY)) {
            if (arrayOfNeigbors.find(z=>z.x ===seed.x && z.y === seed.y)) {
              self.SumNeighbors(arrayOfNeigbors, seed);
            } else {              
              let neighbor = {
                x : seed.x,
                y: seed.y,
                neighborsCounter: 1, 
                neighborList: []       
              }

              const getNeighbor = self.state.aliveStuff.filter((el) => {
                return (z=>z.x === topLeftX && z.y === topleftY)
              });

              neighbor.neighborList = getNeighbor;

              
              arrayOfNeigbors.push(neighbor)
            }
        }
      });
    }

    const Top = function() {
        self.state.aliveStuff.forEach((seed) => {
        // find top left
        const topLeftX = seed.x - 1;
        const topleftY = seed.y;
        if (self.state.aliveStuff.find(z=>z.x === topLeftX && z.y === topleftY)) {
            if (arrayOfNeigbors.find(z=>z.x ===seed.x && z.y === seed.y)) {
              self.SumNeighbors(arrayOfNeigbors, seed.x, seed.y);
            } else {
              let neighbor = {
                x : seed.x,
                y: seed.y,
                neighborsCounter: 1, 
                neighborList: []       
              }

              const getNeighbor = self.state.aliveStuff.filter((el) => {
                return (z=>z.x === topLeftX && z.y === topleftY)
              });

              neighbor.neighborList = getNeighbor;

              neighbor.neighborList = getNeighbor;

              arrayOfNeigbors.push(neighbor)
            }
        }
      });
    }

    const TopRight = function() {
        self.state.aliveStuff.forEach((seed) => {
        // find top left
        const topLeftX = seed.x - 1;
        const topleftY = seed.y + 1;
        if (self.state.aliveStuff.find(z=>z.x === topLeftX && z.y === topleftY)) {
            if (arrayOfNeigbors.find(z=>z.x ===seed.x && z.y === seed.y)) {
              self.SumNeighbors(arrayOfNeigbors, seed.x, seed.y);
            } else {
              let neighbor = {
                x : seed.x,
                y: seed.y,
                neighborsCounter: 1, 
                neighborList: []       
              }

              const getNeighbor = self.state.aliveStuff.filter((el) => {
                return (z=>z.x === topLeftX && z.y === topleftY)
              });

              neighbor.neighborList = getNeighbor;
              arrayOfNeigbors.push(neighbor)
            }
        }
      });
    }

    const LeftSibling = function() {
        self.state.aliveStuff.forEach((seed) => {
        // find top left
        const topLeftX = seed.x;
        const topleftY = seed.y - 1;
        if (self.state.aliveStuff.find(z=>z.x === topLeftX && z.y === topleftY)) {
           if (arrayOfNeigbors.find(z=>z.x ===seed.x && z.y === seed.y)) {
              self.SumNeighbors(arrayOfNeigbors, seed.x, seed.y);
            } else {
              let neighbor = {
                x : seed.x,
                y: seed.y,
                neighborsCounter: 1, 
                neighborList: []       
              }

              const getNeighbor = self.state.aliveStuff.filter((el) => {
                return (z=>z.x === topLeftX && z.y === topleftY)
              });

              neighbor.neighborList = getNeighbor;
              arrayOfNeigbors.push(neighbor)
            }
        }
      });
    }

    const RightSibling = function() {
        self.state.aliveStuff.forEach((seed) => {
        // find top left
        const topLeftX = seed.x;
        const topleftY = seed.y + 1;
        if (self.state.aliveStuff.find(z=>z.x === topLeftX && z.y === topleftY)) {
            if (arrayOfNeigbors.find(z=>z.x ===seed.x && z.y === seed.y)) {
              self.SumNeighbors(arrayOfNeigbors, seed.x, seed.y);
            } else {
              let neighbor = {
                x : seed.x,
                y: seed.y,
                neighborsCounter: 1, 
                neighborList: []       
              }

              const getNeighbor = self.state.aliveStuff.filter((el) => {
                return (z=>z.x === topLeftX && z.y === topleftY)
              });

              neighbor.neighborList = getNeighbor;             
              arrayOfNeigbors.push(neighbor)
            }
        }
      });
    }

    const BottomLeft = function() {
        self.state.aliveStuff.forEach((seed) => {
        // find top left
        const topLeftX = seed.x + 1;
        const topleftY = seed.y - 1;
        if (self.state.aliveStuff.find(z=>z.x === topLeftX && z.y === topleftY)) {
            if (arrayOfNeigbors.find(z=>z.x ===seed.x && z.y === seed.y)) {
              self.SumNeighbors(arrayOfNeigbors, seed.x, seed.y);
            } else {
              let neighbor = {
                x : seed.x,
                y: seed.y,
                neighborsCounter: 1, 
                neighborList: []       
              }

              const getNeighbor = self.state.aliveStuff.filter((el) => {
                return (z=>z.x === topLeftX && z.y === topleftY)
              });

              neighbor.neighborList = getNeighbor;
              
              arrayOfNeigbors.push(neighbor)
            }
        }
      });
    }

    const Bottom = function() {
        self.state.aliveStuff.forEach((seed) => {
        // find top left
        const topLeftX = seed.x + 1;
        const topleftY = seed.y;
        if (self.state.aliveStuff.find(z=>z.x === topLeftX && z.y === topleftY)) {
            if (arrayOfNeigbors.find(z=>z.x ===seed.x && z.y === seed.y)) {
              self.SumNeighbors(arrayOfNeigbors, seed.x, seed.y);
            } else {
              let neighbor = {
                x : seed.x,
                y: seed.y,
                neighborsCounter: 1, 
                neighborList: []       
              }

              const getNeighbor = self.state.aliveStuff.filter((el) => {
                return (z=>z.x === topLeftX && z.y === topleftY)
              });

              neighbor.neighborList = getNeighbor;            
              arrayOfNeigbors.push(neighbor)
            }
        }
      });
    }


    const BottomRight = function() {        
        self.state.aliveStuff.forEach((seed) => {
        // find top left
        const topLeftX = seed.x + 1;
        const topleftY = seed.y + 1;
        if (self.state.aliveStuff.find(z=>z.x === topLeftX && z.y === topleftY)) {
            if (arrayOfNeigbors.find(z=>z.x ===seed.x && z.y === seed.y)) {
              self.SumNeighbors(arrayOfNeigbors, seed.x, seed.y);
            } else {
              let neighbor = {
                x : seed.x,
                y: seed.y,
                neighborsCounter: 1, 
                neighborList: []       
              }

              const getNeighbor = self.state.aliveStuff.filter((el) => {
                return (z=>z.x === topLeftX && z.y === topleftY)
              });

              neighbor.neighborList = getNeighbor;           
              arrayOfNeigbors.push(neighbor)
            }
        }
      });

      self.setState({
        neighbors: arrayOfNeigbors,
        rawNeighbors: arrayOfNeigbors
      })
    }

    return {
      TopLeft, 
      Top,
      TopRight,
      LeftSibling,
      RightSibling,
      BottomLeft,
      Bottom,
      BottomRight
    }
    

  }

  renderTable = () => {
    let table = []    

    // Outer loop to create parent
    for (let i = 0; i < 10; i++) {
      let children = []
      //Inner loop to create children
      for (let j = 0; j < 10; j++) {
        const findAliveStuff = this.state.aliveStuff.filter((elem) => {
          return elem.x === i && elem.y === j;
        })
        let styletd = "#FFFFFF";
        if (findAliveStuff.length > 0) {          
          styletd = "#259c00";
          if (findAliveStuff[0].isDead)
            styletd = "#FF0000";
        }

        children.push(<td bgcolor={styletd} key={j}>{`${i} , ${j}`}</td>)
      }
      //Create the parent and add the children
      table.push(<tr key={i}>{children}</tr>)
    }
    return table
  }

  render() {
    return (
      <div className="App">
        <table border='1'>
          <tbody>
          {this.renderTable()}
          </tbody>
        </table>
        <input type="submit" value="Play!" onClick={()=> this.StartGame()} />
      </div>
    );
  }
}

export default App;
