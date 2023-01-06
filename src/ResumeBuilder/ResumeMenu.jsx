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

    if (resumeList.data.length === 0) return <>No resumes found</>
    return (
        <>
            <Menu>
                <MenuButton
                    w={{ base: '100%', md: '300px' }}
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                >
                    {resume?.identifier || 'Select a resume'}
                </MenuButton>
                <MenuList>
                    {resumeList.data.map((resume) => (
                        <MenuItem
                            key={resume._id}
                            onClick={() => {
                                setResume(resume)
                                setNewResumeMode(false)
                            }}
                        >
                            <Heading size={{ base: 'sm', md: 'md' }}>
                                {resume.identifier}
                            </Heading>
                            <Spacer />
                            {
                                //check if first resume in list
                                resumeList.data[0]._id === resume._id && (
                                    <Badge
                                        colorScheme="blue"
                                        size={{ base: 'sm', md: 'md' }}
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
