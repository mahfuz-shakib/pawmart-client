import { use } from "react";
import {AuthContext} from "../auth/AuthContext"

const useTheme = ()=>{
    return use(AuthContext);
}
export default useTheme;