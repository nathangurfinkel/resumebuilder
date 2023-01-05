// LoginPage.tsx

import React from 'react'

import { useNavigate } from 'react-router-dom'

import { useContext } from 'react'
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
import { AuthContext } from './AuthProvider'
import { useRequest } from 'ahooks'
import { postSignIn } from '../api'

export default function LoginForm({ modal, onClose }) {
    const navigate = useNavigate()
    const [show, setShow] = React.useState(false)
    const { handleLogin } = useContext(AuthContext)
    const toast = useToast()

    const handleSubmit = (e) => {
        e.preventDefault()
        run({
            email: e.target.email.value,
            password: e.target.password.value,
        })
    }

    const { loading, run, data, error } = useRequest(postSignIn, {
        manual: true,
        onSuccess: (result, params) => {
       

            handleLogin(
                result.data.token,
                result.data.userId,
                result.data.expiresAt
            )
            if (modal) {
                onClose()
            } else {
                navigate('/resume-builder')
            }
            toast({
                title: 'Welcome back.',
                description: "I've logged you in.",
                duration: 9000,
                status: 'success',
                isClosable: true,
            })
        },
        onError: (error, params) => {
         
            toast({
                title: 'Error',
                description: JSON.stringify(error.response.statusText),
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        },
    })
    return (
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
                <Heading size="lg" textAlign="center" letterSpacing={'tighter'}>
                    Sign in
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
                    Sign in
                </Button>

                <Text>
                    Don't have an account?
                    <Link
                        color={'teal.400'}
                        onClick={() => navigate('/signup')}
                    >
                        {' '}
                        Sign up here
                    </Link>
                </Text>
            </Stack>
        </form>
    )
}
