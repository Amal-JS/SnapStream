import axios from "axios";
import { authRoot, rootUrlPath } from "./url";

export const checkFieldValueAlreadyUsed = async (field: string, value: string ,user_id = 0) => {
    const response = await axios.get(
      rootUrlPath +
        authRoot +
        `check_value_exist/?field=${field}&value=${value}${user_id && `&user_id=${user_id}`}`
    );
    return response.data.valueExist;
  };



  export const CheckMininumLengthOfValue = (value: string): boolean => {
    return value.length > 5 ? true : false;
  };

  
