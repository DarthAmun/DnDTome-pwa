import React from "react";
import { Avatar, Divider } from "rsuite";
import Card, { Cards } from "../general_elements/Card";

const Group = () => {
  return (
    <Cards>
      <Card>
        <Avatar circle src="https://avatars2.githubusercontent.com/u/12592949?s=460&v=4" />
        <Divider />
        GM
      </Card>
    </Cards>
  );
};

export default Group;
