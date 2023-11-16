import { Button, Flex, useToast } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect } from "react";
import { LoginContext } from "./LoginProvider";

export function NavBar() {
  const { fetchLogin, login, isAuthenticated, isAdmin } =
    useContext(LoginContext);

  const navigate = useNavigate();

  const toast = useToast();

  const urlParams = new URLSearchParams();

  const location = useLocation();

  useEffect(() => {
    fetchLogin();
  }, [location]);

  if (login !== "") {
    urlParams.set("id", login.id);
  }

  function handleLogout() {
    // TODO : 로그아웃 후 할 일 추가
    axios.post("/api/member/logout").then(() => {
      toast({
        description: "로그아웃 되었습니다",
        status: "info",
      });
      navigate("/");
    });
  }

  return (
    <Flex>
      <Button onClick={() => navigate("/")}>home</Button>
      {isAuthenticated() && (
        <Button onClick={() => navigate("/write")}>write</Button>
      )}
      {isAuthenticated() || (
        <Button onClick={() => navigate("/signup")}>signup</Button>
      )}
      {isAdmin() && (
        <Button onClick={() => navigate("/member/list")}>회원목록</Button>
      )}
      {isAuthenticated() && (
        <Button onClick={() => navigate("/member?" + urlParams.toString())}>
          회원정보
        </Button>
      )}
      {isAuthenticated() || (
        <Button onClick={() => navigate("/login")}>로그인</Button>
      )}
      {/*로그아웃은 따로 창을 만들 필요 없이 바로 하면 되기 떄문에 함수 작성*/}
      {isAuthenticated() && <Button onClick={handleLogout}>로그아웃</Button>}
    </Flex>
  );
}
