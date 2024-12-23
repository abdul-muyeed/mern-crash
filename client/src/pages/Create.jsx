import { Box, Button, Container, Heading, Input, useColorModeValue, useToast, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useProductStore } from "../store/product";
const Create = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });
  const toast = useToast();
  const {createProduct} = useProductStore();
  const handleAddProduct = async () => {
    const {success, message} = await createProduct(newProduct);
    console.log(newProduct, success, message);
    if(success){
      toast({
        title: "Product Created",
        description: message,
        status: "success",
        isClosable: true,
      });
    }else{
        toast({
            title: "Error",
            description: message,
            status: "error",
            isClosable: true,
        });
    }
    setNewProduct({name: "", price: "", image: ""});
  }
  return (
    <>
      <Container maxW={"container.lx"} minW={"1080px"} px={12}>
        <VStack spacing={8} align={"stretch"} mt={8}>
          <Heading as={"h1"} size={"xl"} textAlign={"center"} mb={8}>
            Create New Product
          </Heading>
          <Box 
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
          >
            <VStack spacing={4}>
                <Input
                    type={"text"}
                    placeholder={"Product Name"}
                    value={newProduct.name}
                    onChange={(e) =>
                    setNewProduct({ ...newProduct, name: e.target.value })
                    }
                    className={"input"}
                />
                <Input
                    type={"number   "}
                    placeholder={"Product Price"}
                    value={newProduct.price}
                    onChange={(e) =>
                    setNewProduct({ ...newProduct, price: e.target.value })
                    }
                    className={"input"}
                />
                <Input
                    type={"text"}
                    placeholder={"Product Image URL"}
                    value={newProduct.image}
                    onChange={(e) =>
                    setNewProduct({ ...newProduct, image: e.target.value })
                    }
                    className={"input"}
                />
                <Button className={"btn"} colorScheme="blue" w={"full"} onClick={handleAddProduct}>Create Product</Button>
            </VStack>

          </Box>
        </VStack>
      </Container>
    </>
  );
};

export default Create;
