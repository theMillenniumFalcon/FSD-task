import { Box, Container, Input, Flex, Button, Text, Textarea } from '@chakra-ui/react'
import Layout from '../../../components/layouts/article'
import { RecipeTitle } from '../../../components/recipe'
import Section from '../../../components/section'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

const EditRecipe = () => {
    const router = useRouter()
    const [recipe, setRecipe] = useState({})
    const [error, setError] = useState("")
    const id = (router.asPath.split('/')[2])
    useEffect(() => {
        if (!localStorage.getItem("authToken")) {
            router.replace('/login')
        }

        const getData = async () => {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            }

            try {
                const recipe = await axios.get(`http://localhost:4000/recipes/${id}`, config)
                setRecipe(recipe.data)
            } catch (error) {
                router.push('/')
                console.log(error)
            }
        }
        getData()
    }, [id, router])
    return (
        <Layout title="Edit Recipe">
            <Container>
                <RecipeTitle>
                    Edit recipe
                </RecipeTitle>
                <Section>
                    <form>
                        <Box w="100%" p={7}>
                            {error && <Text>{error}</Text>}
                            <Box>
                                <Text mb={1}>Name of the recipe</Text>
                                <Input placeholder="name of the recipe" defaultValue={recipe.name} />
                            </Box>
                            <Box mt={4}>
                                <Text mb={1}>Recipe Ingredients</Text>
                                <Textarea placeholder="ingredients" />
                            </Box>
                            <Box mt={4}>
                                <Text mb={1}>Recipe Procedure</Text>
                                <Textarea placeholder="procedure" />
                            </Box>
                            <Flex align="center" justify="space-between" mt={4}>
                                <Button type='submit'>Edit Recipe</Button>
                            </Flex>
                        </Box>
                    </form>
                </Section>
            </Container>
        </Layout>
    )
}

export default EditRecipe
export { getServerSideProps } from '../../../components/chakra'