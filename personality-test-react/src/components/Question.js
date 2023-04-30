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
      responseData: '',
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

    const response = await fetch('/chat', {
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
      this.setState({ responseData: data });
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });

    // const responseData = await response.json()


  
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
  async setNextQuestion() {
    const counter = this.state.counter + 1
    const questionId = this.state.questionId + 1
    this.setState({
      counter: counter,
      questionId: questionId,
      question: quizQuestions[counter].question,
      answer: ''
    })
  }

  async handleAnswerInputChange(event) {
    this.setState({ answer: event.target.value })
    
  }

  async handleAnswerSubmit(event) {
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
      console.log("The end")

      if(this.state.questionId == 15){
        console.log("챗 지피티 등장....")
        await this.handleSubmit(event)
      } else {
        console.log("api not called anymore")
      }
      
       // log all user answers
      
      // send userAnswers array to the server using an HTTP request
      // ... handle the HTTP request logic here
    }
    
    // ... handle the answer submission logic here
  }


  // ===========================================================================
  //                       render this question page
  // ===========================================================================
  render() {
    // if (resultBriggs) {
    //   return this.renderResult()
    // }
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
            <button type="submit" onSubmit = {this.handleSubmit}>Submit</button>
            {this.state.responseData && (
              <p style={{ overflowY: 'scroll', maxHeight: '200px' }}>
                Response Data: {this.state.responseData && JSON.stringify(this.state.responseData, null, 2).replace(/\\n/g, '')}
              </p>
            )}


          </form> 
        
          
        </QuestionCard>
        
      </Wrapper>
    )
  }
}

export default Question
