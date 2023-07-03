import React, { useState } from "react";
import EyeIcon from "./img/EyeIcon";
import UploadIcon from "./img/UploadIcon";

const UploadInput = React.forwardRef((props, ref) => {
  const [fileName, setFilName] = useState();
  return (
    <div className="tw-flex tw-flex-col tw-pb-1 tw-px-6 tw-w-full">
      <div className="tw-flex tw-flex-row">
        <label
          className={`tw-mt-2 tw-border-2 tw-w-full tw-py-2 tw-rounded-md tw-px-2 tw-border-gray-400 tw-flex tw-flex-row tw-justify-center  ${props.error &&
            "tw-border-red-500 tw-placeholder-red-400"} tw-bg-gray-100 tw-hover:tw-border-gray-700`}
        >
          <UploadIcon className="tw-h-6 tw-w-6 tw-pt-1" />
          <span className="tw-pl-2">{!fileName ? "Parcourir" : fileName}</span>
          <input
            name={props.name}
            onChange={(e) => {
              setFilName(e.target.value);
              props.setFieldValue(props.name, e.currentTarget.files[0]);
            }}
            type="file"
            ref={ref}
            className="tw-hidden"
          />
        </label>
        {props.href && (
          <a
            rel="noopener noreferrer"
            target="_blank"
            onClick={props.onClick}
            href={props.href}
            className={`tw-bg-gray-50 tw-text-blue-700 tw-px-4 tw-mx-2 tw-mt-1 tw-py-2 tw-rounded-lg hover:tw-bg-blue-200`}
          >
            {props.href && <EyeIcon className="tw-h-6 tw-w-6 tw-mt-2" />}
          </a>
        )}
      </div>

      {props.error && (
        <span className="tw-text-red-500 tw-font-medium">
          {props.errorText}
        </span>
      )}
    </div>
  );
});

export default UploadInput;
