import { Button, Container, Flex, SimpleGrid } from '@chakra-ui/react'
import Layout from '../../components/layouts/article'
import Section from '../../components/section'
import { ProcedureItem, IngredientsItem } from '../../components/list-item'
import { RecipeTitle } from '../../components/recipe'

import thumbGettingStartedWithFreelancing from '../../public/images/blogs/getting-started-with-freelancing.png'

const Recipe = () => (
    <Layout title="Biryani">
        <Container>
            <Flex align="center" justify="space-between">
            <RecipeTitle>
                Biryani
            </RecipeTitle>
            <Button>Edit Recipe</Button>
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

export default Recipe
export { getServerSideProps } from '../../components/chakra'