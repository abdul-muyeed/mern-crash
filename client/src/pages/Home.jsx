import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import { useEffect } from "react";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const { fetchProducts, products } = useProductStore();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  console.log(products);
  return (
    <>
      <Container maxH={"container.xl"} minW={"1080px"} px={12}>
        <VStack spacing={8}>
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
            Current Products
          </Text>
          {products.length > 0 ? (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }}  spacing={8}>
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </SimpleGrid>
          ) : (
            <>
              <Text fontSize={"xl"}>No Products Available</Text>
              <Link to={"/create"}>
                {" "}
                <Text
                  as={"span"}
                  color={"blue.300"}
                  _hover={{ textDecoration: "underline" }}
                >
                  Create a Product
                </Text>
              </Link>
            </>
          )}
        </VStack>
      </Container>
    </>
  );
};

export default Home;
