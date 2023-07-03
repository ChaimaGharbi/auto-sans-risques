import React, { useState, useEffect } from "react";
import DropdownTreeSelect from "react-dropdown-tree-select";
import "react-dropdown-tree-select/dist/styles.css";
import "./dropdown.css";
const DropdownHOC = (props) => {
  const prepareData = (data) => {
    // optional: you can skip cloning if you don't mind mutating original data
    var cloned = data.slice(0);

    // insert special select all node
    cloned.splice(0, 0, {
      label: "Select All",
      value: "selectAll",
      className: "select-all",
    });

    return cloned;
  };
  const [data, setData] = useState(prepareData(props.data));
  useEffect(() => {
    prepareData(props.data);
  }, [props.data]);

  const toggleAll = (checked) => {
    props.toggleAll(checked);
    /* for (var i = 1; i < data.length; i++) {
      data[i].checked = checked;
    }
    setData(data); */
  };

  const handleChange = ({ value, checked }, selected) => {
    
    props.getselectedList(selected);
    if (value === "selectAll") toggleAll(checked);
  };
  /* function onAction(node, action) {
    
  } */

  return (
    <div>
      <DropdownTreeSelect
        /*   {...props.register("allows")} */
        texts={{ placeholder: "Access Menus" }}
        data={props.data}
        //ref={props.ref}
        id="_id"
        onChange={handleChange}
        //onAction={onAction}
      />
    </div>
  );
};

export default DropdownHOC;
