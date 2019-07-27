import React from "react";
const materialize = require("react-materialize");

interface IProps {}

const Sidenav: React.FC<IProps> = props => {
  return (
    <materialize.Collapsible>
      <materialize.CollapsibleItem
        header="Better safe than sorry. That's my motto."
        icon="filter_drama"
      >
        Better safe than sorry. That's my motto.
      </materialize.CollapsibleItem>
      <materialize.CollapsibleItem
        header="Yeah, you do seem to have a little 'shit creek' ac…"
        icon="place"
      >
        Yeah, you do seem to have a little 'shit creek' action going.
      </materialize.CollapsibleItem>
      <materialize.CollapsibleItem
        header="You know, FYI, you can buy a paddle. Did you not p…"
        icon="whatshot"
      >
        You know, FYI, you can buy a paddle. Did you not plan for this
        contingency?
      </materialize.CollapsibleItem>
    </materialize.Collapsible>
  );
};

export default Sidenav;
