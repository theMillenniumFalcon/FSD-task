import { Box, UnorderedList, ListItem, Text } from "@chakra-ui/react";
import Image from 'next/image'
import { Global } from '@emotion/react'

export const IngredientsItem = ({ title, item }) => (
    <Box w="100%">
        <Text fontSize={18}>{title}</Text>
        <UnorderedList>
            <ListItem>
                <Text fontSize={15}>{item}</Text>
            </ListItem>
        </UnorderedList>
    </Box>
)

export const ProcedureItem = ({ title, thumbnail, item }) => (
    <Box w="100%">
        <Text fontSize={18}>{title}</Text>
        <UnorderedList mb={2}>
            <ListItem>
                <Text fontSize={15}>{item}</Text>
            </ListItem>
        </UnorderedList>
        <Image
            src={thumbnail}
            alt={title}
            className="grid-item-thumbnail"
            placeholder="blur"
            loading="lazy"
        />
    </Box>
)


export const ProcedureItemStyle = () => (
    <Global
        styles={`
        .grid-item-thumbnail {
          border-radius: 12px;
        }
      `}
    />
)