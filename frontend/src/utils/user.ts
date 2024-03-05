import axios from "axios";
import { authRoot, rootUrlPath } from "./url";

export const checkFieldValueAlreadyUsed = async (field: string, value: string) => {
    const response = await axios.get(
      rootUrlPath +
        authRoot +
        `check_value_exist/?field=${field}&value=${value}`
    );
    return response.data.valueExist;
  };



  export const CheckMininumLengthOfValue = (value: string): boolean => {
    return value.length > 5 ? true : false;
  };

  
