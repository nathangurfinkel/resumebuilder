import { Box, Flex, Heading, Text, Icon, VStack } from '@chakra-ui/react'

function EffortlessSection() {
    return (
        <VStack
            alignItems="flex-start"
            spacing={3}
            rounded="lg"
            p={5}
            bg="teal.50"
        >
            <Heading as="h2" size="lg" textAlign="center" mb={3}>
                Effortless
            </Heading>
            <Icon name="time" mr={3} size="24px" />
            <Heading size="md">Save Time</Heading>
            <Text>
                With our easy-to-use interface and pre-written content, building
                your resume takes just minutes.
            </Text>
            <Icon name="lightning-bolt" mr={3} size="24px" />
            <Heading size="md">Streamline the Process</Heading>
            <Text>
                Say goodbye to the tedious task of creating a resume from
                scratch. Our app does all the heavy lifting for you.
            </Text>
        </VStack>
    )
}

export default EffortlessSection
