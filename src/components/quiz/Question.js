import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { fonts } from '../utils/_var'


const Wrapper = styled.div`
  .row {
    margin: 1rem 0;
    .col {
      padding: 1rem;
      h1 {
        font-size: 1.3rem;
        font-family: ${fonts.$mainFont};
        text-align: center;
      }
    }
  }
`

const Question = props => {


  return (
    <Wrapper>
      <div className="row">
        <div className="col">
          <h1>{props.content}</h1>
        </div>
      </div>
      <div className="row">
        {/* <div className="col">
          <button onClick={handlePrevious}>Previous</button>
        </div>
        <div className="col">
          <button onClick={handleNext}>Next</button>
        // </div> */}
      </div>
    </Wrapper>
  )
}


Question.PropTypes = {
  content: PropTypes.string.isRequired,
  counter: PropTypes.number.isRequired
}



export default Question
