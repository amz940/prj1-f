import { Button, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function NavBar() {
  const navigate = useNavigate();

  function handleLogout() {
    // TODO : 로그아웃 후 할 일 추가
    axios.post("/api/member/logout").then(() => console.log("로그아웃 성공"));
  }

  return (
    <Flex>
      <Button onClick={() => navigate("/")}>home</Button>
      <Button onClick={() => navigate("/write")}>write</Button>
      <Button onClick={() => navigate("/signup")}>signup</Button>
      <Button onClick={() => navigate("/member/list")}>회원목록</Button>
      <Button onClick={() => navigate("/login")}>로그인</Button>
      {/*로그아웃은 따로 창을 만들 필요 없이 바로 하면 되기 떄문에 함수 작성*/}
      <Button onClick={handleLogout}>로그아웃</Button>
    </Flex>
  );
}
