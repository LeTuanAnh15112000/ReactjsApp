import React, { useState } from "react";
import "./DisplayInfor.scss";

function DisplayInfor(props) {
  const { listUsers, handleDeleteUser } = props;
  const [isShowHideListUser, setIsShowHideListUser] = useState(true);
  const handleShowHideUser = () => {
    setIsShowHideListUser(!isShowHideListUser);
  }
  return (
    <div className="display-infor-container">
      <div>
        <span className="showuser" onClick={handleShowHideUser}>{isShowHideListUser === true ? "Hide List users" : "Show List users"}</span>
      </div>
      {isShowHideListUser && (
        <>
          {listUsers.map((user, index) => {
            return (
              <div key={user.id} className={+user.age > 18 ? "green" : "red"}>
                <div>My name's {user.name}</div>
                <div>My age {user.age}</div>
                <div>
                  <button
                    onClick={() => {
                      handleDeleteUser(user.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
                <hr></hr>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

export default DisplayInfor;
