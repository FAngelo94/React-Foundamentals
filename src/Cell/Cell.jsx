import React from 'react'
import PropTypes from 'prop-types'
import classname from 'classnames'
import './Cell.css'

export class Cell extends React.Component { //I can use React.PureComponent

  /**
   * Method to check if I want call render function of this component and
   * also the render function of its children (if this components has children)
   * @param {*} nextProps proprietà future
   */
  shouldComponentUpdate(nextProps){
    /** If I will use PureComponent we have an automatic check and I
        don't nead this function
        Advantage of use this function = I have more control about what check 
    */
    return this.props.mine !== nextProps.mine;
  }

  render(){
    const mine = this.props.mine;
    //const className = `cell ${isMasked ? 'is-masked' : ''}`;
    const className=classname('cell',{
      'is-masked': mine.isMasked
    });
    return (
      <button className={className}  onClick={
        this.props.onUnmask
      }>
        {mine.isMasked ? 'O': 'X'}
      </button>
    )
  }
  /*
    I want that Cell is "stupid", I put the login in the Game because Game knows the state of all cells
  constructor(props){
    super(props);
    this.state ={
      isMasked: props.mine.isMasked
    }
  }

  render(){
    const mine = this.props.mine;
    //const className = `cell ${isMasked ? 'is-masked' : ''}`;
    const className=classname('cell',{
      'is-masked': mine.isMasked
    })
    return (
      <button className={className} onClick={()=>{
        this.setState({isMasked: false});
      }}>
        {this.state.isMasked ? null: 'X'}
      </button>
    )
  }*/
}

// I can use propTypes in order to test the required field
Cell.propTypes = {
  mine: PropTypes.shape({
    isMasked:PropTypes.bool.isRequired,
  }).isRequired,
  onUnmask: PropTypes.func.isRequired,
};