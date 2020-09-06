import React from "react";
import {Alert} from "antd";
import { FrownOutlined } from '@ant-design/icons';


const ErrorIndicator = () =>{
    return(
        <Alert message="OOoops"
               description="Something has gone wrong, but we are working on solution"
               type="error"
               icon={<FrownOutlined twoToneColor="#eb2f96" />}
               showIcon
               />
    );
}

export default ErrorIndicator;