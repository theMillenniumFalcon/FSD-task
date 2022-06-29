import { Box, Button, Container, Flex, IconButton, ListItem, SimpleGrid, Text, UnorderedList } from '@chakra-ui/react'
import Layout from '../../../components/layouts/article'
import Section from '../../../components/section'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import { useState, useEffect } from 'react'
import { RecipeTitle } from '../../../components/recipe'
import axios from 'axios'
import { MdDelete } from "react-icons/md"
import Image from 'next/image'
import { baseURL } from '../../../constants/baseURL'

import index from '../../../public/images/index.jpg'

const Recipe = () => {
    const router = useRouter()
    const [recipe, setRecipe] = useState({})
    const [user, setUser] = useState("")
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
                const user = await axios.get(`${baseURL}`, config)
                setRecipe(recipe.data)
                setUser(user.data)
            } catch (error) {
                router.push('/')
                setError(error.response.data.error)
                setTimeout(() => {
                    setError("")
                }, 5000)
            }
        }
        getData()
    }, [id, router])

    let condition = recipe.creatorId == user._id

    const deleteHandler = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
        }
        await axios.delete(`http://localhost:4000/recipes/${id}`, config)
        router.replace('/')
    }

    return (
        <Layout title={recipe.name}>
            <Container>
            {error && <Text>{error}</Text>}
                <Flex align="center" justify="space-between">
                    <RecipeTitle>
                        {recipe.name}
                    </RecipeTitle>
                    {condition ? (
                        <Box>
                            <Button mr={2}>
                                <NextLink href={`/recipes/${id}/edit`} passHref>Edit Recipe</NextLink>
                            </Button>
                            <IconButton icon={<MdDelete />} aria-label="Delete Post" onClick={deleteHandler} />
                        </Box>
                    ) : null}
                </Flex>
                <SimpleGrid columns={[1, 1, 1]} gap={6}>
                    <Section>
                        <Box w="100%">
                            <Text fontSize={18}>Ingredients</Text>
                            <UnorderedList>
                                {recipe.ingredients?.map((item) => !item ? null : (
                                    <ListItem>
                                        <Text fontSize={15}>{item}</Text>
                                    </ListItem>
                                ))}
                            </UnorderedList>
                        </Box>
                    </Section>
                    <Section>
                        <Box w="100%">
                            <Text fontSize={18}>Procedure</Text>
                            <UnorderedList>
                                {recipe.procedure?.map((item) => !item ? null : (
                                    <ListItem>
                                        <Text fontSize={15}>{item}</Text>
                                    </ListItem>
                                ))}
                            </UnorderedList>
                            {recipe.photos?.map((item) => !item ? null : (
                                <Box mt={4}>
                                    <Image
                                        blurDataURL
                                        unoptimized={() => item}
                                        src={item}
                                        alt=""
                                        width={900}
                                        height={600}
                                        style={{ borderRadius: "12px" }}
                                        placeholder="blur"
                                        loading="lazy"
                                    />
                                </Box>
                            ))}
                        </Box>
                    </Section>
                </SimpleGrid>
            </Container>
        </Layout>
    )
}

export default Recipe
export { getServerSideProps } from '../../../components/chakra'