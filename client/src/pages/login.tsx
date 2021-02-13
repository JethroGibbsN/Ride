import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import {
  Button,
  Heading,
  Flex,
  useColorModeValue,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";

const Login = (props: any) => {
  const bg = useColorModeValue("gray.100", "gray.900");

  const [state, setState] = useState({
    username: "",
    password: "",
  });

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const { setCurrentUser } = props;

  const handleChange = (event: any) => {
    const { value, name } = event.target;

    setState({ ...state, [name]: value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    const success = () => {
      setLoading(false);
      toast({
        position: "bottom-left",
        title: "Success",
        description: "Welcome back.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      props.history.push("/");
    };

    if (!username || !password) {
      toast({
        position: "bottom-left",
        title: "Missing Fields.",
        description: "Please fill in all the data.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      const body = state;
      fetch("/signIn", {
        method: "post",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((json) => {
          if (!json.success) throw Error(json.message);
          setCurrentUser({
            ...json,
          });
          localStorage.setItem("ride-user", JSON.stringify(json));
          success();
        })
        .catch((err) => {
          console.log(err);
          toast({
            position: "bottom-left",
            title: "Could not log you in",
            description: err.message,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          setLoading(false);
        });
    }
  };

  const { username, password } = state;
  return (
    <Flex justifyContent="center" alignItems="center" height="70vh">
      <Flex
        textAlign="center"
        fontSize="md"
        p={6}
        bgColor={bg}
        borderRadius="md"
        flexDirection="column"
        height="45vh"
        justifyContent="space-between"
      >
        <Heading fontSize="2xl">Welcome Back.</Heading>
        <Input
          placeholder="Username"
          value={username}
          name="username"
          onChange={handleChange}
          pr="4.5rem"
        />

        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Enter password"
            name="password"
            onChange={handleChange}
            value={password}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        <Button
          colorScheme="green"
          onClick={handleSubmit}
          isLoading={loading ? true : false}
          loadingText="Submitting"
        >
          Submit
        </Button>
      </Flex>
    </Flex>
  );
};

export default withRouter(Login);
