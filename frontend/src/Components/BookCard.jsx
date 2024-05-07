import {
  Box,
  Button,
  Heading,
  Image,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addItemToCart } from "../Redux/Cart/cart.Action";

const BookCard = ({ book }) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const { addCartItem, cartData } = useSelector((store) => store.cart);
  const { loading } = addCartItem;

  const newItem = {
    ...book,
    qty: 1,
  };

  const handleAddToCart = () => {
    const isItemInCart = cartData.find((item) => item._id === newItem._id);

    if (isItemInCart) {
      toast({
        title: "Add Failed.",
        description: "Item already in Cart.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    } else {
      dispatch(addItemToCart(newItem));
      toast({
        title: "Add Success.",
        description: "Now you can explore Cart.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    
    <Box
      // borderWidth="4px" Rusilla Serif
      borderRadius="15px"
      background={"white"}
      boxShadow="rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px"
      textColor={"black"}
      fontFamily={"Rusilla Serif"}
      p={4}
      // marginRight={"7px"}
      className="border border-gray-300 rounded-lg overflow-hidden p-4"
    >
      <Link to={`/detail/${book._id}`}>
        <Image
          margin={"auto"}
          height={"200px"}
          border={"9px solid white"}
          src={book.image}
          alt={book.title}
          className="mx-auto h-48"
        />
        <Stack mt={4}>
          <Heading as="h3" size="md" height={"20px"} className="text-lg font-medium">
            {book.title}
          </Heading>
          <Text fontSize="sm" color="gray.500" className="text-gray-500">
            {book.author}
          </Text>
          <Text m={"auto"} as={"p"} fontSize={"lg"} className="text-lg">
            {book.description.length < 8
              ? book.description
              : `${book.description.slice(0, 8)}...`}
          </Text>
          <Text fontSize="lg" fontWeight="bold" mt={2} className="text-lg font-bold">
            $ {book.price}
          </Text>
        </Stack>
      </Link>
      <Button
        isLoading={loading}
        isDisabled={cartData.find((item) => item._id === newItem._id)}
        loadingText="Add to Cart"
        width="full"
        p={4}
        borderRadius="lg"
        color="white"
        backgroundColor={"black"}
        _hover={{
          bg: "lightgrey",
          color: "black",
          border: "solid 1.5px black"
        }}
        variant="outline"
        mt={4}
        onClick={handleAddToCart}
        className="w-full p-4 rounded-lg border border-teal-500 hover:bg-teal-300 hover:text-white"
      >
        Add To Cart
      </Button>
    </Box>
   
  );
};

export default BookCard;
