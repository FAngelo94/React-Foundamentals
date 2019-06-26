import React from 'react'
import './Game.css'
import { Cell } from '../Cell/Cell';

function range(n){
  return Array.from({length: n}, (_, i) => i);
}

export class Game extends React.Component {
  // state = {count: 0} -> Instead of create constructor and set state we can set the state
  //here like global variable in Java. It is good to do so only when we do simple declaration

  constructor(props){
    super(props);
    this.state = {
      grid: this.makeGrid(this.props.rows, this.props.cols)
    }
  }

  makeGrid(rows, cols){
    const grid = range(rows).map( x =>
      range(cols).map( y =>
      ({isMasked: true}),
      ));
    return grid;
  }

  handleonUnmask = (a, b) =>{ //Usando questa tipologia di arrow function this non perde il contesto (da ES2018)
    //Safe mode to change state
    this.setState(state => ({
      grid: state.grid.map((row,x) => {
        if(a!==x) return row;
        return row.map((mine,y)=>{
        if(b!==y) return mine;
        return {
          ...mine,//Copio tutte le proprietà dell'elemento vecchio in quello nuovo
          isMasked:false} //Sovrascrivo la proprietà isMasked
      })},
    ),
    }));
    //Change state in standard way
    /*this.setState({
      grid: this.state.grid.map((row,x) => {
        if(a!==x) return row;
        return row.map((mine,y)=>{
        if(b!==y) return mine;
        return {
          ...mine,//Copio tutte le proprietà dell'elemento vecchio in quello nuovo
          isMasked:false} //Sovrascrivo la proprietà isMasked
      })},
    ),
    });*/
  }

  render() {
    return (
    <div className="game">
      <div className="grid" style={{
        gridTemplateColumns: `repeat(${this.props.cols}, 4rem)`,
        gridTemplateRows: `repeat(${this.props.rows}, 4rem)`
      }}>
        {this.state.grid.map((row,x) =>{
          return row.map((mine,y)=>{
            // è importante usare le key per identificare in maniera univoca gli elementi di una lista
            return <Cell mine={mine} onUnmask={()=>this.handleonUnmask(x,y)} key={`${x}-${y}`}/>
          })
        })}
      </div>
    </div>
    );
  }
  

}