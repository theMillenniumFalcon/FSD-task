import NextLink from 'next/link'
import { Formik, Form } from 'formik'
import { Box, Container, Flex, Link, Button } from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import InputForm from '../components/InputForm'

const SignUp = () => (
    <Layout title="Sign Up">
        <Container>
            <Section>
                <Formik initialValues={{ username: "", email: "", password: "" }}
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
                                    <InputForm name="email" placeholder="email" label="Email" />
                                </Box>
                                <Box mt={4}>
                                    <InputForm name="password" placeholder="password" label="Password" type="password" />
                                </Box>
                                <Flex align="center" justify="space-between" mt={4}>
                                    <Button isLoading={isSubmitting}>Sign Up</Button>
                                    <NextLink href="/login" passHref>
                                        <Link ml='auto'>Already have an account?</Link>
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

export default SignUp
export { getServerSideProps } from '../components/chakra'