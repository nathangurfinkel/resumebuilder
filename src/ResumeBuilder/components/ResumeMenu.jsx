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
    useDisclosure,
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'

function ResumeMenu({
    resumeList,
    setResume,
    setNewResumeMode,
    resume,
    updateResumeLoading,
}) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const className =
        !resume && resumeList.data.length !== 0 && !isOpen
            ? 'animate__animated animate__infinite animate__headShake animate__slow'
            : ''
    return (
        <>
            <div className={className}>
                <Menu isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
                    <MenuButton
                        w={{ base: '100%', md: '300px' }}
                        as={Button}
                        rightIcon={<ChevronDownIcon />}
                    >
                        {resume && (
                            <Heading size={{ base: 'sm', md: 'md' }}>
                                {resume.identifier}
                            </Heading>
                        )}
                        {!resume &&
                            resumeList &&
                            resumeList.data.length === 0 && (
                                <Heading size={{ base: 'sm', md: 'md' }}>
                                    No Resumes
                                </Heading>
                            )}
                        {!resume &&
                            resumeList &&
                            resumeList.data.length > 1 && (
                                <Heading size={{ base: 'sm', md: 'md' }}>
                                    Select Resume
                                </Heading>
                            )}
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
                                            <Text fontSize="sm">
                                                last updated
                                            </Text>
                                        </Badge>
                                    )
                                }
                            </MenuItem>
                        ))}
                    </MenuList>
                </Menu>
            </div>
        </>
    )
}

export default ResumeMenu
