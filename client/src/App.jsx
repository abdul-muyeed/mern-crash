import { Box, useColorModeValue } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Create from "./pages/Create";
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <Box minH={"100vh"} bg={useColorModeValue("white", "black")}>
        <NavBar />
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/create"} element={<Create />} />
        </Routes>
      </Box>
    </>
  );
}

export default App;
