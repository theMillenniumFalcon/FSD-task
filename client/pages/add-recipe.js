import { Box, Container, Input, Flex, Button, Text, Textarea } from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import { RecipeTitle } from '../components/recipe'
import Section from '../components/section'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import FileBase64 from 'react-file-base64'

const AddRecipe = () => {
    const router = useRouter()
    const [error, setError] = useState("")
    const [photos, setPhotos] = useState("")
    useEffect(() => {
        if (!localStorage.getItem("authToken")) {
            router.replace('/login')
        }
    }, [router])
    return (
        <Layout title="Add Recipe">
            <Container>
                <RecipeTitle>
                    Add recipe
                </RecipeTitle>
                <Section>
                    <form>
                        <Box w="100%" p={7}>
                            {error && <Text>{error}</Text>}
                            <Box>
                                <Text mb={1}>Name of the recipe</Text>
                                <Input placeholder="name of the recipe" />
                            </Box>
                            <Box mt={4}>
                                <Text mb={1}>Recipe Ingredients</Text>
                                <Textarea placeholder="ingredients" />
                            </Box>
                            <Box mt={4}>
                                <Text mb={1}>Recipe Procedure</Text>
                                <Textarea placeholder="procedure" />
                            </Box>
                            <Box mt={4}>
                                <Text mb={1}>Recipe Photos</Text>
                                <FileBase64
                                    multiple={true}
                                    onDone={({ base64 }) => setPhotos(base64)}
                                />

                            </Box>
                            <Flex align="center" justify="space-between" mt={4}>
                                <Button type='submit'>Add Recipe</Button>
                            </Flex>
                        </Box>
                    </form>
                </Section>
            </Container>
        </Layout>
    )
}

export default AddRecipe
export { getServerSideProps } from '../components/chakra'