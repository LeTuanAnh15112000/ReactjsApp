import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getDataQuiz, postSubmitQuiz } from "../../service/apiService";
import _ from "lodash";
import "./DetailQuiz.scss";
import Question from "./Question";
import ModalResult from "./ModalResult";
const DetailQuiz = () => {
  const params = useParams();
  const quizId = params.id;
  const location = useLocation();
  const [dataQuiz, setDataQuiz] = useState([]);
  const [index, setIndex] = useState(0);
  const [isShowModalResult, setIsShowModalResult] = useState(false)
  const [dataModelResult, setDataModelResult] = useState({})

  useEffect(() => {
    fetchQuestions();
  }, [quizId]);

  const fetchQuestions = async () => {
    let res = await getDataQuiz(quizId);

    if (res && res.EC === 0) {
      let raw = res.DT;
      let data = _.chain(raw)
        .groupBy("id")
        .map((value, key) => {
          let answers = [];
          let questionDescription,
            image = null;
          value.forEach((item, index) => {
            if (index === 0) {
              questionDescription = item.description;
              image = item.image;
            }
            item.answers.isSelected = false;
            answers.push(item.answers);
          });
          return { questionId: key, answers, questionDescription, image };
        })
        .value();
      setDataQuiz(data);
    }
  };

  const handleNext = () => {
    if (dataQuiz.length > index + 1) {
      setIndex(index + 1);
    }
  };

  const handlePrev = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const handleCheckbox = (answerId, questionId) => {
    let dataQuizClone = _.cloneDeep(dataQuiz);

    let question = dataQuizClone.find(
      (item) => +item.questionId === +questionId
    );

    if (question && question.answers) {
      let result = question.answers.map((item) => {
        if (+item.id === +answerId) {
          item.isSelected = !item.isSelected;
        }
        return item;
      });
      question.answers = result;
    }

    let index = dataQuizClone.findIndex(
      (item) => +item.questionId === +questionId
    );

    if (index > -1) {
      dataQuizClone[index] = question;
      setDataQuiz(dataQuizClone);
    }
  };

  const handleFinish = async () => {
    let result = { quizId: +quizId, answers: [] };
    let answers = [];
    if (dataQuiz && dataQuiz.length > 0) {
      dataQuiz.forEach((question) => {
        let questionId = question.questionId;
        let userAnswerId = [];
        question.answers.forEach((item => {
          if(item.isSelected) {
            userAnswerId.push(item.id)
          }
        }))
        answers.push({
          questionId: +questionId,
          userAnswerId
        })
      })
    }
    result.answers = answers;

    // post api
    let res = await postSubmitQuiz(result);
    
    if(res && res.EC === 0 ) {
      setIsShowModalResult(true);
      setDataModelResult({
        countCorrect: res.DT.countCorrect,
        countTotal: res.DT.countTotal,
        quizData: res.DT.quizData
      })
    } else {
      alert('Something wrong...')
    }
  };

  return (
    <>
      <div className="detail-quiz-container">
        <div className="left-content">
          <div className="title">
            Quiz {quizId}: {location?.state?.quizTitle}
          </div>
          <hr />
          <div className="q-content">
            <Question
              handleCheckbox={handleCheckbox}
              index={index}
              data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []}
            />
          </div>
          <div className="footer">
            <button className="btn btn-secondary" onClick={handlePrev}>Prev</button>
            <button className="btn btn-primary" onClick={handleNext}>Next</button>
            <button className="btn btn-warning" onClick={handleFinish}>Finish</button>
          </div>
        </div>
        <div className="right-content">count down</div>
      </div>
      <ModalResult show={isShowModalResult} setShow= {setIsShowModalResult} dataModelResult={dataModelResult} />
    </>
  );
};

export default DetailQuiz;
