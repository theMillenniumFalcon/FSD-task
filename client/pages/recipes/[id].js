import { Box, Button, Container, Flex, IconButton, SimpleGrid } from '@chakra-ui/react'
import Layout from '../../components/layouts/article'
import Section from '../../components/section'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { ProcedureItem, IngredientsItem } from '../../components/list-item'
import { RecipeTitle } from '../../components/recipe'
import axios from 'axios'
import { MdDelete } from "react-icons/md"

import thumbGettingStartedWithFreelancing from '../../public/images/blogs/getting-started-with-freelancing.png'

const Recipe = () => {
    const router = useRouter()
    const [recipe, setRecipe] = useState({})
    useEffect(() => {
        if (!localStorage.getItem("authToken")) {
            router.replace('/login')
        }
        // const getData = async () => {
        //     const config = {
        //       headers: {
        //         Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        //       },
        //     }

        //     try {
        //       const recipe = await axios.get('http://localhost:4000/recipes/', config)
        //       setRecipe(recipe.data)
        //     } catch (error) {
        //       router.push('/')
        //       console.log(error)
        //     }
        //   }
        //   getData()
    }, [router])

    return (
        <Layout title="Biryani">
            <Container>
                <Flex align="center" justify="space-between">
                    <RecipeTitle>
                        Biryani
                    </RecipeTitle>
                    <Box>
                        <Button mr={2}>Edit Recipe</Button>
                        <IconButton icon={<MdDelete />} aria-label="Delete Post" />
                    </Box>
                </Flex>
                <SimpleGrid columns={[1, 1, 1]} gap={6}>
                    <Section>
                        <IngredientsItem title="Ingredients" item="Rice" />
                    </Section>
                    <Section>
                        <ProcedureItem
                            title="Procedure"
                            thumbnail={thumbGettingStartedWithFreelancing}
                            id="1"
                            item="Cook it"
                        />
                    </Section>
                </SimpleGrid>
            </Container>
        </Layout>
    )
}

export default Recipe
export { getServerSideProps } from '../../components/chakra'