import Button from '@mui/material/Button';
import React from 'react';

function Question({ questionObj, handleToggle}) {
    console.log(questionObj.question === "" ? "click to play" : "playing");
    return (
        <React.Fragment>
            {
                questionObj.question === "" ?
                    <h1>Click button to play!</h1>
                :
                    <React.Fragment>
                    <h1>Answer: {questionObj.question}</h1>
                    <h1>Category: {questionObj.category}</h1>
                    <h1>Points: {questionObj.points}</h1>
                    <div className='center-btn-container'>
                    <Button variant="contained" onClick={handleToggle}>Show Question!</Button>
                    </div>
                    {questionObj.showQuestion && <h1>Question:{questionObj.answer}</h1>}
                </React.Fragment>
            }
        </React.Fragment>
    );
}

export default Question;