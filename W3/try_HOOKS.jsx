import React, {memo} from "react";

const Try = memo(({tryInfo}) => {
    <li>
        <div>{tryInfo.try}</div>    
        <div>{tryInfo.result}</div>    
    </li>

});

export default Try_Hooks;