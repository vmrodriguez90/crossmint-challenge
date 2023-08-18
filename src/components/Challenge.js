import { ShapeFactory } from './Shape';
import React, { Component } from 'react';

class Challenge extends Component {

     constructor(props) {
        super(props);

        this.state = {
            goal: props.goal,
            done: props.done,
            pattern: props.patternFunction || (() => []),
            submit: props.submit || (() => []),
            renderMatrix: []
        };
    }
    

    solveChallenge() {
      const { goal, pattern } = this.state;
      let renderMatrix = pattern(goal);
      console.log(renderMatrix);
      this.setState({ renderMatrix });
    }
 
    render () { 
      const { renderMatrix, goal } = this.state;
      return (
      <>
        <section> 
          <h2>Challenge</h2>
          <p>Emulate this Map entirely</p>
          <div className='map'>
            {
              goal && goal.map((row, indexRow) => 
                (<div className='row' key={indexRow}>
                  {
                    row.map((column, indexColumn) => 
                      (new ShapeFactory()).getShape(column, indexRow, indexColumn).render()
                    )
                  }
                </div>)   
            )}
          </div>
        </section> 
        <section >
            {this.props.children}
            <button onClick={() => this.solveChallenge()}>RENDER CHALLENGE</button>
            {
              (<div className='map result'>
                {
                  renderMatrix && 
                  renderMatrix.map((row, indexRow) => 
                    (<div className='row' key={indexRow}>
                      {
                        row.map((column, indexColumn) => 
                          (new ShapeFactory()).getShape(column, indexRow, indexColumn).render()
                        )
                      }
                    </div>)   
                )}
              <button onClick={this.state.submit}>SUBMIT CHALLENGE</button>
              <button onClick={this.state.done}>MARK AS DONE</button>
              </div>
            )}
          </section>
        </>
        );
    }
  }
  
  export default Challenge;
  