import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Box, FormControl, FormLabel, Input, Spinner } from "@chakra-ui/react";

export function BoardView() {
  const { id } = useParams();

  const [board, setBoard] = useState(null);

  useEffect(() => {
    axios
      .get("/api/board/id/" + id)
      .then((response) => setBoard(response.data));
  }, []);

  if (board === null) {
    return <Spinner />;
  }
  return (
    <Box>
      <h1>{board.id}번 글 보기</h1>
      <FormControl>
        <FormLabel>제목</FormLabel>
        <Input value={board.title}></Input>
      </FormControl>
      <FormControl>
        <FormLabel>본문</FormLabel>
        <Input value={board.content}></Input>
      </FormControl>
      <FormControl>
        <FormLabel>작성자</FormLabel>
        <Input value={board.writer}></Input>
      </FormControl>
      <FormControl>
        <FormLabel>작성일시</FormLabel>
        <Input value={board.inserted}></Input>
      </FormControl>
    </Box>
  );
}
