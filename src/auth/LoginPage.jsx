import React from 'react'
import { Box, Flex } from '@chakra-ui/react'
import LoginForm from './LoginForm'
export default function LoginPage() {
    return (
        <Flex
            direction="column"
            align="center"
            justify="center"
            w={'100%'}
        >
            <LoginForm />
        </Flex>
    )
}
