import { Box, Container, Input, Flex, Button, Text } from '@chakra-ui/react'
import Layout from '../../../components/layouts/article'
import { RecipeTitle } from '../../../components/recipe'
import Section from '../../../components/section'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { baseURL } from '../../../constants/baseURL'

const EditRecipe = () => {
    const router = useRouter()
    const [recipe, setRecipe] = useState({})
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [ingredients, setIngredients] = useState([""])
    const [procedure, setProcedure] = useState([""])
    const [visibleIngredients, setVisibleIngredients] = useState(true)
    const [visibleProcedure, setVisibleProcedure] = useState(true)
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
                const recipe = await axios.get(`${baseURL}/recipes/${id}`, config)
                setRecipe(recipe.data)
            } catch (error) {
                router.push('/')
                console.log(error)
            }
        }
        getData()
    }, [id, router])

    const addIngredients = () => {
        setIngredients(ingredients.split(','))
        setVisibleIngredients(current => !current)
    }

    const addProcedure = () => {
        setProcedure(procedure.split(','))
        setVisibleProcedure(current => !current)
    }

    const editRecipeHandler = async (e) => {
        e.preventDefault()

        const config = {
            header: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
        }

        try {
            console.group('Uploaded images inside another func', uploadedImages)
            await axios.patch(`${baseURL}/recipes/${id}`, {
                name,
                description,
                ingredients,
                procedure
            },
                config
            )

            router.push("/recipes")
        } catch (error) {
            setError(error.response.data.error)
            setTimeout(() => {
                setError("")
            }, 5000)
        }
    }

    return (
        <Layout title="Edit Recipe">
            <Container>
                <RecipeTitle>
                    Edit recipe
                </RecipeTitle>
                <Section>
                    <form onSubmit={editRecipeHandler}>
                        <Box w="100%" p={7}>
                            {error && <Text>{error}</Text>}
                            <Box>
                                <Text mb={1}>Name of the recipe</Text>
                                <Input placeholder="name of the recipe" value={name} onChange={(e) => setName(e.target.value)} />
                            </Box>
                            <Box mt={4}>
                                <Text mb={1}>Description of the recipe</Text>
                                <Input placeholder="description of the recipe" value={description} onChange={(e) => setDescription(e.target.value)} />
                            </Box>
                            <Box mt={4}>
                                <Text mb={1}>Recipe Ingredients</Text>
                                <Text fontSize='xs' mb={1}>(after each ingredient press , (comma) to continue typing next ingredient,
                                    after writing all ingredients press Submit)</Text>
                                <Flex>
                                    <Input
                                        placeholder="ingredients"
                                        value={ingredients}
                                        onChange={(e) => setIngredients(e.target.value)}
                                    />
                                    {ingredients != "" ? (
                                        <>
                                            {visibleIngredients ? (
                                                <Button ml={2} onClick={addIngredients}>Submit</Button>
                                            ) : null}
                                        </>
                                    ) : null}
                                </Flex>
                            </Box>
                            <Box mt={4}>
                                <Text mb={1}>Recipe Procedure</Text>
                                <Text fontSize='xs' mb={1}>(after each step press , (comma) to continue typing next step,
                                    after writing all steps press Submit)</Text>
                                <Flex>
                                    <Input
                                        placeholder="procedure"
                                        value={procedure}
                                        onChange={(e) => setProcedure(e.target.value)}
                                    />
                                    {procedure != "" ? (
                                        <>
                                            {visibleProcedure ? (
                                                <Button ml={2} onClick={addProcedure}>Submit</Button>
                                            ) : null}
                                        </>
                                    ) : null}
                                </Flex>
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