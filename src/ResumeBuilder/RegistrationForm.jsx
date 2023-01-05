import React from 'react'
import {
    Box,
    Link,
    Stack,
    useColorModeValue,
    FormControl,
    FormLabel,
    Input,
    FormHelperText,
    Checkbox,
    Button,
} from '@chakra-ui/react'
function RegistrationForm() {
    return (
        <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
        >
            <Stack spacing={4}>
                <FormControl id="email">
                    <FormLabel>Email address</FormLabel>
                    <Input type="email" />
                    <FormHelperText>
                        We'll never share your email.
                    </FormHelperText>
                </FormControl>

                <FormControl id="password">
                    <FormLabel>Password</FormLabel>
                    <Input type="password" />
                </FormControl>
                <Stack spacing={10}>
                    <Stack
                        direction={{ base: 'column', sm: 'row' }}
                        align={'start'}
                        justify={'space-between'}
                    >
                        <Checkbox>Remember me</Checkbox>
                        <Link color={'blue.400'}>Forgot password?</Link>
                    </Stack>
                    <Button
                        bg={'blue.400'}
                        color={'white'}
                        _hover={{
                            bg: 'blue.500',
                        }}
                    >
                        Sign in
                    </Button>
                </Stack>
            </Stack>
        </Box>
    )
}

export default RegistrationForm
