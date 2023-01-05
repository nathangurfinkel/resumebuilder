import { useColorModeValue } from '@chakra-ui/color-mode'
import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons'
import { useBreakpointValue } from '@chakra-ui/media-query'
import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Spinner,
    Stack,
    Text,
    Tooltip,
} from '@chakra-ui/react'
import React from 'react'
import { FileUploader } from 'react-drag-drop-files'
import ResumeMenu from '../ResumeMenu'
import RadioIconGroup from './RadioIconGroup'
import { useToast } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { handleDownload } from '../../helpers/handleDownload'
const ToolBar = ({
    localMode,
    setLocalMode,
    resume,
    isLoggedIn,
    setLoginOpen,
    resumeListLoading,
    resumeList,
    resumeListError,
    setResume,
    setNewResumeMode,
}) => {
    const toast = useToast()
    const uploadText = useBreakpointValue(
        { base: 'Upload', md: 'Upload File' },
        { fallback: 'base' }
    )
    const downloadText = useBreakpointValue(
        { base: 'Download', md: 'Download File' },
        { fallback: 'base' }
    )
    const [fileUploadOpen, setFileUploadOpen] = React.useState(false)
    const [file, setFile] = useState(null)
    const handleFile = (file) => {
        console.log(file)
        setFile(file)
    }
    console.log('resume', resume)
    useEffect(() => {
        console.log('file useEffect in ResumeBuilder')
        if (file) {
            console.log('file', file)

            try {
                const resumeData = JSON.parse(file)
                //check if the file is a valid resume file by checking if it has at least one property of the resume object
                if (!resumeData.identifier) {
                    throw new Error('Invalid file')
                }

                setResume(resumeData)
                setNewResumeMode(false)
            } catch (error) {
                toast({
                    title: 'Invalid file',
                    description:
                        'The file you selected is not a valid resume file',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })
            }
        }
    }, [file])

    return (
        <Stack
            spacing={4}
            p={4}
            mx={2}
            borderRadius="lg"
            boxShadow="md"
            direction={'row'}
            alignItems={'center'}
            justifyContent={'start'}
            width={'100%'}
            roundedTop={'none'}
            bg={useColorModeValue('teal.50', 'teal.900')}
        >
            <RadioIconGroup isLocal={localMode} setIsLocal={setLocalMode} />

            {localMode && (
                <>
                    <Button
                        onClick={() => setFileUploadOpen(true)}
                        size="sm"
                        variant={'ghost'}
                    >
                        <ArrowUpIcon />
                        <Text fontSize={'sm'}>{uploadText}</Text>
                    </Button>
                    <Tooltip
                        label={
                            resume.identifier === ''
                                ? 'Resume must include identifier'
                                : 'Download resume'
                        }
                        bg={resume.identifier === '' ? 'red' : 'green'}
                        display={resume.identifier === '' ? 'block' : 'none'}
                    >
                        <Button
                            onClick={() => handleDownload(resume)}
                            size="sm"
                            variant={'ghost'}
                            isDisabled={resume.identifier === ''}
                        >
                            <ArrowDownIcon mr={2} />
                            <Text fontSize={'sm'}>{downloadText}</Text>
                        </Button>
                    </Tooltip>
                </>
            )}
            {!localMode && !isLoggedIn && (
                <Button
                    onClick={() => {
                        setLoginOpen(true)
                    }}
                    size="sm"
                >
                    Login
                </Button>
            )}

            <Modal
                isOpen={fileUploadOpen}
                onClose={() => setFileUploadOpen(false)}
                isCentered
            >
                <ModalOverlay />
                <ModalContent>
                    {/* drag and drop json file */}

                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FileUploader
                            handleChange={handleFile}
                            file={file}
                            types={['json']}
                        />
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {resumeListLoading && !resumeList && <Spinner />}
            {resumeListError && <p>error</p>}
            {resumeList && !localMode && isLoggedIn && (
                <>
                    <ResumeMenu
                        resumeList={resumeList}
                        setResume={setResume}
                        resume={resume}
                        setNewResumeMode={setNewResumeMode}
                    />
                </>
            )}
        </Stack>
    )
}

export default ToolBar
