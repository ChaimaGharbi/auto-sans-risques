import React, { useCallback, useEffect, useMemo, useState } from "react";

function useColor(defaults, l, onChange) {
  const [color, setColor] = useState([]);

  

  useEffect(() => {
    if (defaults) {
      setColor(defaults);
    }
  }, [defaults]);

  useEffect(() => {
    
    if (defaults && defaults.length === 0) {
      setColor(new Array(l).fill("black"));
    }
  }, [l, defaults]);

  const changeColor = useCallback(
    (idx) => {
      
      setColor(
        color.map((c, _idx) =>
          _idx === idx ? (c === "red" ? "black" : "red") : c
        )
      );
    },
    [color]
  );

  const getColor = useCallback(
    (idx) => {
      switch (color[idx]) {
        case "red":
          return "red";
        case "black":
          return "black";
        default:
          return "red";
      }
    },
    [color]
  );

  useEffect(() => {
    onChange(color);
  }, [color, onChange]);

  return [color, changeColor, getColor];
}

function DynamicInput(props) {
  const [inputList, setInputList] = useState([]);
  const [color, changeColor, getColor] = useColor(
    props.colors,
    inputList.length,
    props.onColorsChanged
  );

  
  useEffect(() => {
    setInputList(props.defaultValues);
  }, [props.defaultValues]);

  useEffect(() => {
    const choices = inputList.map(({ choice }) => choice);
    
    props.setFieldValue(props.name, choices, false);
  }, [inputList]);

  // useEffect(() => {
  //   const choices = [];
  //   for (let i = 0; i < inputList.length; i++) {
  //     choices.push(inputList[i].choice);
  //   }
  //   if (choices.length === 0) {
  //     props.setFieldError(props.name, "Ce champ est requis");
  //   } else {
  //     props.setFieldError(props.name, undefined);
  //     props.setFieldValue(props.name, choices, false);
  //   }
  // }, [inputList, props.setFieldValue]);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
    
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { choice: "" }]);
  };

  return (
    <div className="tw-flex tw-flex-col tw-pb-2 tw-w-full">
      <div className="tw-pt-2 tw-pb-2 lg:tw-pb-0 tw-w-full lg:tw-w-2/3 tw-text-gray-700 tw-font-normal tw-outline-none">
        {props.label}
      </div>
      {inputList.length === 0 && (
        <>
          <input
            className={`tw-mt-2 tw-border tw-w-full tw-py-2 tw-rounded-md tw-px-2 tw-border-gray-400  ${props.error &&
              "tw-border-red-500 tw-placeholder-red-400"} hover:tw-border-gray-700`}
            type={props.type}
            name="choice"
            placeholder={props.placeholder}
            value={""}
            onChange={(e) => handleInputChange(e, 0)}
          />
          <button
            type="button"
            className="tw-rounded tw-text-xl tw-bg-blue-400 tw-ml-2 tw-px-3 tw-py-2 tw-mt-2 tw-text-white tw-font-extrabold"
            onClick={handleAddClick}
          >
            +
          </button>
        </>
      )}
      {inputList.map((x, i) => {
        return (
          <div key={i} className="tw-flex tw-flex-row">
            <input
              className={`tw-mt-2 tw-border tw-w-full tw-py-2 tw-rounded-md tw-px-2 tw-border-gray-400  ${props.error &&
                "tw-border-red-500 tw-placeholder-red-400"} hover:tw-border-gray-700`}
              type={props.type}
              name="choice"
              placeholder={props.placeholder}
              value={x.choice}
              onChange={(e) => handleInputChange(e, i)}
            />
            <div className="tw-flex tw-flex-row">
              {inputList.length !== 1 && (
                <button
                  type="button"
                  className="tw-rounded tw-text-xl tw-bg-red-400 tw-ml-2 tw-px-3 tw-py-2 tw-mt-2 tw-text-white tw-font-extrabold"
                  onClick={() => handleRemoveClick(i)}
                >
                  -
                </button>
              )}
              {inputList.length - 1 === i && (
                <button
                  type="button"
                  className="tw-rounded tw-text-xl tw-bg-blue-400 tw-ml-2 tw-px-3 tw-py-2 tw-mt-2 tw-text-white tw-font-extrabold"
                  onClick={handleAddClick}
                >
                  +
                </button>
              )}
              <button
                onClick={() => changeColor(i)}
                type="button"
                style={{ backgroundColor: getColor(i) }}
                className="tw-rounded tw-text-xl  tw-ml-2 tw-w-10 tw-mt-2 tw-text-white tw-font-extrabold"
              ></button>
            </div>
          </div>
        );
      })}
      {props.error && (
        <span className="tw-text-red-500 tw-text-sm tw-font-light">
          {props.errorText}
        </span>
      )}
    </div>
  );
}

export default DynamicInput;
