import { Box, Button, Container, Flex, Heading, SimpleGrid, Text, Link, InputGroup, InputLeftElement, Input } from '@chakra-ui/react'
import Layout from '../../components/layouts/article'
import Section from '../../components/section'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import NextLink from 'next/link'
import axios from 'axios'
import { IoIosSearch } from 'react-icons/io'
import { baseURL } from '../../constants/baseURL'

const Recipes = () => {
  const router = useRouter()
  const [recipes, setRecipes] = useState([])
  const [thumbnail, setThumbnail] = useState({})
  const [searchTerm, setSearchTerm] = useState('')

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
        const recipes = await axios.get(`${baseURL}/recipes`, config)
        setRecipes(recipes.data)
      } catch (error) {
        router.push('/')
        console.log(error)
      }
    }
    getData()
  }, [router])

  return (
    <Layout title="Recipes">
      <Container>
        <Box w="100%" mb={3}>
          <InputGroup>
            <InputLeftElement
              pointerEvents='none'
              // eslint-disable-next-line react/no-children-prop
              children={<IoIosSearch />}
            />
            <Input placeholder='Search for recipe name'
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Box>
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
            {recipes.filter((val) => {
              // {console.log(val)}
              if (searchTerm == "") {
                return val
              } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                return val
              }
            }).map((item) => (
              <Box key={item._id}>
                <Heading as='h4' size='md'>
                  <Link href={`/recipes/${item._id}`}>{item.name}</Link>
                </Heading>
                {/* <Text>{item.photo.split(',')[0].substring(12)}</Text> */}
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