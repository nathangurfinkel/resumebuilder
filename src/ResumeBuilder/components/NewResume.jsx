import React, { useState } from 'react'
import {
    Flex,
    Stack,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Button,
} from '@chakra-ui/react'

const cardWidth = '400px'

const NewResume = ({ onCreateNewResume }) => {
    return (
        <Flex
            direction={'column'}
            alignItems={'center'}
            justifyContent={'center'}
            w="100%"
        >
            <form
                form="new-resume-form"
                onSubmit={(e) => {
                    e.preventDefault()
                    
                    onCreateNewResume(e.target['new-resume-identifier'].value)
                }}
            >
                <Stack
                    spacing={4}
                    p={4}
                    borderRadius="lg"
                    boxShadow="lg"
                    direction={'column'}
                    alignItems={'start'}
                    justifyContent={'center'}
                    width={cardWidth}
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
                            onKeyDownCapture={(e) => {
                                if (e.key === 'Enter') {
                                    onCreateNewResume()
                                }
                            }}
                        />
                    </FormControl>
                    <Button colorScheme="teal" w={'100%'} type="submit">
                        Create
                    </Button>
                </Stack>
            </form>
        </Flex>
    )
}
export default NewResume
