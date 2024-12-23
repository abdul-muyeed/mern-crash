import {
  Button,
  Container,
  Flex,
  HStack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FiPlusSquare } from "react-icons/fi";
import { IoMoon, IoSunny } from "react-icons/io5";

const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Container maxW={"container.lx"}  minW={"1080px"} px={12}>
        <Flex
          h={"16"}
          alignItems={"center"}
          justifyContent={"space-between"}
          flexDir={{
            base: "column",
            md: "row",
          }}
        >
          <Text
            fontSize={{
              base: "2xl",
              md: "4xl",
            }}
            fontWeight={"bold"}
            textTransform={"uppercase"}
            textAlign={"center"}
            bgGradient={"linear(to-r, blue.400, blue.600)"}
            bgClip={"text"}
          >
            <Link to={"/"}>Home</Link>
          </Text>
          <HStack
            spacing={2}
            alignItems={"center"}
            // justifyContent={"center"}
          >
            <Button>
              <Link to={"/create"}>
                <FiPlusSquare fontSize={26} />
              </Link>
            </Button>
            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <IoSunny /> : <IoMoon />}
            </Button>
          </HStack>
        </Flex>
      </Container>
    </>
  );
};

export default NavBar;
