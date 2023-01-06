import { useColorModeValue } from '@chakra-ui/color-mode'
import { ArrowDownIcon, ArrowUpIcon, CheckCircleIcon } from '@chakra-ui/icons'
import { useBreakpointValue } from '@chakra-ui/media-query'
import {
    Button,
    Center,
    Divider,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Spacer,
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
    onUpdate,
}) => {
    const toast = useToast()
    const uploadText = useBreakpointValue(
        { base: '', md: 'Upload File' },
        { fallback: 'base' }
    )
    const downloadText = useBreakpointValue(
        { base: '', md: 'Download File' },
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
        <>
            <FileUploadModal
                fileUploadOpen={fileUploadOpen}
                setFileUploadOpen={setFileUploadOpen}
                handleFile={handleFile}
                file={file}
            />

            <Stack
                divider={<Divider orientation="vertical" />}
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
                <Stack direction={'row'} alignItems={'center'} spacing={2}>
                    {resumeList && (
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
                    {resume && (
                        //delete resume button
                        <Button size="md" variant={'ghost'} colorScheme="red">
                            <Text fontSize={'sm'}>Delete</Text>
                        </Button>
                    )}
                </Stack>
                {/* draw sync icon inside circular progress and if udpdateResume show check icon */}
                {updateResumeLoading ? (
                    <Spinner color="teal.500" size="md" thickness="4px" />
                ) : (
                    updateResume && (
                        <CheckCircleIcon color="green.500" fontSize="xl" />
                    )
                )}
                <Spacer />
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
            </Stack>
        </>
    )
}

export default ToolBar
function FileUploadModal({
    fileUploadOpen,
    setFileUploadOpen,
    handleFile,
    file,
}) {
    return (
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
    )
}
