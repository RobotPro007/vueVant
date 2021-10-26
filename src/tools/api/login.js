import request from "../request";
console.log(request);
// /*
// export function ${接口名称}({请求参数}) {
//   return request.get({接口地址},{请求参数});
// }
// */

export function login(data) {
  return request.get("login", data);
}
