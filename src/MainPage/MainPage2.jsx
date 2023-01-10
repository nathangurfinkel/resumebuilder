// Nathan gurfinkel portfolio main page component

import React from 'react'
import {
    Box,
    Flex,
    Heading,
    Stack,
    Text,
    useColorModeValue,
    Card,
    SimpleGrid,
    VStack,
} from '@chakra-ui/react'
import 'animate.css'
import ProjectTabs from './ProjectTabs'
import randomColor from 'randomcolor'

const About = () => {
    const positions = [
        'full stack dev',
        'system analyst',
        'ux enthusiast',
        'experimentator',
    ]
    const colorsLight = randomColor({
        luminosity: 'light',
        count: positions.length,
    })
    const colorsDark = randomColor({
        luminosity: 'dark',
        count: positions.length,
    })

    const [timer, setTimer] = React.useState(3000)
    const [position, setPosition] = React.useState(0)
    // timeout that flips the text

    React.useEffect(() => {
        const interval = setInterval(() => {
            //get element by id and change the animation randomly
            const animations = [
                'animate__animated animate__flash animate__slow',
                'animate__animated animate__pulse animate__slow',
                'animate__animated animate__rubberBand animate__slow',
                'animate__animated animate__shakeX animate__slow',
                'animate__animated animate__shakeY animate__slow',
                'animate__animated animate__headShake animate__slow',
                'animate__animated animate__swing animate__slow',
                'animate__animated animate__tada animate__slow',
                'animate__animated animate__wobble animate__slow',
                'animate__animated animate__jello animate__slow',
                'animate__animated animate__heartBeat animate__slow',
            ]
            const element = document.getElementById('position')

            element.className =
                animations[Math.floor(Math.random() * animations.length)]

            // loop through positions
            if (position === positions.length - 1) {
                setPosition(0)
            } else {
                setPosition(position + 1)
            }

            // change color of text
            const color = document.getElementById('position_div')
            color.style.color =
                '#' + Math.floor(Math.random() * 16777215).toString(16)
        }, timer)
        return () => clearInterval(interval)
    }, [position])

    const colors = useColorModeValue(colorsLight, colorsDark)

    const projects = [
        {
            name: 'amonbgrush',
            description: 'This is my biggest project______________',
            image: 'https://via.placeholder.com/150',
            link: 'https://www.google.com',
            position: 'full stack dev',
        },
        {
            name: 'Some diagrams = i have a lot to show off',
            description: 'This is a project',
            image: 'https://via.placeholder.com/150',
            link: 'https://www.google.com',

            position: 'system analytic',
        },
        {
            name: 'Some fun stuff',
            description: 'some description',
            image: 'https://via.placeholder.com/150',
            link: 'https://www.google.com',
            position: 'ux enthusiast',
        },
        {
            name: 'Personal projects - resume builder and microCSM',
            description: 'This is a project',
            image: 'https://via.placeholder.com/150',
            link: 'https://www.google.com',
            position: 'experimentator',
        },
    ]
    return (
        <Flex direction={'column'} align={'start'} justify={'center'} p={5}>
            {/*big screen size */}
            <SimpleGrid columns={[2, 2, 2, 2]} spacing={10}>
                <VStack
                    spacing={2}
                    align={'center'}
                    justify={'center'}
                    display={['none', 'none', 'flex', 'flex']}
                >
                    <div
                        id={'position_div'}
                        style={{ width: '150px', textAlign: 'center' }}
                    >
                        {' '}
                        <Heading
                            size={'lg'}
                            letterSpacing={'tight'}
                            color={'gray.600'}
                        >
                            My name is Natan and I'm a
                        </Heading>
                        <Card
                            w={'150px'}
                            h={'50px'}
                            bg={colors[position]}
                            boxShadow={'lg'}
                            //align items center
                            display={'flex'}
                            justifyContent={'center'}
                        >
                            <Heading size={'sm'}>
                                <div id={'position'}>{positions[position]}</div>
                            </Heading>
                        </Card>
                    </div>
                    <Heading size={'md'} letterSpacing={'tight'}>
                        based in Israel and I'm looking for a new challenge!
                    </Heading>
                </VStack>
            </SimpleGrid>
            {/* show on small screen size */}

            <Stack
                direction={'column'}
                spacing={2}
                align={'center'}
                justify={'center'}
                display={['flex', 'flex', 'none', 'none']}
            >
                <Text fontSize={'lg'} color={'gray.600'}>
                    {/* if position starts with a or u, e  render "an" , else "u" */}
                    My name is Natan and I'm{' '}
                    {positions[position].startsWith('a') ||
                    positions[position].startsWith('u') ||
                    positions[position].startsWith('e')
                        ? 'an'
                        : 'a'}
                </Text>
                <div
                    id={'position_div'}
                    style={{ width: '150px', textAlign: 'center' }}
                >
                    <Card
                        w={'150px'}
                        h={'50px'}
                        bg={colors[position]}
                        boxShadow={'lg'}
                        //align items center
                        // display={'flex'}
                        justifyContent={'center'}
                    >
                        <Heading size={'sm'}>
                            <div id={'position'}>{positions[position]}</div>
                        </Heading>
                    </Card>
                </div>
                <Text fontSize={'lg'} color={'gray.600'}>
                    based in Israel and I'm looking for a new challenge!
                </Text>
            </Stack>
        </Flex>
    )
}

export default About

// convert to typescript
