import _ from "lodash";
const Question = (props) => {
  const { index, data, handleCheckbox } = props;
  
  if(_.isEmpty(data)) {
    return (<></>)
  }

  const handleGetCheckbox = (event, answerId, questionId) => {
    let isChecked = event.target.checked;
    // console.log(answerId, questionId);
    handleCheckbox(answerId, questionId);
  }

  // console.log(data);
  // console.log(data.answers);
  // console.log(data.answers);
  
  return (
    <>
      <div className="q-image">
       {data.image && <img src={`data:image/jpeg;base64,${data.image}`} />}
      </div>
      <div className="question">Question {index + 1}: {data.questionDescription}</div>
      <div className="answer">
        <ul className="answer-list">

        {data.answers && data.answers.length && data.answers.map((item, index) => {
          return(
            <li key={`item${index}`} className="answer-item">
              <div className="form-check">
                <input className="form-check-input" checked={item.isSelected} type="checkbox" onChange={(event) => handleGetCheckbox(event, item.id ,data.questionId)} />
                <label className="form-check-label">{item.description}</label>
              </div>
            </li>
          )
        })}
        </ul>
      </div>
    </>
  );
};

export default Question;
