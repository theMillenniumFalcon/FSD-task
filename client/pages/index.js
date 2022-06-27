import NextLink from 'next/link'
import {
  Container,
  Heading,
  Box,
  Button,
  useColorModeValue
} from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import Paragraph from '../components/paragraph'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import Image from 'next/image'

import index from '../public/images/index.jpg'

const Home = () => {
  let condition = typeof window !== 'undefined' && localStorage.getItem("authToken")
  return (
    <Layout>
      <Container>
        <Box
          borderRadius="lg"
          mb={6}
          p={3}
          textAlign="center"
          bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')}
          css={{ backdropFilter: 'blur(10px)' }}
        >
          Where our expertise is still a family tradition!
        </Box>

        <Box display={{ md: 'flex' }}>
          <Box flexGrow={1}>
            <Heading as="h2" variant="page-title">
              Food Recipe App
            </Heading>
            <p>Cook, eat, repeat</p>
          </Box>
        </Box>

        <Box mt={4}>
          <Image
            src={index}
            alt=""
            style={{ borderRadius: "12px" }}
            placeholder="blur"
            loading="lazy"
          />
        </Box>

        <Box mt={2}>
        <Section>
          <Paragraph>
            To make good and delicious food is a deam of many but 
            achieved by a few, but not for long. Food Recipe App 
            is your all in one solution to satisfy the chef inside you!
          </Paragraph>
          {!condition && (
            <Box align="center" my={4}>
              <NextLink href="/signup" passHref scroll={false}>
                <Button rightIcon={<ChevronRightIcon />} colorScheme="teal">
                  Get Started
                </Button>
              </NextLink>
            </Box>
          )}
        </Section>
        </Box>
      </Container>
    </Layout>
  )
}

export default Home
export { getServerSideProps } from '../components/chakra'
