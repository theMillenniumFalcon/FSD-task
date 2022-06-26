import { Box, Button, Container, Flex, Heading, SimpleGrid } from '@chakra-ui/react'
import Layout from '../../components/layouts/article'
import Section from '../../components/section'
import { GridItem } from '../../components/grid-item'
import Searchbar from '../../components/searchbar'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import NextLink from 'next/link'
import axios from 'axios'

import thumbGettingStartedWithFreelancing from '../../public/images/blogs/getting-started-with-freelancing.png'

const Recipes = () => {
  const router = useRouter()
  const [recipes, setRecipes] = useState([])

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
        const recipes = await axios.get('http://localhost:4000/recipes', config)
        setRecipes(recipes.data)
      } catch (error) {
        router.push('/')
      }
    }
    getData()
  }, [router])

  return (
    <Layout title="Recipes">
      <Container>
        <Searchbar />
        <Flex align="center" justify="space-between" mb={4}>
          <Heading as="h3" fontSize={20} mb={4}>
            Recipes
          </Heading>
          <Button>
            <NextLink href="/add-recipe" passHref>Add Recipe</NextLink>
          </Button>
        </Flex>

        <Section delay={0.1}>
          <SimpleGrid columns={[1, 2, 2]} gap={6}>
            {recipes.map((item) => (
              <Box key={item._id}>
                <GridItem
                  title={item.name}
                  thumbnail={thumbGettingStartedWithFreelancing}
                  id={item._id}
                />
              </Box>
            ))}
          </SimpleGrid>
        </Section>
      </Container>
    </Layout>
  )
}

export default Recipes
export { getServerSideProps } from '../../components/chakra'