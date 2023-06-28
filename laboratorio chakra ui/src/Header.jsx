

import { Box, Button, Container, Heading, Image,Flex } from '@chakra-ui/react';
import Bici from './img/Bici.jpg';



function Header() {
  return (
    <Container mt={5}>
      <Box
        bg="dark"
        color="white"
        position="relative"
        textAlign="center"
        p={4}
        _hover={{ bg: 'dark' }}
        transition="background-color 0.3s"
      >
        <Image src={Bici} alt="..." w="100%" h="auto" maxH="300px" className="card-img" position="absolute" top={0} left={0} zIndex={-1} />
       <Container textAlign="center" mt={5} >
      <Heading as="h5" size="xl"  className="card-title" color="white">
      <h1>DOMINA EL TERRENO</h1> 
      </Heading>
      
      <Flex
      flexDirection={{ base: "row", lg: "column" }}
      flexWrap={{ base: "wrap", lg: "nowrap" }}
      justifyContent="center"
    >
      <Button
        type="button"
        className="btn custom-button"
        _hover={{ bg: "black", color: "white" }}
        mx={5}
        color="white"
        bg="none"
        border="none"
      >
        <p>VER DESCRIPCION</p>
      </Button>
      <Button
        type="button"
        className="btn custom-button"
        color="white"
        bg="none"
        border="none"
        _hover={{ bg: "black", color: "white" }}
      >
        <p size="xl">VER VIDEO</p>
      </Button>
    </Flex>
    </Container> 
     
      </Box>
    </Container>
  );
}

export default Header;
