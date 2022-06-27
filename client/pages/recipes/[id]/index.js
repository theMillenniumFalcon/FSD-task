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

import index from '../../../public/images/index.jpg'

const Recipe = () => {
    const router = useRouter()
    const [recipe, setRecipe] = useState({})
    const [user, setUser] = useState("")
    const [photo, setPhoto] = useState("")
    const id = (router.asPath.split('/')[2])
    useEffect(() => {
        if (!localStorage.getItem("authToken")) {
            router.replace('/login')
        }
        // const getData = async () => {
        //     const config = {
        //         headers: {
        //             Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        //         },
        //     }

        //     try {
        //         const recipe = await axios.get(`http://localhost:4000/recipes/${id}`, config)
        //         const user = await axios.get('http://localhost:4000', config)
        //         const photoURL = await recipe.data.photo.split(',')[0].substring(12)
        //         // const photo = await axios.get(`http://localhost:4000/uploads/${photoURL}`, config)
        //         // console.log(photo)
        //         setRecipe(recipe.data)
        //         console.log((recipe.data.ingredients[0]).split(',')[0])
        //         setUser(user.data)
        //         // setPhoto(photo)
        //     } catch (error) {
        //         router.push('/')
        //         console.log(error)
        //     }
        // }
        // getData()
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

    // function count(string) {
    //     let res = 0;

    //     for (let i = 0; i < string.length; i++) {
    //         if (string.charAt(i) == ',')
    //             res++;
    //     }
    //     return res + 1;
    // }

    // let photoNumber = count(recipe.photo)

    // let body = null
    // function render() {
    //     for (let i = 0; i <= photoNumber; i++) {
    //         body = (
    //             recipe.photo.split(',')[i]
    //         )
    //         i++;
    //     }
    // }
    // render()

    return (
        <Layout title={recipe.name}>
            <Container>
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
                                <ListItem>
                                    {/* <Text fontSize={15}>{recipe.ingredients[0].split(',')[0]}</Text> */}
                                </ListItem>
                            </UnorderedList>
                        </Box>
                    </Section>
                    <Section>
                        <Box w="100%">
                            <Text fontSize={18}>Procedure</Text>
                            <UnorderedList>
                                {/* <ListItem>
                                {recipe.procedure.map((item) => (
                                    <ListItem>
                                        <Text fontSize={15}>{item}</Text>
                                    </ListItem>
                                ))}
                                </ListItem> */}
                            </UnorderedList>
                            <Box mt={4}>
                                <Image
                                    src={index}
                                    alt=""
                                    style={{ borderRadius: "12px" }}
                                    placeholder="blur"
                                    loading="lazy"
                                />
                                {/* {console.log(index)} */}
                            </Box>
                        </Box>
                    </Section>
                </SimpleGrid>
            </Container>
        </Layout>
    )
}

export default Recipe
export { getServerSideProps } from '../../../components/chakra'