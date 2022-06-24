import NextLink from 'next/link'
import {
  Heading,
  Text,
  Container,
  Divider,
  Button,
  Flex
} from '@chakra-ui/react'

const NotFound = () => {
  return (
    <Container>
      <Heading as="h1">Not found</Heading>
      <Text>The page you&apos;re looking for was not found.</Text>
      <Divider my={6} />
      <Flex my={6} align="center">
        <NextLink href="/" passHref>
          <Button colorScheme="teal">Return to home</Button>
        </NextLink>
      </Flex>
    </Container>
  )
}

export default NotFound
