import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Stack,
  StackDivider,
  Text,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { DeleteIcon } from "@chakra-ui/icons";

function CommentForm({ boardId, isSubmitting, onSubmit }) {
  const [comment, setComment] = useState("");

  function handleSubmit() {
    onSubmit({ boardId, comment });
  }

  return (
    // 여러 줄 쓰고 싶을떈 Textarea / 한 줄은 input
    <Box>
      <Textarea value={comment} onChange={(e) => setComment(e.target.value)} />
      <Button isDisabled={isSubmitting} onClick={handleSubmit}>
        쓰기
      </Button>
    </Box>
  );
}

function CommentList({ commentList, onDelete, isSubmitting }) {
  return (
    <Card>
      <CardHeader>
        <Heading size={"md"}>댓글 리스트</Heading>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          {/*TODO : 새로운 줄 출력*/}
          {/*TODO : 댓글 작성 후 re render*/}
          {commentList.map((comment) => (
            <Box key={comment.id}>
              <Flex>
                <Heading fontSize="xs">{comment.memberId}</Heading>
                <Text fontSize="xs">{comment.inserted}</Text>
              </Flex>
              <Flex justifyContent="space-between" alignItems="center">
                <Text pt="2" fontSize="xs">
                  {comment.comment}
                </Text>
                <Button
                  isDisabled={isSubmitting}
                  size="xs"
                  colorScheme="red"
                  onClick={() => onDelete(comment.id)}
                >
                  <DeleteIcon />
                </Button>
              </Flex>
            </Box>
          ))}
        </Stack>
      </CardBody>
    </Card>
  );
}

export function CommentContainer({ boardId }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [commentList, setCommentList] = useState([]);

  useEffect(() => {
    if (!isSubmitting) {
      const params = new URLSearchParams();
      params.set("id", boardId);

      axios
        .get("/api/comment/list?" + params)
        .then((response) => setCommentList(response.data));
    }
  }, [isSubmitting]);

  function handleSubmit(comment) {
    setIsSubmitting(true);

    axios
      .post("/api/comment/add", comment)
      .finally(() => setIsSubmitting(false));
  }

  function handleDelete(id) {
    // console.log(id + "번 댓글 삭제");
    // TODO : then, catch, finally 추가

    isSubmitting(true);

    axios.delete("/api/comment/" + id).finally(() => setIsSubmitting(false));
  }

  return (
    <Box>
      <CommentForm
        boardId={boardId}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
      />
      <CommentList
        boardId={boardId}
        isSubmitting={{ isSubmitting }}
        commentList={commentList}
        onDelete={handleDelete}
      />
    </Box>
  );
}
