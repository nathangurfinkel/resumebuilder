// navbar component for the app with a hamburger menu for mobile devices and color mode switcher

import React from 'react'
import {
    Box,
    Flex,
    Heading,
    Stack,
    useColorModeValue,
    useDisclosure,
    useMediaQuery,
    useColorMode,
    IconButton,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    Icon,
    Button,
    MenuGroup,
    HStack,
    useToast,
    useBreakpointValue,
    Spacer,
} from '@chakra-ui/react'
import { Badge } from '@chakra-ui/react'

import { AuthContext } from '../auth/AuthProvider'
import { useContext } from 'react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'

const NavBar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const { colorMode, toggleColorMode } = useColorMode()
    const isDark = colorMode === 'dark'
    const toast = useToast()
    const location = useLocation()
    const navigate = useNavigate()
    const { handleLogin, handleLogout, isLoggedIn } = useContext(AuthContext)

    // check if screen is xs
    const [isLargerThan600] = useMediaQuery('(min-width: 600px)')
    console.log('is logged in: ', isLoggedIn)

    const handleColorMode = () => {
        toggleColorMode()
        toast({
            title: 'Color mode changed.',
            description: "I've changed the color mode for you.",
            status: 'success',
            duration: 3000,
            isClosable: true,
        })
    }

    return (
        <Box>
            <HStack
                as={'nav'}
                spacing={4}
                align={'center'}
                justify={'space-between'}
                // direction={{ base: 'column', md: 'row' }}
                py={4}
                px={8}
                bg={useColorModeValue('white', 'gray.800')}
                borderBottom={1}
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.200', 'gray.900')}
            >
                <Heading
                    size="lg"
                    letterSpacing={'tighter'}
                    // dont wrap the text
                    whiteSpace="nowrap"
                    // onClick={() => navigate('/')}
                >
                    <NavLink to="/">
                        {isLargerThan600 ? 'ResumeBuilder' : 'RB'}
                    </NavLink>
                </Heading>
                {/* desktop nav */}
                <Stack direction={'row'} spacing={4}>
                    <Button
                        px={2}
                        py={1}
                        rounded={'md'}
                        _hover={{
                            textDecoration: 'none',
                            bg: useColorModeValue('gray.200', 'gray.700'),
                        }}
                        // if the current page is the resume builder, then highlight the link based on useParams
                        colorScheme={
                            location.pathname === '/resume-builder'
                                ? 'teal'
                                : 'gray'
                        }
                        variant={
                            location.pathname === '/resume-builder'
                                ? 'outline'
                                : 'ghost'
                        }
                        onClick={() => navigate('/resume-builder')}
                    >
                        {useBreakpointValue({
                            base: 'Builder',
                            md: 'Builder',
                        })}
                        <Badge
                            ml="1"
                            colorScheme="green"
                            display={{ base: 'none', md: 'block' }}
                        >
                            New
                        </Badge>
                    </Button>
                </Stack>
                <Spacer display={{ base: 'none', md: 'block' }} />

                <IconButton
                    size={'md'}
                    fontSize={'lg'}
                    variant={'ghost'}
                    color={useColorModeValue('gray.600', 'gray.200')}
                    marginLeft={'2'}
                    onClick={handleColorMode}
                    icon={
                        isDark ? <Icon as={SunIcon} /> : <Icon as={MoonIcon} />
                    }
                    aria-label={'Color Mode'}
                />

                {/* mobile nav */}

                {/* User Avatar overlay */}

                {isLoggedIn ? (
                    <Menu>
                        <MenuButton as={Button} colorScheme="pink">
                            logged in
                        </MenuButton>
                        <MenuList>
                            <MenuGroup title="Profile">
                                {/* <MenuItem
                                    disabled={true}
                                >My Account</MenuItem> */}
                                {/* <MenuItem>Payments </MenuItem> */}
                            </MenuGroup>
                            <MenuDivider />

                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </MenuList>
                    </Menu>
                ) : (
                    <Button
                        colorScheme="pink"
                        onClick={() => navigate('/login')}
                    >
                        Login
                    </Button>
                )}
            </HStack>
        </Box>
    )
}

export default NavBar
