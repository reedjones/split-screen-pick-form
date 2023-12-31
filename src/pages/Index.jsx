import React, { useState } from 'react';
import {
  Box,
  Flex,
  Grid,
  GridItem,
  VStack,
  Heading,
  Text,
  Button,
  Input,
  FormControl,
  FormLabel,
  Image,
} from '@chakra-ui/react';
import { FaMousePointer } from 'react-icons/fa';

const Index = () => {
  const [selectedElement, setSelectedElement] = useState(null);
  const [schema, setSchema] = useState({});
  const [keyName, setKeyName] = useState('');

  const handleElementClick = (e, elementName) => {
    e.preventDefault();
    setSelectedElement(elementName);
  };

  const handleAddToSchema = () => {
    if (selectedElement && keyName) {
      setSchema({
        ...schema,
        [keyName]: `#${selectedElement}`,
      });
      setKeyName('');
      setSelectedElement(null);
    }
  };

  const handleSubmit = () => {
    console.log('Generated Schema:', JSON.stringify(schema, null, 2));
  };

  return (
    <Flex h="100vh">
      <VStack w="50%" p={5} spacing={5} borderRight="1px" borderColor="gray.200">
        <Heading size="lg">Schema Creator</Heading>
        <FormControl id="schemaName">
          <FormLabel>Schema Name</FormLabel>
          <Input placeholder="Enter schema name" />
        </FormControl>
        <FormControl id="keyName">
          <FormLabel>Key Name</FormLabel>
          <Input
            placeholder="Enter key name"
            value={keyName}
            onChange={(e) => setKeyName(e.target.value)}
          />
        </FormControl>
        <Button onClick={handleAddToSchema} isDisabled={!selectedElement || !keyName} leftIcon={<FaMousePointer />}>
          Add to Schema
        </Button>
        <Button colorScheme="green" onClick={handleSubmit}>
          Submit Schema
        </Button>
        <pre>{JSON.stringify(schema, null, 2)}</pre>
      </VStack>
      <Box w="50%" p={5}>
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          {Array.from({ length: 9 }, (_, i) => `element-${i}`).map((elementName, i) => (
            <GridItem
              key={elementName}
              id={elementName}
              p={5}
              boxShadow="md"
              borderRadius="md"
              transition="all 0.3s"
              _hover={{ bg: 'gray.100', cursor: 'pointer' }}
              onClick={(e) => handleElementClick(e, elementName)}
              bg={selectedElement === elementName ? 'teal.100' : 'white'}
            >
              <Image src="https://images.unsplash.com/photo-1599009434802-ca1dd09895e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxwbGFjZWhvbGRlcnxlbnwwfHx8fDE3MDQwMjYyODB8MA&ixlib=rb-4.0.3&q=80&w=1080" borderRadius="md" />
              <Heading size="md" mt={3}>Title {i + 1}</Heading>
              <Text mt={1}>This is a short description for item {i + 1}.</Text>
              <Button mt={3}>Read More</Button>
            </GridItem>
          ))}
        </Grid>
      </Box>
    </Flex>
  );
};

export default Index;
