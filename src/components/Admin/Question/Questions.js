import { useEffect, useState } from "react";
import Select from "react-select";
import { BsPatchPlusFill } from "react-icons/bs";
import { BsPatchMinusFill } from "react-icons/bs";
import { RiImageAddFill } from "react-icons/ri";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { AiFillPlusSquare } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import Lightbox from "react-awesome-lightbox";
import {
  getAllQuizForAdmin,
  postCreateNewQuestionForQuiz,
  postCreateNewAnswerForQuestion,
} from "../../../service/apiService";
import "./Questions.scss";
import { toast } from "react-toastify";

const Questions = () => {
  const [isPreviewImage, setIsPreviewImage] = useState(false);
  const [dataImagePreview, setDataImagePreview] = useState({
    title: "",
    url: "",
  });
  const [removeImageUrl, setRemoveImageUrl] = useState();
  const [listQuiz, setListQuiz] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState({});
  const initQuestions = [
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
  ]

  const [questions, setQuestions] = useState(initQuestions);

  useEffect(() => {
    fetchQuiz();
  }, []);

  const fetchQuiz = async () => {
    let res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      let newQuiz = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id}-${item.description}`,
        };
      });
      setListQuiz(newQuiz);
    }
  };

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(dataImagePreview.url);
    };
  }, [dataImagePreview.url, removeImageUrl]);

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
    setRemoveImageUrl(questionClone[index].imageFile);
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

  const handlePreviewImage = (questionId) => {
    let questionClone = _.cloneDeep(questions);
    let index = questionClone.findIndex((item) => item.id === questionId);
    if (index > -1) {
      setDataImagePreview({
        title: questionClone[index].imageName,
        url: URL.createObjectURL(questionClone[index].imageFile),
      });
      setIsPreviewImage(true);
    }
  };

  const handleSubmitQuestionForQuiz = async () => {
    //validate
    if(_.isEmpty(selectedQuiz)) {
      toast.error("Please choose a Quiz!");
      return;
    }

    let isValidQuestion = true, indexQ = 0;
    for(let i=0; i< questions.length; i++) {
      if(!questions[i].description) {
        indexQ = i;
        isValidQuestion = false;
        break;
      }
    }
    if(isValidQuestion === false) {
      toast.error(`Not empty description for Question ${indexQ + 1}`)
      return;
    }

    let isValidAnswers = true;
    let indexQuestion = 0, indexAnswer = 0
    for(let i=0; i< questions.length; i++) {
      for(let j = 0; j < questions[i].answers.length; j++) {
        if(!questions[i].answers[j].description) {
          isValidAnswers = false;
          indexAnswer = j;
          break;
        }
      }
      indexQuestion = i;
      if(isValidAnswers === false) {
        break
      }
    }

    if(isValidAnswers === false) {
      toast.error(`Not empty Answer ${indexAnswer + 1} at Question ${indexQuestion + 1}`)
      return;
    }

    //handle submit
    for(const question of questions) {
      const resQuestion = await postCreateNewQuestionForQuiz(+selectedQuiz.value, question.description, question.imageFile);
      for(const answer of question.answers) {
        await postCreateNewAnswerForQuestion(answer.description, answer.isCorrect, resQuestion.DT.id);
      }
    }

    toast.success('Create question and answer succeed!')
    setQuestions(initQuestions);
  };

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
            options={listQuiz}
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
                        {question.imageName ? (
                          <span
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              handlePreviewImage(question.id);
                            }}
                          >
                            {question.imageName}
                          </span>
                        ) : (
                          "0 file is uploaded"
                        )}
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
              <button
                className="btn btn-warning"
                onClick={() => handleSubmitQuestionForQuiz()}
              >
                Save Questions
              </button>
            </div>
          )}
          {isPreviewImage === true && (
            <Lightbox
              image={dataImagePreview.url}
              title={dataImagePreview.title}
              onClose={() => setIsPreviewImage(false)}
            ></Lightbox>
          )}
        </div>
      </div>
    </div>
  );
};

export default Questions;
