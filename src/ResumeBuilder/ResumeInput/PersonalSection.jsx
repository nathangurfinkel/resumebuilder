import React from 'react'

import {
    Box,
    Stack,
    Heading,
    SimpleGrid,
    FormControl,
    FormLabel,
    Input,
} from '@chakra-ui/react'

const PersonalSection = ({ resume, setResume }) => {
    const { name, email, phone } = resume

    return (
        <Box>
            <Heading size="md" mb={2}>
                Perosnal Details
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="100%">
                <FormControl>
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <Input
                        id="name"
                        placeholder="John Smith"
                        value={name}
                        onChange={(e) =>
                            setResume({ ...resume, name: e.target.value })
                        }
                    />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={email}
                        onChange={(e) =>
                            setResume({ ...resume, email: e.target.value })
                        }
                    />
                </FormControl>

                <FormControl>
                    <FormLabel htmlFor="phone">Phone</FormLabel>
                    <Input
                        id="phone"
                        type="tel"
                        placeholder="555-555-5555"
                        value={phone}
                        onChange={(e) =>
                            setResume({ ...resume, phone: e.target.value })
                        }
                    />
                </FormControl>
            </SimpleGrid>
        </Box>
    )
}

export default PersonalSection