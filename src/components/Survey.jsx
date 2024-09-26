import { useState } from "react";
import AnswersList from "./AnswersList";

function Survey() {
  const [open, setOpen] = useState(false)
  const [answersList, setAnswersList] = useState([])
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [review, setReview] = useState("")
  const [color, setColor] = useState("")
  const [timeSpent, setTimeSpent] = useState([])
  const [editIndex, setEditIndex] = useState(null)


  const handleUsernameChange = (event) => setUsername(event.target.value)
  const handleEmailChange = (event) => setEmail(event.target.value)
  const handleReviewChange = (event) => setReview(event.target.value)
  const handleColorChange = (event) => setColor(event.target.value)
  
  const handleTimeSpentChange = (event) => {
    const { value, checked } = event.target
    if (checked) {
      setTimeSpent([...timeSpent, value])
    } else {
      setTimeSpent(timeSpent.filter((item) => item !== value))
    }
  }


  const handleSubmit = (event) => {
    event.preventDefault()

    const newAnswer = {
      username,
      email,
      review,
      color,
      timeSpent,
    }

    if (editIndex !== null) {
      // Update the answer being edited
      const updatedAnswers = [...answersList]
      updatedAnswers[editIndex] = newAnswer
      setAnswersList(updatedAnswers)
      setEditIndex(null)
    } else {
      setAnswersList([...answersList, newAnswer])
    }

    // Clear the form after submission
    setUsername("")
    setEmail("")
    setReview("")
    setColor("")
    setTimeSpent([])
  }

  const handleEdit = (index) => {
    const answer = answersList[index]
    setUsername(answer.username)
    setEmail(answer.email)
    setReview(answer.review)
    setColor(answer.color)
    setTimeSpent(answer.timeSpent)
    setEditIndex(index)
  }

  return (
    <main className="survey">
      <section className={`survey__list ${open ? "open" : ""}`}>
        <h2>Answers list</h2>
        <AnswersList answersList={answersList} onEdit={handleEdit} />
      </section>

      <section className="survey__form">
        <h2>Tell us what you think about your rubber duck!</h2>

        <form className="form" onSubmit={handleSubmit}>
          <div className="form__group radio">
            <h3>How do you rate your rubber duck colour?</h3>
            <ul>
              <li>
                <input
                  id="color-one"
                  type="radio"
                  name="color"
                  value="1"
                  checked={color === "1"}
                  onChange={handleColorChange}
                />
                <label htmlFor="color-one">1</label>
              </li>
              <li>
                <input
                  id="color-two"
                  type="radio"
                  name="color"
                  value="2"
                  checked={color === "2"}
                  onChange={handleColorChange}
                />
                <label htmlFor="color-two">2</label>
              </li>
              <li>
                <input
                  id="color-three"
                  type="radio"
                  name="color"
                  value="3"
                  checked={color === "3"}
                  onChange={handleColorChange}
                />
                <label htmlFor="color-three">3</label>
              </li>
              <li>
                <input
                  id="color-four"
                  type="radio"
                  name="color"
                  value="4"
                  checked={color === "4"}
                  onChange={handleColorChange}
                />
                <label htmlFor="color-four">4</label>
              </li>
            </ul>
          </div>

          <div className="form__group">
            <h3>How do you like to spend time with your rubber duck?</h3>
            <ul>
              <li>
                <label>
                  <input
                    name="spend-time"
                    type="checkbox"
                    value="swimming"
                    checked={timeSpent.includes("swimming")}
                    onChange={handleTimeSpentChange}
                  />
                  Swimming
                </label>
              </li>
              <li>
                <label>
                  <input
                    name="spend-time"
                    type="checkbox"
                    value="bathing"
                    checked={timeSpent.includes("bathing")}
                    onChange={handleTimeSpentChange}
                  />
                  Bathing
                </label>
              </li>
              <li>
                <label>
                  <input
                    name="spend-time"
                    type="checkbox"
                    value="chatting"
                    checked={timeSpent.includes("chatting")}
                    onChange={handleTimeSpentChange}
                  />
                  Chatting
                </label>
              </li>
              <li>
                <label>
                  <input
                    name="spend-time"
                    type="checkbox"
                    value="noTime"
                    checked={timeSpent.includes("noTime")}
                    onChange={handleTimeSpentChange}
                  />
                  I don't like to spend time with it
                </label>
              </li>
            </ul>
          </div>

          <label>
            What else have you got to say about your rubber duck?
            <textarea
              name="review"
              cols="30"
              rows="10"
              value={review}
              onChange={handleReviewChange}
            ></textarea>
          </label>

          <label>
            Put your name here (if you feel like it):
            <input
              type="text"
              name="username"
              value={username}
              onChange={handleUsernameChange}
            />
          </label>

          <label>
            Leave us your email pretty please??
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
            />
          </label>

          <input className="form__submit" type="submit" value="Submit Survey!" />
        </form>
      </section>
    </main>
  );
}

export default Survey;
