import { useColorModeValue } from '@chakra-ui/color-mode'
import {
    AddIcon,
    ArrowDownIcon,
    ArrowUpIcon,
    CheckCircleIcon,
} from '@chakra-ui/icons'
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
    IconButton,
    Text,
    Box,
    HStack,
    AlertDialog,
    AlertDialogBody,
    AlertDialogOverlay,
    useDisclosure,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogCloseButton,
    useToast,
} from '@chakra-ui/react'
import React from 'react'
import { FileUploader } from 'react-drag-drop-files'
import ResumeMenu from './ResumeMenu'
import RadioIconGroup from './RadioIconGroup'
import { useState, useEffect } from 'react'
import { handleDownload } from '../../helpers/handleDownload'
import { CircularProgress } from '@chakra-ui/react'
import PacmanLoader from 'react-spinners/PacmanLoader'
import { useRequest } from 'ahooks'
import { deleteResumeById } from '../../api'
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
    newResumeMode,
    resumeListRefresh,
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

    const {
        data: deleteResumeData,
        loading: deleteResumeLoading,
        run: deleteResume,
    } = useRequest(deleteResumeById, {
        manual: true,
        onSuccess: (result, params) => {
            console.log('result', result)
            console.log('params', params)

            toast({
                title: 'Resume deleted',
                description: 'Your resume has been deleted',
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
            setResume(null)
            resumeListRefresh()
        },
        onError: (error, params) => {
            console.log('error', error)
            console.log('params', params)
            toast({
                title: 'Error deleting resume',
                description: 'There was an error deleting your resume',
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        },
    })

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
                minH={'80px'}
            >
                <HStack alignItems={'center'} spacing={2}>
                    {resumeListLoading ? (
                        <Center minW={'300px'}>
                            <PacmanLoader
                                color={'#36D7B7'}
                                loading={true}
                                size={15}
                            />
                        </Center>
                    ) : (
                        resumeList && (
                            <>
                                <ResumeMenu
                                    resumeList={resumeList}
                                    setResume={setResume}
                                    resume={resume}
                                    setNewResumeMode={setNewResumeMode}
                                    updateResumeLoading={updateResumeLoading}
                                />
                            </>
                        )
                    )}
                    {resume && (
                        //delete resume button
                        <DeleteResume
                            resume={resume}
                            setResume={setResume}
                            setNewResumeMode={setNewResumeMode}
                            deleteResume={deleteResume}
                        />
                    )}
                    {!newResumeMode && (
                        <CreateResumeButton
                            resume={resume}
                            setResume={setResume}
                            setNewResumeMode={setNewResumeMode}
                        />
                    )}
                </HStack>

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

// CreateResume icon button that sets newResumeMode to true
// and sets resume to null

function CreateResumeButton({ setNewResumeMode, setResume }) {
    return (
        <Button
            aria-label="Create Resume"
            leftIcon={<AddIcon />}
            onClick={() => {
                setNewResumeMode(true)
                setResume(null)
            }}
        >
            New Resume
        </Button>
    )
}
function DeleteResume({ resume, deleteResume, setResume, setNewResumeMode }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const handleDelete = () => {
        deleteResume(resume._id)
        onClose()
    }
    const cancelRef = React.useRef()

    return (
        <>
            <Button
                size="md"
                variant={'ghost'}
                colorScheme="red"
                onClick={onOpen}
            >
                <Text fontSize={'sm'}>Delete</Text>
            </Button>

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Delete Resume
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure? You can't undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <AlertDialogCloseButton />
                            <Button
                                colorScheme="red"
                                onClick={handleDelete}
                                ml={3}
                            >
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}
