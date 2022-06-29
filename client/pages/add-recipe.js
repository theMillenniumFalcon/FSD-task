import { Box, Container, Input, Flex, Button, Text, Textarea, useControllableProp, keyframes } from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import { RecipeTitle } from '../components/recipe'
import Section from '../components/section'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import FileBase64 from 'react-file-base64'
import axios from 'axios'
import { baseURL } from '../constants/baseURL'

const AddRecipe = () => {
    const router = useRouter()
    const [creatorId, setCreatorId] = useState("")
    const [name, setName] = useState("")
    const [ingredients, setIngredients] = useState([""])
    const [procedure, setProcedure] = useState([""])
    const [error, setError] = useState("")
    const [photos, setPhotos] = useState("")
    const [visibleIngredients, setVisibleIngredients] = useState(true)
    const [visibleProcedure, setVisibleProcedure] = useState(true)

    const addIngredients = () => {
        setIngredients(ingredients.split(','))
        setVisibleIngredients(current => !current)
    }

    const addProcedure = () => {
        setProcedure(procedure.split(','))
        setVisibleProcedure(current => !current)
    }

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
                const creator = await axios.get(`${baseURL}`, config)
                setCreatorId(creator.data._id)
                //   console.log(creatorId)
            } catch (error) {
                localStorage.removeItem("authToken")
            }

        }
        getData()
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
                `${baseURL}/recipes`,
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

    const uploadHandler = (e) => {
        e.preventDefault()
        console.log(e.target.file)
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
                                <Text>Recipe Procedure</Text>
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
                            <input value={creatorId} hidden />
                            <Box mt={4}>
                                <Text mb={1}>Recipe Photos</Text>
                                <input type="file" name="photo" onChange={uploadHandler} />
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