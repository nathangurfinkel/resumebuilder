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
                        maxW={{ base: '150px', md: '300px' }}
                        minW={{ base: '150px', md: '300px' }}
                        as={Button}
                        rightIcon={<ChevronDownIcon />}
                        isDisabled={resumeList && resumeList.data.length === 0}
                    >
                        {resume && (
                            <Heading
                                size={{ base: 'xs', md: 'sm' }}
                                isTruncated
                            >
                                {resume.identifier}
                            </Heading>
                        )}
                        {!resume &&
                            resumeList &&
                            resumeList.data.length === 0 && (
                                <Heading
                                    size={{ base: 'xs', md: 'sm' }}
                                    isTruncated
                                >
                                    No Resumes
                                </Heading>
                            )}
                        {!resume &&
                            resumeList &&
                            resumeList.data.length >= 1 && (
                                <Heading
                                    size={{ base: 'xs', md: 'sm' }}
                                    isTruncated
                                >
                                    Select Resume
                                </Heading>
                            )}
                    </MenuButton>
                    {resumeList && resumeList.data.length !== 0 && (
                        <MenuList
                            maxW={{ base: '300px', md: '300px' }}
                            minW={{ base: '150px', md: '300px' }}
                        >
                            {resumeList.data.map((resume) => (
                                <MenuItem
                                    key={resume._id}
                                    onClick={() => {
                                        setResume(resume)
                                        setNewResumeMode(false)
                                    }}
                                >
                                    <Heading
                                        size={{ base: 'xs', md: 'sm' }}
                                        isTruncated
                                    >
                                        {resume.identifier}
                                    </Heading>
                                    <Spacer />
                                    {
                                        //check if first resume in list
                                        resumeList.data[0]._id ===
                                            resume._id && (
                                            <Badge
                                                colorScheme="blue"
                                                size={{ base: 'xs', md: 'sm' }}
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
                    )}
                </Menu>
            </div>
        </>
    )
}

export default ResumeMenu
