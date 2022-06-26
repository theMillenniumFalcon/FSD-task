import { Box, Container, Input, Flex, Button, Link, Text } from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Login = () => {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    useEffect(() => {
      if (localStorage.getItem("authToken")) {
        router.push('/')
        router.reload()
      }
    }, [router])
    

    const loginHandler = async (e) => {
        e.preventDefault()

        const config = {
            header: {
                "Content-Type": "application/json",
            },
        }

        try {
            const { data } = await axios.post(
                "http://localhost:4000/auth/login",
                {
                    email,
                    password,
                },
                config
            )

            localStorage.setItem("authToken", data.token)

            router.push("/")
        } catch (error) {
            setError(error.response.data.error)
            setTimeout(() => {
                setError("")
            }, 5000)
        }
    }

    return (
        <Layout title="Login">
            <Container>
                <Section>
                    <form onSubmit={loginHandler}>
                        <Box w="100%" p={7}>
                            {error && <Text>{error}</Text>}
                            <Box mt={4}>
                                <Text mb={1}>Email</Text>
                                <Input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </Box>
                            <Box mt={4}>
                                <Text mb={1}>Password</Text>
                                <Input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </Box>
                            <Flex align="center" justify="space-between" mt={4}>
                                <Button type='submit'>Login</Button>
                                <NextLink href="/signup" passHref>
                                    <Link ml='auto'>Create a new account</Link>
                                </NextLink>
                            </Flex>
                        </Box>
                    </form>
                </Section>
            </Container>
        </Layout>
    )
}

export default Login
export { getServerSideProps } from '../components/chakra'