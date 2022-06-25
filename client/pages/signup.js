import { Box, Container, Input, Flex, Button, Link, Text } from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import axios from 'axios'

const SignUp = () => {
    const router = useRouter()
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")

    useEffect(() => {
        if (localStorage.getItem("authToken")) {
          router.push('/')
        }
      }, [router])

    const registerHandler = async (e) => {
        e.preventDefault()

        const config = {
            header: {
                "Content-Type": "application/json",
            },
        }

        if (password !== confirmPassword) {
            setPassword("")
            setConfirmPassword("")
            setTimeout(() => {
                setError("")
            }, 5000)
            return setError("Passwords do not match")
        }

        try {
            const { data } = await axios.post(
                "http://localhost:4000/auth/register",
                {
                    username,
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
        <Layout title="Sign Up">
            <Container>
                <Section>
                    <form onSubmit={registerHandler}>
                        <Box w="100%" p={7}>
                            {error && <Text>{error}</Text>}
                            <Box>
                                <Text mb={1}>Username</Text>
                                <Input placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                            </Box>
                            <Box mt={4}>
                                <Text mb={1}>Email</Text>
                                <Input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </Box>
                            <Box mt={4}>
                                <Text mb={1}>Password</Text>
                                <Input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </Box>
                            <Box mt={4}>
                                <Text mb={1}>Confirm Password</Text>
                                <Input placeholder="confirm password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                            </Box>
                            <Flex align="center" justify="space-between" mt={4}>
                                <Button type='submit'>Sign Up</Button>
                                <NextLink href="/login" passHref>
                                    <Link ml='auto'>Already have an account?</Link>
                                </NextLink>
                            </Flex>
                        </Box>
                    </form>
                </Section>
            </Container>
        </Layout>
    )
}

export default SignUp
export { getServerSideProps } from '../components/chakra'