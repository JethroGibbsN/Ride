import React, { useState } from "react";
import {
  Button,
  ChakraProvider,
  Box,
  Heading,
  Spacer,
  Flex,
  extendTheme,
} from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";

// Page imports
import Login from "./pages/login";
import SignUp from "./pages/signup";
import Splash from "./pages/splash";
import Profile from "./pages/profile";

// Component imports
import Fonts from "./components/Fonts";
import ResRoute from "./components/ResRoute";

const Nav = ({ history, currentUser }) => {
  return (
    <Flex>
      <Box>
        <Heading
          onClick={() => history.push("/dashboard")}
          size="xl"
          fontFamily="Allan"
          cursor="pointer"
          textShadow="3px 1px green"
        >
          RIDE.
        </Heading>
      </Box>
      <Spacer />
      {currentUser ? (
        // Signed In User
        <Box>
          <Button mr="1rem" onClick={() => history.push("/profile")}>
            Profile
          </Button>
          <Button mr="1rem" onClick={() => history.push("/logout")}>
            Log out
          </Button>
        </Box>
      ) : (
        // No user
        <Box>
          <Button mr="1rem" onClick={() => history.push("/join")}>
            Sign Up
          </Button>
          <Button mr="1rem" onClick={() => history.push("/login")}>
            Log in
          </Button>
        </Box>
      )}
    </Flex>
  );
};

const customTheme = extendTheme({
  fonts: {
    heading: "Montserrat",
    body: "Montserrat",
  },
  styles: {
    global: (props) => ({
      "html, body": {
        fontSize: "md",
        bg: mode("white", "black")(props),
        lineHeight: "tall",
      },
      a: {
        color: "teal.500",
      },
    }),
  },
  colors: {
    brand: {
      100: "#f7fafc",
      900: "#1a202c",
    },
  },
  components: {
    Button: {
      baseStyle: {},
    },
  },
  initialColorMode: "dark",
  useSystemColorMode: false,
});

const App = (props: any) => {
  const [state, setState] = useState({
    currentUser: {
      username: "flozender",
      name: "Tayeeb Hasan",
      token: "12345678",
    },
  });

  let { currentUser } = state;

  return (
    <ChakraProvider theme={customTheme}>
      <Fonts />
      <Box textAlign="center" fontSize="xl" p={6} height="100vh">
        <Nav history={props.history} currentUser={currentUser} />
        <Switch>
          <Route exact path="/" component={Splash} />
          <Route exact path="/join" component={SignUp} />
          <Route exact path="/login" component={Login} />
          <ResRoute
            path="/dashboard"
            currentUser={currentUser}
            component={<></>}
          />
          <ResRoute
            path="/profile"
            currentUser={currentUser}
            component={<Profile currentUser={currentUser} />}
          />
        </Switch>
      </Box>
    </ChakraProvider>
  );
};

export default withRouter(App);
