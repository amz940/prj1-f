import React, { createContext, useEffect, useState } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { BoardWrite } from "./page/board/BoardWrite";
import { BoardList } from "./page/board/BoardList";
import { HomeLayout } from "./layout/HomeLayout";
import { BoardView } from "./page/board/BoardView";
import { BoardEdit } from "./page/board/BoardEdit";
import { MemberSignup } from "./page/member/MemberSignup";
import { MemberList } from "./page/member/MemberList";
import { MemberView } from "./page/member/MemberView";
import { MemberEdit } from "./page/member/MemberEdit";
import { MemberLogin } from "./page/member/MemberLogin";
import axios from "axios";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<HomeLayout />}>
      <Route index element={<BoardList />} />
      <Route path="write" element={<BoardWrite />} />
      <Route path="board/:id" element={<BoardView />} />
      <Route path="edit/:id" element={<BoardEdit />} />
      <Route path="signup" element={<MemberSignup />} />
      <Route path="member/list" element={<MemberList />} />
      <Route path="member" element={<MemberView />} />
      <Route path="member/edit" element={<MemberEdit />} />
      <Route path="login" element={<MemberLogin />} />
    </Route>,
  ),
);

export const LoginContext = createContext(null);

function App(props) {
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
      <RouterProvider router={routes} />
    </LoginContext.Provider>
  );
}

export default App;
