/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { BiEdit, BiTrash } from "react-icons/bi";
import { useProductStore } from "../store/product";
import { useState } from "react";

const ProductCard = ({ product }) => {
  const { deleteProduct, updateProduct } = useProductStore();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const handleDeleteProduct = async (id) => {
    const { success, message } = await deleteProduct(id);

    if (success) {
      toast({
        title: "Product Deleted",
        description: message,
        status: "success",
        isClosable: true,
      });
    } else {
      toast({
        title: "Error",
        description: message,
        status: "error",
        isClosable: true,
      });
    }
  };
    const handleUpdateProduct = async () => {
    const { success, message } = await updateProduct(product._id, updatedProduct);
    if (success) {
        toast({
            title: "Product Updated",
            description: message,
            status: "success",
            isClosable: true,
        });
        
        } else {
            toast({
                title: "Error",
                description: message,
                status: "error",
                isClosable: true,
            });
        }
        onClose();
    }
  return (
    <>
      <Box
        shadow={"lg"}
        rounded={"lg"}
        overflow={"hidden"}
        transition={"all 0.3s"}
        _hover={{
          transform: "translateY(-4px)",
          shadow: "xl",
        }}
        bg={useColorModeValue("white", "gray.800")}
      >
        <Image
          src={product.image}
          alt={product.name}
          h={48}
          w={"full"}
          objectFit={"cover"}
        />
        <Box p={4}>
          <Heading as={"h3"} size={"md"}>
            {product.name}
          </Heading>
          <Text>${product.price}</Text>
          <HStack spancing={2}>
            <IconButton
              aria-label={"edit"}
              colorScheme="blue"
              icon={<BiEdit />}
              onClick={onOpen}
            />
            <IconButton
              aria-label={"delete"}
              colorScheme="red"
              icon={<BiTrash />}
              onClick={() => handleDeleteProduct(product._id)}
            />
          </HStack>
        </Box>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4}>
                <Input
                  type={"text"}
                  placeholder={"Product Name"}
                  value={updatedProduct.name}
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      name: e.target.value,
                    })
                  }
                />
                <Input
                  type={"number"}
                  placeholder={"Product Price"}
                  value={updatedProduct.price}
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      price: e.target.value,
                    })
                  }
                />
                <Input
                  type={"text"}
                  placeholder={"Product Image URL"}
                  value={updatedProduct.image}
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      image: e.target.value,
                    })
                  }
                />
              </VStack>
            </ModalBody>
            <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleUpdateProduct}>
              Edit
            </Button>
            <Button colorScheme='red' onClick={onClose}>Close</Button>
          </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
};

export default ProductCard;
