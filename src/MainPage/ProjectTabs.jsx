import React from 'react'
import {
    Box,
    Heading,
    Link,
    Stack,
    Text,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
} from '@chakra-ui/react'

// tabs with projects that are changing with position change
const ProjectTabs = ({
    positions,
    position,
    projects,
    setTimer,
    setPosition,
    colors,
    timer,
}) => {
    const [triggered, setTriggered] = React.useState(false)
    const handleTabsChange = (index) => {
        console.log('index: ', index)
        setPosition(index)
        setTriggered(true)
        setTimer(10000)
    }
    const [progressBarValue, setProgressBarValue] = React.useState(0)

    return (
        <Box>
            <Tabs index={position} onChange={handleTabsChange}>
                <TabList mb="1em">
                    {projects.map((project, index) => {
                        return (
                            <Tab
                                key={index}
                                w="full"
                                _selected={{
                                    boxShadow: 'lg',
                                    borderRadius: 'md',
                                    border: '1px',
                                    borderColor: colors[index],
                                    bg: colors[index],
                                    height: '100px',
                                }}
                            >
                                {project.position}
                            </Tab>
                        )
                    })}
                </TabList>
                <TabPanels>
                    {projects.map((project, index) => {
                        return (
                            <TabPanel key={index}>
                                <Stack spacing={8} mx={'auto'} py={12} px={6}>
                                    <Stack align={'center'}>
                                        <Heading fontSize={'4xl'}>
                                            {project.name}
                                        </Heading>
                                        <Text
                                            fontSize={'lg'}
                                            color={'gray.600'}
                                        >
                                            {project.description}
                                        </Text>
                                        <Link href={project.link} isExternal>
                                            <Text
                                                fontSize={'lg'}
                                                color={'gray.600'}
                                            >
                                                {project.link}
                                            </Text>
                                        </Link>
                                    </Stack>
                                </Stack>
                            </TabPanel>
                        )
                    })}
                </TabPanels>
            </Tabs>
        </Box>
    )
}

export default ProjectTabs
