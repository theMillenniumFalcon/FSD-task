import NextLink from 'next/link'
import { Heading, Box, Link } from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'

export const BookTitle = ({ children }) => (
  <Box>
    <NextLink href="/books" passHref>
      <Link>Books</Link>
    </NextLink>
    <span>
      {' '}
      <ChevronRightIcon />{' '}
    </span>
    <Heading display="inline-block" as="h3" fontSize={20} mb={4}>
      {children}
    </Heading>
  </Box>
)

