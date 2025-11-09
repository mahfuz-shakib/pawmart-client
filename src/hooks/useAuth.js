import { use } from "react";
import {AuthContext} from "../auth/AuthContext"

const useAuth = ()=>{
    return use(AuthContext);
}
export default useAuth;