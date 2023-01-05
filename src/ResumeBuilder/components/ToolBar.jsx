import { useColorModeValue } from '@chakra-ui/color-mode'
import { ArrowDownIcon, ArrowUpIcon, CheckCircleIcon } from '@chakra-ui/icons'
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
} from '@chakra-ui/react'
import React from 'react'
import { FileUploader } from 'react-drag-drop-files'
import ResumeMenu from '../ResumeMenu'
import RadioIconGroup from './RadioIconGroup'
import { useToast } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { handleDownload } from '../../helpers/handleDownload'
import { CircularProgress } from '@chakra-ui/react'
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
    updateResumeLoading,
    updateResumeError,
    updateResume,
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
        try {
            // read the file data - its a .json file
            const fileReader = new FileReader()
            fileReader.readAsText(file, 'UTF-8')
            fileReader.onload = (e) => {
                const resumeData = JSON.parse(e.target.result)
                setResume(resumeData)
                setNewResumeMode(false)
                console.log('resumeData', resumeData)
                toast({
                    title: 'Resume ' + resumeData?.identifier + ' uploaded',
                    description: 'Your resume has been uploaded',
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })
            }
        } catch (error) {
            toast({
                title: 'Invalid file',
                description: 'The file you selected is not a valid resume file',
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        }
    }

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

                    <Button
                        onClick={() => handleDownload(resume)}
                        size="sm"
                        variant={'ghost'}
                        isDisabled={!resume}
                    >
                        <ArrowDownIcon mr={2} />
                        <Text fontSize={'sm'}>{downloadText}</Text>
                    </Button>
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
                        updateResumeLoading={updateResumeLoading}
                    />
                </>
            )}

            {/* draw sync icon inside circular progress and if udpdateResume show check icon */}

            {updateResumeLoading ? (
                <Spinner color="teal.500" size="md" thickness="4px" />
            ) : (
                updateResume && (
                    <CheckCircleIcon color="green.500" fontSize="xl" />
                )
            )}
        </Stack>
    )
}

export default ToolBar
