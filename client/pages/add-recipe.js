import { Box, Container, Input, Flex, Button, Text, Textarea, useControllableProp } from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import { RecipeTitle } from '../components/recipe'
import Section from '../components/section'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import FileBase64 from 'react-file-base64'
import axios from 'axios'

const AddRecipe = () => {
    const router = useRouter()
    const [name, setName] = useState("")
    const [list, setList] = useState([""])
    const [ingredients, setIngredients] = useState("")
    const [procedure, setProcedure] = useState("")
    const [error, setError] = useState("")
    const [photos, setPhotos] = useState("")

    console.log(ingredients)
    console.log(list)

    const handleChange = (event) => {
        setIngredients(event.target.value)
    }

    const handleKeyDown = (event) => {
        if (event.keyCode === 'a') {
            const newList = list.push(ingredients)
            setList(newList)
            setIngredients("")
        }
    }

    useEffect(() => {
        if (!localStorage.getItem("authToken")) {
            router.replace('/login')
        }
    }, [router])

    const addRecipeHandler = async (e) => {
        e.preventDefault()

        const config = {
            header: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
        }

        try {
            await axios.post(
                "http://localhost:4000/recipes",
                {
                    name,
                    ingredients,
                    procedure,
                },
                config
            )

            router.push("/")
        } catch (error) {
            setError(error.response.data.error)
            setTimeout(() => {
                setError("")
            }, 5000)
        }
    }

    return (
        <Layout title="Add Recipe">
            <Container>
                <RecipeTitle>
                    Add recipe
                </RecipeTitle>
                <Section>
                    <form onSubmit={addRecipeHandler}>
                        <Box w="100%" p={7}>
                            {error && <Text color="red">{error}</Text>}
                            <Box>
                                <Text mb={1}>Name of the recipe</Text>
                                <Input placeholder="name of the recipe" value={name} onChange={(e) => setName(e.target.value)} />
                            </Box>
                            <Box mt={4}>
                                <Text>Recipe Ingredients</Text>
                                <Text fontSize='xs' mb={1}>(after each ingredient press enter to continue typing next ingredient)</Text>
                                <Textarea
                                    placeholder="ingredients"
                                    value={ingredients}
                                    onChange={handleChange}
                                    handleKeyDown={handleKeyDown}
                                />
                            </Box>
                            <Box mt={4}>
                                <Text mb={1}>Recipe Procedure</Text>
                                <Text fontSize='xs' mb={1}>(after each step press enter and continue typing next step)</Text>
                                <Textarea placeholder="procedure" value={procedure} onChange={(e) => setProcedure(e.target.value)} />
                            </Box>
                            {/* <Box mt={4}>
                                <Text mb={1}>Recipe Photos</Text>
                                <FileBase64
                                    multiple={true}
                                    onDone={({ base64 }) => setPhotos(base64)}
                                />

                            </Box> */}
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