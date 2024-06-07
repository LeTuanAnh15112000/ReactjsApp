import React from "react";
import UserInfor from "./UserInfor";
import DisplayInfor from "./DisplayInfor";
class MyComponent extends React.Component {
  render() {
    return (
      <div>
        <UserInfor />
        <DisplayInfor name="Hoi Dan IT" age={true} />
      </div>
    );
  }
}

export default MyComponent;