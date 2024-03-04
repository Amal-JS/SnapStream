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