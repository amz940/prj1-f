import { Box, Button, Input, Textarea } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

function CommentForm({ boardId }) {
  const [comment, setComment] = useState(null);

  function handleSubmit() {
    axios.post("/api/comment/add", {
      boardId,
      comment,
    });
  }

  return (
    // 여러 줄 쓰고 싶을떈 Textarea / 한 줄은 input
    <Box>
      <Textarea value={comment} onChange={(e) => setComment(e.target.value)} />
      <Button onClick={handleSubmit}>쓰기</Button>
    </Box>
  );
}

function CommentList({ boardId }) {
  const [commentList, setCommentList] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("id", boardId);
    axios
      .get("/api/comment/list?" + params)
      .then((response) => setCommentList(response.data));
  }, []);

  return (
    // TODO : 댓글 read 기능 추가
    <Box>댓글 리스트</Box>
  );
}

export function CommentContainer({ boardId }) {
  return (
    <Box>
      <CommentForm boardId={boardId} />
      <CommentList boardId={boardId} />
    </Box>
  );
}
