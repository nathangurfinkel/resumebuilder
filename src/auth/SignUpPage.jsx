// Signup.tsx

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRequest } from 'ahooks'

import { register } from '../api'

import {
    Box,
    Stack,
    Text,
    Link,
    InputGroup,
    InputRightElement,
    Input,
    FormControl,
    FormLabel,
    Button,
    useToast,
    Heading,
} from '@chakra-ui/react'

const SignUpPage = () => {
    const navigate = useNavigate()
    const [show, setShow] = React.useState(false)
    const toast = useToast()

    const handleSubmit = (e) => {
        e.preventDefault()
        run({
            email: e.target.email.value,
            password: e.target.password.value,
        })
    }

    const { loading, run, data, error } = useRequest(register, {
        manual: true,
        onSuccess: (result, params) => {
            
            toast({
                title: 'Account created.',
                description: "I've created the account for you.",
                duration: 9000,
                status: 'success',
                isClosable: true,
            })
            navigate('/login')
        },
        onError: (error, params) => {
        
            toast({
                title: 'Error',
                description:  error.data.message,
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        },
    })

    return (
        <Box display="flex" justifyContent="center" alignItems="center" m={2}>
            <form onSubmit={handleSubmit}>
                <Stack
                    spacing={4}
                    maxH={'400px'}
                    maxW={'400px'}
                    // bg={'tomato'}
                    rounded={'lg'}
                    roundedTop={'none'}
                    boxShadow={'lg'}
                    p={8}
                >
                    <Heading
                        size="lg"
                        textAlign="center"
                        letterSpacing={'tighter'}
                    >
                        Sign up
                    </Heading>
                    <FormControl id="email" isRequired>
                        <FormLabel>Email address</FormLabel>
                        <Input type="email" />
                    </FormControl>

                    <FormControl id="password" isRequired>
                        <FormLabel>Password</FormLabel>
                        <InputGroup size="md">
                            <Input
                                pr="4.5rem"
                                type={show ? 'text' : 'password'}
                                placeholder="Enter password"
                            />
                            <InputRightElement width="4.5rem">
                                <Button
                                    h="1.75rem"
                                    size="sm"
                                    onClick={() => setShow(!show)}
                                >
                                    {show ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>

                    <Button
                        bg={'teal.400'}
                        color={'white'}
                        _hover={{
                            bg: 'teal.100',
                            color: 'teal.600',
                            animation: 'pulse 1s infinite',
                        }}
                        type="submit"
                    >
                        Sign up
                    </Button>
                    <Text>
                        Already have an account?
                        <Link
                            color={'teal.400'}
                            onClick={() => navigate('/login')}
                        >
                            Login
                        </Link>
                    </Text>
                </Stack>
            </form>
        </Box>
    )
}

export default SignUpPage
