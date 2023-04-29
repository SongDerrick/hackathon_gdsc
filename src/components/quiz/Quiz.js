import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Question from './Question'
import QuestionCount from './QuestionCount'
import AnswerOption from './AnswerOption'
import { media } from '../utils/_media-queries'
import { useState } from 'react';


const Wrapper = styled.div`
  margin: 1em 1em;
  z-index: 1;
  .row {
    margin: 0;
    ul {
      padding: 1em 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: flex-start;
      flex-grow: 1;
      ${media.largerPhone`margin: 0 .8em;`};
      ${media.tablet`flex-direction: row; padding-right: 1.5em;`};
      ${media.laptop`margin-top: 1rem;`};
    }
  }
`

const Quiz = props => {
  const [inputAnswer, setInputAnswer] = useState('');
  const handleInputAnswer = (event) => {
    setInputAnswer(event.target.value);
  }
  const goToNextQuestion = () => {
    const nextQuestionId = props.questionId + 1;
    props.setQuestionId(nextQuestionId);
  }
  return (
    <Wrapper key={props.questionId}>
      <QuestionCount counter={props.questionId} total={props.questionTotal} />
      <div className="w-100" />
      <Question content={props.question} />
      <div className="w-100" />
      <div className="row">
        <div className="col">
          <input type="text" id="answer" name="answer" placeholder="Please type your answer" onChange={handleInputAnswer} value={inputAnswer}/>
        </div>
      </div>
      <div className="col">
          <button onClick={goToNextQuestion}>Next</button>
      </div>
    </Wrapper>
  )
}

Quiz.PropTypes = {
  answer: PropTypes.string.isRequired,
  answerOptions: PropTypes.array.isRequired,
  counter: PropTypes.number.isRequired,
  question: PropTypes.string.isRequired,
  questionId: PropTypes.number.isRequired,
  questionTotal: PropTypes.number.isRequired,
  onAnswerSelected: PropTypes.func.isRequired
}

export default Quiz
