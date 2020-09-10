import React from "react";
import {Alert} from "antd";
import { FrownOutlined } from '@ant-design/icons';
import './error-indicator.css';


const ErrorIndicator = ({message = "Ooops",
                            description = "Something has gone wrong, but we are working on solution",
                            type="error",
                            color="#eb2f96"}) =>{
    return(
        <Alert message={message}
               description={description}
               type={type}
               icon={<FrownOutlined twoToneColor={color} />}
               showIcon
               className="error"
               />
    );
}

export default ErrorIndicator;