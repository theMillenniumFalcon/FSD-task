import NextLink from 'next/link'
import { Formik, Form } from 'formik'
import { Box, Container, Flex, Link, Button } from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import InputForm from '../components/InputForm'

const Register = () => (
    <Layout title="Login">
        <Container>
            <Section>
                <Formik initialValues={{ username: "", password: "" }}
                    onSubmit={async (values, { setErrors }) => {
                        //   const response = await register(values)
                        //   if (response.data?.register.errors) {
                        //     setErrors(Errors(response.data.register.errors))
                        //   } else if (response.data?.register.user) {
                        //     // * worked
                        //     router.push('/')
                        //   }
                        //   console.log(values)
                        //   return register(values)
                    }}>
                    {({ isSubmitting }) => (
                        <Box w="100%" p={7} borderRadius='20px'>
                            <Form>
                                <Box>
                                    <InputForm name="username" placeholder="username" label="Username" />
                                </Box>
                                <Box mt={4}>
                                    <InputForm name="password" placeholder="password" label="Password" type="password" />
                                </Box>
                                <Flex align="center" justify="space-between" mt={4}>
                                    <Button isLoading={isSubmitting}>Login</Button>
                                    <NextLink href="/signup" passHref>
                                        <Link ml='auto'>Create a new account</Link>
                                    </NextLink>
                                </Flex>
                            </Form>
                        </Box>
                    )}
                </Formik >
            </Section>
        </Container>
    </Layout>
)

export default Register
export { getServerSideProps } from '../components/chakra'