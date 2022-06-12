import './App.css';
import { useState } from 'react';
import Question from '../Question/Question';
import React from 'react';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

function App() {

  const [score, setScore] = useState(0);

  const [questionObj, setQuestionObj] = useState({
    question: "",
    answer: "",
    category: "",
    points: 0,
    showQuestion: false

  });

  const [showQuestion, setShowQuestion] = useState(false);

  const handleClickResetScore = (e) => {
    setScore(0);
  }

  const handleScore = (e) => {
    console.log(e.target.name);
    console.log(e.target.name === "inc" ? questionObj.points : questionObj.points * -1)
    let temp = questionObj.points;
    const tempScore = score + (e.target.name === "inc" ? temp : temp * -1);
    setScore(tempScore);
  }

  const handleToggle = (e) => {
    setShowQuestion(!showQuestion);
    setQuestionObj({ ...questionObj, showQuestion: !showQuestion })
  }

  const handleClickNewQuestion = async () => {
    const URL = "http://jservice.io/api/random";
    setShowQuestion(false);
    try {
      const result = await fetch(URL);
      const data = await result.json();
      console.log(data);
      if (!data[0].value || !data[0].answer || !data[0].question || !data[0].category.title) {
        console.log("tried again");
        handleClickNewQuestion();
      } else {
        const obj = {
          question: data[0].question,
          answer: data[0].answer,
          category: data[0].category.title,
          points: data[0].value,
          showQuestion: false
        }
        setQuestionObj(obj);
      }
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div className="App">
      <h1 className="app-title" >
        Jeopardy!
      </h1>
      <div>
        <Box  minWidth={(theme) => theme.breakpoints.values.lg}
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignContent: 'center',
            justifyContent: 'center',
            maxWidth: 1,
            height: 800,
            borderRadius: 1,
          }}
        >
          <Paper elevation={24}
            sx={{
              display: 'flex',
              maxWidth: .8,
              minWidth:.8,
              height: 600,
              p:1,
              alignContent: 'center',
              justifyContent: 'center',
              bgcolor: '#8E44BB',
            }}>
            <div>
              <h1>Score: {score}</h1>
              {
                showQuestion ?
                  <div className='right-wrong-container'>
                    <Button variant="contained" onClick={handleScore} color="success" name="inc">Got It Right</Button>
                    <Button variant="contained" onClick={handleScore} color="error" name="dec">Got It Wrong</Button>
                  </div>
                  :
                  <React.Fragment>
                  </React.Fragment>
              }
              <p />
              <div className='center-btn-container'>
                <Button variant="contained" onClick={handleClickNewQuestion}>Get A Random Trivia Question</Button>
              </div>
              <Question questionObj={questionObj} handleToggle={handleToggle} />
              <div className='reset-score-btn'>
                {
                  score !== 0 && <Button variant="contained" onClick={handleClickResetScore}>Reset Score</Button>
                }
              </div>
            </div>
          </Paper>
        </Box>
      </div>
    </div>
  );
}

export default App;
