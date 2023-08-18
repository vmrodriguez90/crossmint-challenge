import logo from './logo.png';
import './App.css';
import MatrixUtils from './utils/MatrixUtils';
import MegaverseAPI from './services/MegaverseAPI';
import Challenge from './components/Challenge';
import React, { useState } from 'react';
import { ShapeFactory } from './components/Shape';
import ShapeController from './controllers/ShapeController';

function App() {
  const [error, setError] = useState(null);
  const [firstChallenge, setFirstResult] = useState(false);
  const [secondChallenge, setSecondResult] = useState(false);
  const megaverseAPI = new MegaverseAPI(process.env.REACT_APP_CANDIDATE_ID);
  const shapeFactory =  new ShapeFactory();
  const shapeController = new ShapeController(megaverseAPI);

  const renderFirstChallenge = (goal) => {
    let matrix = MatrixUtils.generateCharacterMatrix(goal.length);
    const indexes = MatrixUtils.getDiagonalIndexes(matrix.length, 2).mainDiagonal.concat(MatrixUtils.getDiagonalIndexes(matrix.length, 2).secondaryDiagonal);
    indexes.forEach((index) => {
      matrix[index[0]][index[1]] = 'POLYANET';
    });
    
    return matrix;
  }

  const renderSecondChallenge = (goal) => {
    let matrix = MatrixUtils.generateCharacterMatrix(goal.length); 
    for(let i = 0; i < goal.length; i++) {
      if(!shapeFactory.containsShape(goal[i].join(''))) continue;
      for(let j = 0; j < goal[i].length; j++) {
        if(!shapeFactory.containsShape(goal[i][j])) continue;
        matrix[i][j] = goal[i][j];
      }
    }
    return matrix;
  }

  const submitFirstChallenge = async () => {
    const response = await megaverseAPI.getGoalMap();
    const indexes = MatrixUtils.getDiagonalIndexes(response.goal.length, 2).mainDiagonal.concat(MatrixUtils.getDiagonalIndexes(response.goal.length, 2).secondaryDiagonal);
    indexes.forEach((index) => {
      //For each Index either principal diagonal or reverse 
      const shape = shapeFactory.getShape("POLYANET", index[0], index[1]);
      //Create Shape on [I:J with the configuration from the Object
      shapeController.createShape(shape);
    });
  }
  const submitSecondChallenge = async () => {
    const response = await megaverseAPI.getGoalMap();
    for(let i = 0; i < response.goal.length; i++) {
      //If row has no shape, then continue
      if(!shapeFactory.containsShape(response.goal[i].join(''))) continue;
      for(let j = 0; j < response.goal[i].length; j++) {
        //If column has no shape, then continue
        if(!shapeFactory.containsShape(response.goal[i][j])) continue;
        //Obtain Shape from Shape Factory  
        console.log(`FIGURE: ${response.goal[i][j]} ${i}:${j}`);
        const shape = shapeFactory.getShape(response.goal[i][j], i, j);
        console.log('FIGURE:', shape.symbol);
        //Create Shape on [I:J] with the configuration from the Object
        shapeController.createShape(shape);
      }
    }    
  }

  const resetMap = async function fetchFirstChallengeResult() {
    try {
      const matrix = await megaverseAPI.getGoalMap();
      await megaverseAPI.resetMap(matrix.goal.length);
    } catch (error) {
      setError(error);
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <img src={logo} className="app-logo" alt="logo" />
        <p>
        Megaverse Master Challenge
        </p>
        <div>
        <button className='white' onClick={resetMap}>Reset Map</button>

        </div>
      </header>
      <section>
          {
            !error && !firstChallenge && MatrixUtils.FIRST_CHALLENGE && 
            (<Challenge submit={submitFirstChallenge} goal={MatrixUtils.FIRST_CHALLENGE} patternFunction={renderFirstChallenge} done={() => setFirstResult(true)} >
               <section >
                <h2>Solution to First Challenge</h2>
                <p>To solve the challenge of creating a cross in the middle of a matrix, I followed a simple strategy. </p> 
                  <p>First, I determined how much padding was required to create the cross.</p>
                  <code>
                    <br/>goal_matrix_size = {MatrixUtils.FIRST_CHALLENGE.length}                    
                    <br/>padding = {MatrixUtils.getMatrixPadding(MatrixUtils.FIRST_CHALLENGE)} 
                    <br/>check the matrix until find a diff element than SPACE
                  </code> 
                  <p>Then, I updated the matrix by adding the appropriate values along the two diagonals that form the cross.</p> 
                  <code>
                    USING POST /api/polyanets to update the values coming from the indexes calculated with the diagonal
                    <br/> indexes = {JSON.stringify(MatrixUtils.getDiagonalIndexes(MatrixUtils.FIRST_CHALLENGE.length, MatrixUtils.getMatrixPadding(MatrixUtils.FIRST_CHALLENGE)))} 
                  </code>
                  <p>By making these updates with the indexes, I successfully generated the desired cross shape within the matrix.</p>
                  <br/>
                  <br/>
              </section>
            </Challenge>)       
          }
      </section> 
      <section>
          {
            !error && !secondChallenge && MatrixUtils.SECOND_CHALLENGE && 
            (<Challenge submit={submitSecondChallenge} goal={MatrixUtils.SECOND_CHALLENGE} patternFunction={renderSecondChallenge} done={() => setSecondResult(true)} >
               <section >
                <h2>Solution to Second Challenge</h2>
                <p>To solve the challenge of creating the logo of CrossMint Plus different commets and moons, I followed a simple strategy. </p> 
                  <br/>While looping into the matrix, I can Identify where there are calls to make and update those values, in other words, to render an specific item
                  <br/><code>
                    for(let row of goal)
                    <br/> I can identify here if the row has any other than SPACE
                    <br/> row indexOf(//anyotherstuff than Space), 
                    <br/> then go ahead and start going throught the array and pushing the renderings to the server

                    
                  </code>
              </section>
            </Challenge>)       
          }
      </section> 
        {error && <p>Error: {error.message}</p>}
      
    </div>
  );
}

export default App;
