import React from 'react';
import Test_GetAllQuestions from './Test_GetAllQuestions';
import Test_GetSingleQuestion from './Test_GetSingleQuestion';

function Test() {
  /*
  const [allQuestions, setAllQuestions] = useState([])
  const [singleQuestion, setSingleQuestion] = useState([])
  const [allModules, setAllModules] = useState([])

  const getAllQuestions = async () => {
    try {
      const res = await fetch('http://localhost:5000/question/all_infor')
      const jsonData = await res.json()
      setAllQuestions(jsonData)
    } catch (err) {
      console.error(err.message)
    }
  }

  const getSingleQuestion = async (module, number) => {
    try {
      const res = await fetch(`http://localhost:5000/question/single_infor/${module}/${number}`)
      const jsonData = await res.json()
      setSingleQuestion(jsonData)
    } catch (err) {
      console.error(err.message)
    }
  }

  const getAllModules = async () => {
    try {
      const res = await fetch('http://localhost:5000/modules/all_infor')
      const jsonData = await res.json()
      setAllModules(jsonData)
    } catch (err) {
      console.error(err.message)
    }
  }

  const updateStatus = async (id, avaliable, completed) => {
    try {
      const res = await fetch(`http://localhost:5000/module/update/${id}`, {
        avaliable: avaliable, completed: completed
      })
    } catch (err) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    getAllQuestions()
    //getSingleQuestion('Principiante', '1')
    //getAllModules()
    //updateStatus('1', 'false', 'false')
  }, [])
  */

  return (
    <div>
      <Test_GetAllQuestions />
      <Test_GetSingleQuestion />
    </div>
    /*
    <div>
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
            <tr>
              <td>{singleQuestion.module}</td>
              <td>{singleQuestion.number}</td>
              <td>
                <video controls width='100%'>
                  <source src={singleQuestion.question} type='video/mp4' />
                </video>
              </td>
              <td>{singleQuestion.correct}</td>
              <td>{singleQuestion.incorrect}</td>
            </tr>
          </thead>
        </table>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Description</th>
              <th>Avaliable</th>
              <th>Completed</th>
            </tr>
            {
              allModules.map(module => (
                <tr key={module._id}>
                  <td>{module.id}</td>
                  <td>{module.title}</td>
                  <td>{module.description}</td>
                  <td>{module.avaliable}</td>
                  <td>{module.completed}</td>
                </tr>
              ))
            }
          </thead>
        </table>
      </div>
    </div>
    */
  )
}

export default Test