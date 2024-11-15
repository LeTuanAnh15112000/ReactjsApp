import { useState } from "react";
import Select from "react-select";
import { BsPatchPlusFill } from "react-icons/bs";
import { BsPatchMinusFill } from "react-icons/bs";
import { RiImageAddFill } from "react-icons/ri";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { AiFillPlusSquare } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import "./Questions.scss";

const Questions = () => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const [selectedQuiz, setSelectedQuiz] = useState({});

  const [questions, setQuestions] = useState([
    {
      id: uuidv4(),
      description: "",
      imageFile: "",
      imageName: "",
      answers: [
        {
          id: uuidv4(),
          description: "",
          isCorrect: false,
        },
      ],
    },
  ]);

  const handleAddRemoveQuestion = (type, id) => {
    if (type === "ADD") {
      const newQuestion = {
        id: uuidv4(),
        description: "",
        imageFile: "",
        imageName: "",
        answers: [
          {
            id: uuidv4(),
            description: "",
            isCorrect: false,
          },
        ],
      };
      setQuestions([...questions, newQuestion]);
    }
    if (type === "REMOVE") {
      let questionClone = _.cloneDeep(questions);
      questionClone = questionClone.filter((item) => item.id !== id);
      setQuestions(questionClone);
    }
  };

  const handleAddRemoveAnswer = (type, questionId, answerId) => {
    let questionClone = _.cloneDeep(questions);
    let index = questionClone.findIndex((item) => item.id === questionId);
    if (type === "ADD") {
      const newAnswer = {
        id: uuidv4(),
        description: "",
        isCorrect: false,
      };
      questionClone[index].answers.push(newAnswer);
      setQuestions(questionClone);
    }
    if (type === "REMOVE") {
      questionClone[index].answers = questionClone[index].answers.filter(
        (answer) => answer.id !== answerId
      );
      setQuestions(questionClone);
    }
  };

  const handleOnChange = (type, questionId, value) => {
    if (type === "QUESTION") {
      let questionClone = _.cloneDeep(questions);
      let index = questionClone.findIndex((item) => item.id === questionId);
      if (index > -1) {
        questionClone[index].description = value;
      }
      setQuestions(questionClone);
    }
  };

  const handleOnChangeFileQuestion = (questionId, event) => {
    let questionClone = _.cloneDeep(questions);
    let index = questionClone.findIndex((item) => item.id === questionId);
    if (
      index > -1 &&
      event.target &&
      event.target.files &&
      event.target.files[0]
    ) {
      questionClone[index].imageFile = event.target.files[0];
      questionClone[index].imageName = event.target.files[0].name;
    }
    setQuestions(questionClone);
  };

  const handleAnswerQuestion = (type, answerId, questionId, value) => {
    let questionClone = _.cloneDeep(questions);
    let index = questionClone.findIndex((item) => item.id === questionId);
    if (index > -1) {
      questionClone[index].answers = questionClone[index].answers.map(
        (answer) => {
          if (answer.id === answerId) {
            if (type === "CHECKBOX") {
              answer.isCorrect = value;
            }
            if (type === "INPUT") {
              answer.description = value;
            }
          }
          return answer;
        }
      );
    }
    setQuestions(questionClone);
  };

  const handleSubmitQuestionForQuiz = () => {
    console.log('question', questions);
  }

  return (
    <div className="questions-container">
      <div className="title">Manage Questions</div>
      <hr />
      <div className="add-new-question">
        <div className="col-6 form-group">
          <label>Select Quiz:</label>
          <Select
            defaultValue={selectedQuiz}
            onChange={setSelectedQuiz}
            options={options}
          />
        </div>
        <div className="mt-5 mb-2">Add questions:</div>
        <div className="q-main">
          {questions &&
            questions.length > 0 &&
            questions.map((question, index) => {
              return (
                <div className="q-block" key={question.id}>
                  <div className="questions-content">
                    <div className="form-floating description">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Description"
                        value={question.description}
                        onChange={(event) =>
                          handleOnChange(
                            "QUESTION",
                            question.id,
                            event.target.value
                          )
                        }
                      />
                      <label>Question{index + 1}'s Description</label>
                    </div>
                    <div className="group-upload">
                      <label
                        className="label-upload"
                        htmlFor={`${question.id}`}
                      >
                        <RiImageAddFill className="label-up" />
                      </label>
                      <input
                        type="file"
                        hidden
                        id={question.id}
                        onChange={(event) =>
                          handleOnChangeFileQuestion(question.id, event)
                        }
                      />
                      <span>
                        {question.imageName
                          ? question.imageName
                          : "0 file is uploaded"}
                      </span>
                    </div>
                    <div className="btn-add">
                      <span onClick={() => handleAddRemoveQuestion("ADD", "")}>
                        <BsPatchPlusFill className="icon-add" />
                      </span>
                      {questions.length > 1 && (
                        <span
                          onClick={() =>
                            handleAddRemoveQuestion("REMOVE", question.id)
                          }
                        >
                          <BsPatchMinusFill className="icon-remove" />
                        </span>
                      )}
                    </div>
                  </div>
                  {question.answers &&
                    question.answers.length > 0 &&
                    question.answers.map((answer, index) => {
                      return (
                        <div className="answers-content" key={answer.id}>
                          <input
                            className="form-check-input iscorrect"
                            type="checkbox"
                            checked={answer.isCorrect}
                            onChange={(event) =>
                              handleAnswerQuestion(
                                "CHECKBOX",
                                answer.id,
                                question.id,
                                event.target.checked
                              )
                            }
                          />
                          <div className="form-floating anwser-name">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Description"
                              value={answer.description}
                              onChange={(event) =>
                                handleAnswerQuestion(
                                  "INPUT",
                                  answer.id,
                                  question.id,
                                  event.target.value
                                )
                              }
                            />
                            <label>Answers {index + 1}</label>
                          </div>
                          <div className="btn-group">
                            <span
                              onClick={() =>
                                handleAddRemoveAnswer("ADD", question.id, "")
                              }
                            >
                              <AiFillPlusSquare className="icon-add" />
                            </span>
                            {question.answers.length > 1 && (
                              <span
                                onClick={() =>
                                  handleAddRemoveAnswer(
                                    "REMOVE",
                                    question.id,
                                    answer.id
                                  )
                                }
                              >
                                <AiOutlineMinusCircle className="icon-remove" />
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                </div>
              );
            })}
          {questions && questions.length > 0 && (
            <div className="mt-3">
              <button className="btn btn-warning" onClick={() => handleSubmitQuestionForQuiz()}>Save Questions</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Questions;
