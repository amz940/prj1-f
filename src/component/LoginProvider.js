import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const LoginContext = createContext(null);
function LoginProvider({ children }) {
  // 로그인 정보 담긴 메소드
  const [login, setLogin] = useState("");

  useEffect(() => {
    fetchLogin();
  }, []);

  console.log(login);
  // 로그인 성공하거나  실패 할때 사용 하는 코드
  function fetchLogin() {
    axios.get("/api/member/login").then((response) => setLogin(response.data));
  }

  // 로그인을 할 때 빈 스트링인지 확인 해주는 코드
  function isAuthenticated() {
    return login !== "";
  }
  // 어떤 권한을 들고 있는 아이디인지 알려주는 코드
  function isAdmin() {
    if (login.auth) {
      return login.auth.some((elem) => elem.name === "admin");
    }
    return false;
  }
  //
  // function isManager(){
  //   return login.auth.some((elem) => elem.name === "manager");
  // }
  //
  // function hasAuth(auth){
  //   return login.auth.some((elem) => elem.name === "auth");
  // }

  function hasAccess(userId) {
    return login.id === userId;
  }
  return (
    <LoginContext.Provider
      value={{ login, fetchLogin, isAuthenticated, hasAccess, isAdmin }}
    >
      {children}
    </LoginContext.Provider>
  );
}

export default LoginProvider;
