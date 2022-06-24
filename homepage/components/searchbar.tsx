import { IoIosSearch } from 'react-icons/io'
import { InputGroup, InputLeftElement, Input, Box } from '@chakra-ui/react'
import React from 'react'

const Searchbar = () => {
    return (
        <Box w="100%" mb={3}>
            <InputGroup>
            <InputLeftElement
                pointerEvents='none'
                // eslint-disable-next-line react/no-children-prop
                children={<IoIosSearch />}
            />
            <Input placeholder='Search for recipe name or ingredients' />
        </InputGroup>
        </Box>
    )
}

export default Searchbar