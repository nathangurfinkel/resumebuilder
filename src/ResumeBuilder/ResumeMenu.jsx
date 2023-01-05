import React from 'react'
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    Spacer,
    Badge,
    Heading,
    Text,
    useBreakpointValue,
    CircularProgress,
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'

function ResumeMenu({
    resumeList,
    setResume,
    setNewResumeMode,
    resume,
    updateResumeLoading,
}) {
    const menuWidth = useBreakpointValue({ base: '100%', md: '300px' })
    const textSizes = useBreakpointValue({ base: 'sm', md: 'md' })
    if (resumeList.data.length === 0) return <>No resumes found</>
    return (
        <>
            <Menu>
                <MenuButton
                    w={menuWidth}
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                >
                    {resume?.identifier || 'Select a resume'}
                    
                </MenuButton>
                <MenuList w={menuWidth}>
                    {resumeList.data.map((resume) => (
                        <MenuItem
                            key={resume._id}
                            onClick={() => {
                                setResume(resume)
                                setNewResumeMode(false)
                            }}
                        >
                            <Heading size={textSizes}>
                                {resume.identifier}
                            </Heading>
                            <Spacer />
                            {
                                //check if first resume in list
                                resumeList.data[0]._id === resume._id && (
                                    <Badge
                                        ml="1"
                                        colorScheme="blue"
                                        size={'sm'}
                                        variant="outline"
                                    >
                                        <Text fontSize="sm">last updated</Text>
                                    </Badge>
                                )
                            }
                        </MenuItem>
                    ))}
                </MenuList>
            </Menu>
        </>
    )
}

export default ResumeMenu
