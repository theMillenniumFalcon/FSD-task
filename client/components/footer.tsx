import { Flex } from '@chakra-ui/react'

const Footer = () => {
  return (
    <Flex align="center" justify="center" opacity={0.4} fontSize="sm">
      &copy; {new Date().getFullYear()} Food Recipe App. All Rights Reserved.
    </Flex>
  )
}

export default Footer
