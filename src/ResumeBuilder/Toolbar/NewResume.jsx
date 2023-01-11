import React, { useState } from 'react'
import {
    Flex,
    VStack,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Button,
} from '@chakra-ui/react'

const NewResumeForm = ({ newResumeRun }) => {
    const [identifier, setIdentifier] = useState(null)
    const onCreateNewResume = () => {
        newResumeRun({ identifier: identifier })
    }
    return (
        <VStack
            spacing={4}
            p={4}
            m={4}
            borderRadius="lg"
            boxShadow="lg"
            alignItems={'start'}
            justifyContent={'center'}
            width={'100%'}
            roundedTop={'none'}
        >
            <Heading size="lg">
                Create a new resume or select from the list above
            </Heading>
            <FormControl id="name" isRequired>
                <FormLabel>New resume identifier</FormLabel>
                <Input
                    id="new-resume-identifier"
                    placeholder="Product Manager 2021"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    onKeyDownCapture={(e) => {
                        if (e.key === 'Enter') {
                            onCreateNewResume()
                        }
                    }}
                />
            </FormControl>
            <Button
                colorScheme="teal"
                w={'100%'}
                onClick={() => onCreateNewResume()}
            >
                Create
            </Button>
        </VStack>
    )
}
export default NewResumeForm
