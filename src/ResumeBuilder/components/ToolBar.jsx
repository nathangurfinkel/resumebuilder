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
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Icon,
    MenuDivider,
    Badge,
    Heading,
    Alert,
    AlertIcon,
    AlertDescription,
    AlertTitle,
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
import { DeleteIcon } from '@chakra-ui/icons'
import {
    BsFile,
    BsFileEarmark,
    BsFileEarmarkArrowUp,
    BsFilePdfFill,
} from 'react-icons/bs'
import { VscFilePdf, VscJson } from 'react-icons/vsc'
import { AiOutlineFileWord } from 'react-icons/ai'
import jsPDF from 'jspdf'

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
    console.log('newResumeMode', newResumeMode)

    const toast = useToast()
    const uploadText = useBreakpointValue(
        { base: '', md: 'Upload File' },
        { fallback: 'base' }
    )
    const downloadText = useBreakpointValue(
        { base: '', md: 'Download File' },
        { fallback: 'base' }
    )

    const savedText = useBreakpointValue(
        { base: '', md: 'Saved' },
        { fallback: 'base' }
    )
    const [fileUploadOpen, setFileUploadOpen] = React.useState(false)
    const [file, setFile] = useState(null)
    const handleChange = (file) => {
        console.log('file', file)
        setFile(file)
        try {
            // read the file data - its a .json file
            const fileReader = new FileReader()
            fileReader.readAsText(file, 'UTF-8')
            fileReader.onload = (e) => {
                const resumeData = JSON.parse(e.target.result)
                setResume({ ...resume, ...resumeData })
                // setNewResumeMode(false)
                console.log('resumeData', resumeData)
                toast({
                    title: 'Resume ' + resumeData?.identifier + ' uploaded',
                    description: 'Your resume has been uploaded',
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })
                updateResume(resumeData)
            }
        } catch (error) {
            setFile(null)
            toast({
                title: 'Invalid file',
                description: 'The file you selected is not a valid resume file',
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        }
    }
    const exportAsPDF = () => {
        const doc = new jsPDF('portrait', 'pt', 'a4')
        doc.html(document.getElementById('resume-preview'), {
            callback: (doc) => {
                doc.save('resume.pdf')
            },
        })
    }
    // useEffect(() => {
    //     console.log('file', file)

    // }, [file])

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
                handleChange={handleChange}
            />

            <HStack
                divider={
                    <Divider
                        orientation="vertical"
                        color={'gray.300'}
                        h={'100%'}
                    />
                }
                spacing={4}
                p={4}
                mx={2}
                borderRadius="lg"
                boxShadow="md"
                alignItems={'center'}
                justifyContent={'start'}
                minW={'100%'}
                roundedTop={'none'}
                bg={useColorModeValue('teal.50', 'teal.900')}
                minH={'80px'}
                maxW={'100vw'}
            >
                {resumeList && (
                    <ResumeMenu
                        resumeList={resumeList}
                        setResume={setResume}
                        resume={resume}
                        setNewResumeMode={setNewResumeMode}
                        updateResumeLoading={updateResumeLoading}
                    />
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
                    <NewResumeButton
                        resume={resume}
                        setResume={setResume}
                        setNewResumeMode={setNewResumeMode}
                    />
                )}
                {/* draw sync icon inside circular progress and if udpdateResume show check icon */}

                <Button
                    size="sm"
                    variant={'ghost'}
                    colorScheme={'teal'}
                    leftIcon={
                        <CheckCircleIcon color="green.500" fontSize="md" />
                    }
                    iconSpacing={downloadText ? 2 : 0}
                    isLoading={updateResumeLoading}
                >
                    {savedText}
                </Button>

                <Menu>
                    <MenuButton
                        as={Button}
                        size="sm"
                        variant={'solid'}
                        // isDisabled={!resume}
                        colorScheme={'teal'}
                        leftIcon={<BsFileEarmark />}
                        iconSpacing={downloadText ? 2 : 0}
                    >
                        {downloadText}
                    </MenuButton>
                    <MenuList>
                        <MenuDivider />
                        <MenuItem
                            onClick={() => exportAsPDF()}
                            icon={<VscFilePdf />}
                        >
                            Download PDF
                        </MenuItem>
                        <MenuItem
                            onClick={() => handleDownload(resume, 'docx')}
                            icon={<Icon as={AiOutlineFileWord} />}
                        >
                            Download DOCX
                        </MenuItem>
                        <MenuDivider></MenuDivider>
                        <MenuItem
                            onClick={() => setFileUploadOpen(true)}
                            icon={<Icon as={VscJson} />}
                        >
                            Upload JSON
                        </MenuItem>

                        <MenuItem
                            onClick={() => handleDownload(resume, 'json')}
                            icon={<Icon as={VscJson} />}
                        >
                            Download JSON
                        </MenuItem>
                    </MenuList>
                </Menu>
            </HStack>
        </>
    )
}

export default ToolBar

function FileUploadModal({ fileUploadOpen, setFileUploadOpen, handleChange }) {
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
                <Alert
                    status="warning"
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="center"
                    textAlign="start"
                >
                    {' '}
                    <AlertIcon />
                    <AlertTitle mr={2}>
                        This will overwrite current resume!
                    </AlertTitle>
                    <AlertDescription ml={2}>
                        If you want to keep your current resume, please create a
                        new resume first.
                    </AlertDescription>
                </Alert>
                <ModalBody>
                    <FileUploader
                        handleChange={handleChange}
                        name={'resume'}
                        types={['json']}
                    />
                </ModalBody>

                <ModalFooter></ModalFooter>
            </ModalContent>
        </Modal>
    )
}

// CreateResume icon button that sets newResumeMode to true
// and sets resume to null

function NewResumeButton({ setNewResumeMode, setResume }) {
    const text = useBreakpointValue({ base: '', md: 'New Resume' })
    return (
        <Button
            aria-label="Create Resume"
            onClick={() => {
                setNewResumeMode(true)
                setResume(null)
            }}
            leftIcon={<AddIcon />}
            colorScheme={'teal'}
            iconSpacing={useBreakpointValue({ base: 0, md: 2 })}
            variant={'ghost'}
            size={useBreakpointValue({ base: 'sm', md: 'md' })}
        >
            {text}
        </Button>
    )
}
function DeleteResume({ resume, deleteResume, setResume, setNewResumeMode }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const handleDelete = () => {
        deleteResume(resume._id)
        onClose()
    }
    const deleteText = useBreakpointValue({ base: '', md: 'Delete' })
    const cancelRef = React.useRef()

    return (
        <>
            <Button
                size={{ base: 'sm', md: 'md' }}
                variant={'ghost'}
                colorScheme="red"
                onClick={onOpen}
                leftIcon={<DeleteIcon />}
                iconSpacing={{ base: 0, md: 2 }}
            >
                {deleteText}
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
