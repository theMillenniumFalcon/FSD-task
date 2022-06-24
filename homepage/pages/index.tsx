import NextLink from 'next/link'
import {
  Link,
  Container,
  Heading,
  Box,
  Button,
  chakra,
  Flex
} from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import Paragraph from '../components/paragraph'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import Image from 'next/image'

const ProfileImage = chakra(Image, {
  shouldForwardProp: prop => ['width', 'height', 'src', 'alt'].includes(prop)
})

const Home = () => (
  <Layout title="">
    <Container>
      <Box display={{ md: 'flex' }}>
        <Box flexGrow={1}>
          <Heading as="h2" variant="page-title">
            Nishank Priydarshi
          </Heading>
          <p>Web Developer / Designer / Blogger</p>
        </Box>
        <Box
          flexShrink={0}
          mt={{ base: 4, md: 0 }}
          ml={{ md: 6 }}
          textAlign="center"
        >
          <Box
            borderColor="whiteAlpha.800"
            borderWidth={2}
            borderStyle="solid"
            w="100px"
            h="100px"
            display="inline-block"
            borderRadius="full"
            overflow="hidden"
          >
            <ProfileImage
              src="/images/takuya.jpg"
              alt="Profile image"
              borderRadius="full"
              width="100%"
              height="100%"
            />
          </Box>
        </Box>
      </Box>

      <Section delay={0.1}>
        <Heading as="h3" variant="section-title">
          Work
        </Heading>
        <Paragraph>
          Hello! My name is Nishank. I&apos;m a computer science student from 🇮🇳.
          I am a keen learner📕 and deeply passionate about Software development💻.
        </Paragraph>
        <Paragraph>
          Dreaming up ideas and making them come true is where my passion lies.
          You can find my{' '}
          <NextLink href="/projects" passHref scroll={false}>
            <Link href='/projects'>
              full projects list here.
            </Link>
          </NextLink>
        </Paragraph>
        <Paragraph>
          If you are interested you can also checkout my{' '}
          <NextLink href="/books" passHref scroll={false}>
            <Link href='/books'>
              recommended books.
            </Link>
          </NextLink>
        </Paragraph>
        <Flex align="center" my={4}>
          <NextLink href="/works" passHref scroll={false}>
            <Button rightIcon={<ChevronRightIcon />} colorScheme="teal">
              My resume
            </Button>
          </NextLink>
        </Flex>
      </Section>

      <Section delay={0.3}>
      </Section>

      <Section delay={0.3}>
        <Heading as="h3" variant="section-title">
          I ♥
        </Heading>
        <Paragraph>
          Outside of programming, I enjoy design, reading books
          and traveling. If you happen to be in the same city I live
          (currently in New Delhi), maybe we can hang out together.
        </Paragraph>
      </Section>
    </Container>
  </Layout>
)

export default Home
export { getServerSideProps } from '../components/chakra'
