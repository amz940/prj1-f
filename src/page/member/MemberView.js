import { useNavigate, useSearchParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

export function MemberView() {
  // /member?id=userid
  // 쿼리스트링을 url에 쓸려고 할때 사용
  const [params] = useSearchParams();

  const [member, setMember] = useState(null);

  const { isOpen, onClose, onOpen } = useDisclosure();

  const navigate = useNavigate();

  const toast = useToast();

  useEffect(() => {
    axios
      .get("/api/member?" + params.toString())
      .then((response) => setMember(response.data));
  }, []);

  if (member === null) {
    return <Spinner />;
  }

  function handleDelete() {
    // axios. delete / api/member?id=userid

    // ok => home 이동, toast
    // error => toast 에러
    // finally => modal 닫기
    axios
      .delete("/api/member?" + params.toString())
      .then(() => {
        toast({
          description: "회원 탈퇴하였습니다",
          status: "success",
        });
        navigate("/");
        // 할일 메모지 남기기
        // Todo : 로그아웃 기능 추가
        // Fixme : 이 기능 고치기
      })
      .catch((error) => {
        if (error.response.status === 401 || error.response.status === 403) {
          toast({
            description: "권한이 없습니다",
            status: "error",
          });
        } else {
          toast({
            description: "탈퇴 처리 중 문제가 발생하였습니다",
            status: "error",
          });
        }
      })
      .finally(() => onClose());
  }

  return (
    <Box>
      <h1>{member.id}님 정보</h1>
      <FormControl>
        <FormLabel>password</FormLabel>
        <Input type="password" value={member.password} readOnly />
      </FormControl>
      <FormControl>
        <FormLabel>email</FormLabel>
        <Input value={member.email} readOnly />
      </FormControl>
      <Button colorScheme="purple">수정</Button>
      <Button colorScheme="red" onClick={onOpen}>
        탈퇴
      </Button>

      {/*탈퇴모달*/}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>탈퇴 확인</ModalHeader>
          <ModalCloseButton />
          <ModalBody>탈퇴 하시겠습니까?</ModalBody>

          <ModalFooter>
            <Button onClick={onClose}>닫기</Button>
            <Button onClick={handleDelete} colorScheme="red">
              탈퇴
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
