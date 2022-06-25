import { Button, Container, Flex, Heading, SimpleGrid } from '@chakra-ui/react'
import Layout from '../../components/layouts/article'
import Section from '../../components/section'
import { GridItem } from '../../components/grid-item'
import Searchbar from '../../components/searchbar'
import { useRouter } from 'next/router'

import thumbIntroToTypescriptGenerics from '../../public/images/blogs/intro-to-typescript-generics.png'
import thumbWhatAreNodejsStreams from '../../public/images/blogs/what-are-nodejs-streams.png'
import thumbGettingStartedWithFreelancing from '../../public/images/blogs/getting-started-with-freelancing.png'

const Recipes = () => {
  const router = useRouter()
  const [_, setPrivateData] = useState("")

  if (!localStorage.getItem("authToken")) {
    router.push('/login')
  }

  useEffect(() => {
    const fetchPrivateDate = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }

      try {
        const { data } = await axios.get("/api/private", config)
        setPrivateData(data.data)
      } catch (error) {
        localStorage.removeItem("authToken")
        router.push('/llogin')
      }
    }

    fetchPrivateDate()
  }, [router])
  return (
    <Layout title="Recipes">
      <Container>
        <Searchbar />
        <Flex align="center" justify="space-between" mb={4}>
          <Heading as="h3" fontSize={20} mb={4}>
            Recipes
          </Heading>
          <Button>Add Recipe</Button>
        </Flex>

        <Section delay={0.1}>
          <SimpleGrid columns={[1, 2, 2]} gap={6}>
            <GridItem
              title="Getting started with freelancing"
              thumbnail={thumbGettingStartedWithFreelancing}
              id="1"
            />
            <GridItem
              title="What are Node.js streams?"
              thumbnail={thumbWhatAreNodejsStreams}
              id="2"
            />
            <GridItem
              title="Introduction to Typescript generics"
              thumbnail={thumbIntroToTypescriptGenerics}
              id="3"
            />
          </SimpleGrid>
        </Section>
      </Container>
    </Layout>
  )
}

export default Recipes
export { getServerSideProps } from '../../components/chakra'