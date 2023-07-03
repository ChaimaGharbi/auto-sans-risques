import React from 'react';

import './ErrorDiv.css';

function ErrorDiv(props) {
    return (
    <div id="errorId" className="errorDiv">
        {props.children}
    </div>
    );

}

export default ErrorDiv;