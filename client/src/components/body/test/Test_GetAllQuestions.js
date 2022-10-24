import React from 'react';
import { useEffect, useState } from 'react';

function Test_GetAllQuestions() {
  const [allQuestions, setAllQuestions] = useState([])

  const getAllQuestions = async () => {
    try {
      const res = await fetch('http://localhost:5000/question/all_infor')
      const jsonData = await res.json()
      setAllQuestions(jsonData)
    } catch (err) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    getAllQuestions()
  }, [])

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Module</th>
            <th>Number</th>
            <th>Question</th>
            <th>Correct</th>
            <th>Incorrect</th>
          </tr>
          {
            allQuestions.map(question => (
              <tr key={question._id}>
                <td>{question.module}</td>
                <td>{question.number}</td>
                <td>
                  <video controls width='100%'>
                    <source src={question.question} type='video/mp4' />
                  </video>
                </td>
                <td>{question.correct}</td>
                <td>{question.incorrect}</td>
              </tr>
            ))
          }
        </thead>
      </table>
    </div>
  )
}

export default Test_GetAllQuestions