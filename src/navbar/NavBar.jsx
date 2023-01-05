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
    useToast,
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
            <Flex
                bg={useColorModeValue('white', 'gray.800')}
                color={useColorModeValue('gray.600', 'white')}
                minH={'60px'}
                py={{ base: 2 }}
                px={{ base: 4 }}
                borderBottom={1}
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.200', 'gray.900')}
                align={'center'}
            >
                <Flex
                    flex={{ base: 1 }}
                    justify={{ base: 'center', md: 'start' }}
                >
                    <Heading
                        size="lg"
                        letterSpacing={'tighter'}
                        color={useColorModeValue('gray.800', 'white')}
                        // dont wrap the text
                        whiteSpace="nowrap"
                        // onClick={() => navigate('/')}
                    >
                        <NavLink to="/">
                            {isLargerThan600 ? 'Nathan Gurfinkel' : 'NG'}
                        </NavLink>
                    </Heading>
                    <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
                        {/* desktop nav */}
                        <Stack direction={'row'} spacing={4}>
                            <Button
                                px={2}
                                py={1}
                                rounded={'md'}
                                _hover={{
                                    textDecoration: 'none',
                                    bg: useColorModeValue(
                                        'gray.200',
                                        'gray.700'
                                    ),
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
                                ResumeBuilder
                                <Badge ml="1" colorScheme="green">
                                    New
                                </Badge>
                            </Button>
                            <Button
                                px={2}
                                py={1}
                                rounded={'md'}
                                _hover={{
                                    textDecoration: 'none',
                                    bg: useColorModeValue(
                                        'gray.200',
                                        'gray.700'
                                    ),
                                }}
                                color={
                                    location.pathname === '/micro-cms'
                                        ? 'teal.500'
                                        : 'gray.500'
                                }
                                variant={
                                    location.pathname === '/micro-cms'
                                        ? 'solid'
                                        : 'ghost'
                                }
                                onClick={() => navigate('/micro-cms')}
                                disabled
                            >
                                MicroCMS
                                <Badge ml="1" colorScheme="tomato">
                                    Coming Soon
                                </Badge>
                            </Button>
                        </Stack>
                    </Flex>
                </Flex>

                <Menu>
                    <MenuButton
                        as={Button}
                        variant={'ghost'}
                        // rightIcon={<Icon as={SettingsIcon} />}
                    >
                        Free Tools
                    </MenuButton>
                    <MenuDivider />
                    <MenuList>
                        <MenuItem as="a" href={'/resume-builder'}>
                            ResumeBuilder{' '}
                            <Badge ml="1" colorScheme="green">
                                New
                            </Badge>
                        </MenuItem>

                        <MenuItem as="a" disabled>
                            MicroCMS{' '}
                            <Badge ml="1" colorScheme="tomato">
                                Coming Soon
                            </Badge>
                        </MenuItem>
                    </MenuList>
                </Menu>
                <Flex alignItems={'center'}>
                    <IconButton
                        size={'md'}
                        fontSize={'lg'}
                        variant={'ghost'}
                        color={useColorModeValue('gray.600', 'gray.200')}
                        marginLeft={'2'}
                        onClick={handleColorMode}
                        icon={
                            isDark ? (
                                <Icon as={SunIcon} />
                            ) : (
                                <Icon as={MoonIcon} />
                            )
                        }
                        aria-label={'Color Mode'}
                    />
                </Flex>

                {/* mobile nav */}

                {/* User Avatar overlay */}
                <Flex
                    flex={{ base: 1, md: 0 }}
                    justify={'flex-end'}
                    alignItems={'center'}
                    // spacing={6}
                >
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

                                <MenuItem onClick={handleLogout}>
                                    Logout
                                </MenuItem>
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
                </Flex>
            </Flex>
        </Box>
    )
}

export default NavBar
