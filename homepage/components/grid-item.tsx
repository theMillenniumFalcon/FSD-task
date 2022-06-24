import NextLink from 'next/link'
import Image from 'next/image'
import { Box, Text, LinkBox } from '@chakra-ui/react'
import { Global } from '@emotion/react'

export const GridItem = ({ id, title, thumbnail }: any) => (
  <Box w="100%" textAlign="center">
    <LinkBox cursor="pointer">
      <NextLink href={`/recipes/${id}`} passHref scroll={false}>
        <Box>
          <Image
            src={thumbnail}
            alt={title}
            className="grid-item-thumbnail"
            placeholder="blur"
            loading="lazy"
          />
          <Text mt={2}>{title}</Text>
        </Box>
      </NextLink>
    </LinkBox>
  </Box>
)

export const GridItemStyle = () => (
  <Global
    styles={`
      .grid-item-thumbnail {
        border-radius: 12px;
      }
    `}
  />
)
