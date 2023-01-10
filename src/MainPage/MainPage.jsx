import React from 'react'
import {
    Box,
    Button,
    SimpleGrid,
    Heading,
    HStack,
    VStack,
    Center,
    Divider,
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import FeaturesSection from './FeaturesSection'
import EffortlessSection from './EffertlessSection'

function MainPage() {
    return (
        <VStack spacing={8} mt={5}>
            <Heading as="h1" size="xl" textAlign="center">
                Resume Builder
            </Heading>
            <Center>
                <Button
                    colorScheme="teal"
                    size="lg"
                    mr={3}
                    as={RouterLink}
                    to="/resume-builder"
                >
                    Get Started
                </Button>
            </Center>
            <Divider w={'80%'} m={4} />
            {/* features */}
            <Box p={8}>
                <Heading as="h2" size="lg" textAlign="start" my={3}>
                    Features
                </Heading>
                <Center>
                    <FeaturesSection />
                </Center>
            </Box>
            {/* effortless */}
            {/* <Box p={8}>
                <EffortlessSection />
            </Box> */}
            {/* templates */}
        </VStack>
    )
}

export default MainPage
