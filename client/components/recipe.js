import NextLink from 'next/link'
import { Heading, Box, Link } from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'

export const RecipeTitle = ({children}) => (
  <Box>
    <NextLink href="/recipes" passHref>
      <Link>Recipes</Link>
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