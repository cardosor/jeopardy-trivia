import { useState } from 'react';

function Question({ questionObj, handleToggle}) {
    console.log(questionObj.question === "" ? "click to play" : "playing");
    return (
            questionObj.question === "" ?
                <h1>Click button to play!</h1>
            :
            <div className="question">
                <h1>Answer: {questionObj.question}</h1>
                <h1>Category: {questionObj.category}</h1>
                <h1>Points: {questionObj.points}</h1>
                {questionObj.showQuestion && <h1>Question: What is {questionObj.answer}</h1>}
                <button onClick={handleToggle}>Show Question!</button>
             </div>
    );
}

export default Question;