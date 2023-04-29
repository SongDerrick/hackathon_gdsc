import React, { Component } from 'react'
import styled from 'styled-components'
import { colors } from '../components/utils/_var'
import Quiz from '../components/quiz/Quiz'
import Results from '../components/result/Results'
import quizQuestions from '../api/quizQuestions'
import { QuestionCard } from '../components/utils/Cards'

const Wrapper = styled.div`
  position: fixed;
  min-height: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${colors.$colorBg};
`

class Question extends Component {
  constructor(props) {
    super(props)
    this.state = {
      counter: 0,
      questionId: 1,
      question: '',
      answer: '',
      userAnswers: [] // new array to store user answers
    }
  }

  // populate app’s state using the componentWillMount life cycle event
  componentWillMount() {
    this.setState({
      question: quizQuestions[0].question
    })
  }

  async handleSubmit(event) {
    event.preventDefault();

    fetch('/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: this.state.userAnswers
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });

  
    // axios.post('/', this.state.userAnswers)
    //   .then(res => {
    //     console.log(res);
    //     // do something with the server response
    //   })
    //   .catch(err => {
    //     console.log(err);
    //     // handle error
    //   });
  }

  // increment the counter and questionId state
  setNextQuestion() {
    const counter = this.state.counter + 1
    const questionId = this.state.questionId + 1
    this.setState({
      counter: counter,
      questionId: questionId,
      question: quizQuestions[counter].question,
      answer: ''
    })
  }

  handleAnswerInputChange(event) {
    this.setState({ answer: event.target.value })
    
  }

  handleAnswerSubmit(event) {
    event.preventDefault()
    console.log('User answer:', this.state.answer)
    const userAnswers = [...this.state.userAnswers, this.state.answer] // add current answer to userAnswers array
    console.log(this.props.answer)
    this.setState({ userAnswers })


    if(this.state.questionId < quizQuestions.length){
      this.setNextQuestion()
       // update userAnswers state
      console.log(userAnswers)
    } else {
      console.log("User answers:", this.state.userAnswers)
      console.log("THe end")
      
       // log all user answers
      this.handleSubmit(event)
      // send userAnswers array to the server using an HTTP request
      // ... handle the HTTP request logic here
    }
    
    // ... handle the answer submission logic here
  }

  // ===========================================================================
  //                       render this question page
  // ===========================================================================
  render() {
    let resultBriggs = this.state.resultBriggs
    if (resultBriggs) {
      return this.renderResult()
    }
    return (
      <Wrapper className="container">
        <QuestionCard>
          <div className="corner" />
          <div className="corner" />
          <div className="corner" />
          <div className="corner" />
          <Quiz
            questionId={this.state.questionId}
            question={this.state.question}
            questionTotal={quizQuestions.length}
          />

          <form className='cen' onSubmit={(event) => this.handleAnswerSubmit(event)}>
            <input
              id="user_output"
              type="text"
              value={this.state.answer}
              onChange={(event) => this.handleAnswerInputChange(event)}
            />
            <button type="submit">Submit</button>
          </form> 
        
          
        </QuestionCard>
      </Wrapper>
    )
  }
}

export default Question
