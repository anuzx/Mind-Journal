// auth.ts will be for useMutation 
// signup();
// signin();
// logout();
// refreshToken();

import axios from "axios";
import { BACKEND_URL } from "../config";

type SignupPayload = {
  username: string;
  password: string;
};

type SigninPayload = {
  username: string;
  password: string;
};

type SigninResponse = {
    //this will ensure that we can only access token by doing data.token when data will be argument of onSuccess
  token: string;
};

export async function signupUser(data: SignupPayload) {
  const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, data);
  return response.data;
}

export async function signinUser(data: SigninPayload): Promise<SigninResponse> {
  const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, data);
  return response.data; // value is plain js value but return type is Promise<value>
}
/*return type Promise<SigninResponse>?
Why not just SigninResponse?”

because async function always returns a Promise

Because the HTTP request:

takes time
happens over the network
is asynchronous
*/

//response contains this object
/**response = {
  data: ...,        
  status: 200,
  statusText: "OK",
  headers: {...},
  config: {...},
  request: {...}
}
 */