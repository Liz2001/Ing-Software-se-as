import React from 'react'
import { useEffect, useState } from 'react';

function Test_GetSingleQuestion() {
  const [singleQuestion, setSingleQuestion] = useState([])

  const getSingleQuestion = async (module, number) => {
    try {
      const res = await fetch(`http://localhost:5000/question/single_infor/${module}/${number}`)
      const jsonData = await res.json()
      setSingleQuestion(jsonData)
    } catch (err) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    getSingleQuestion('Principiante', '1')
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
            [singleQuestion].map(question => (
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

export default Test_GetSingleQuestion