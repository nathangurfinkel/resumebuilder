import React, { useContext, useEffect, useState } from 'react'
import {
    Box,
    Stack,
    useToast,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalOverlay,
    ModalContent,
    useBreakpointValue,
    Flex,
    SimpleGrid,
} from '@chakra-ui/react'

import ResumePreview from './ResumePreview'
import { ResumeInput } from './ResumeInput'
//general layout of resume builder container that holds all two components : ResumeInput and ResumePreview
import { useRequest } from 'ahooks'
import { postNewResume } from '../api'
import { getResumeList } from '../api'
import { updateResumeById } from '../api'
import { useNavigate } from 'react-router-dom'
import LoginForm from '../auth/LoginForm'
import { AuthContext } from '../auth/AuthProvider'
import ToolBar from './Toolbar/ToolBar'
import NewResumeForm from './Toolbar/NewResume'
const ResumeBuilder = () => {
    const [fileUploadOpen, setFileUploadOpen] = useState(false)
    const { isLoggedIn, handleLogin, token, userId, expiresAt } =
        useContext(AuthContext)

    const [loginOpen, setLoginOpen] = useState(false)
    const [newResumeMode, setNewResumeMode] = useState(true)
    const [localMode, setLocalMode] = useState(false)
    const toast = useToast()
    const navigate = useNavigate()
    const [resume, setResume] = useState(null)

    const {
        data: resumeList,
        loading: resumeListLoading,
        error: resumeListError,
        run: resumeListRun,
        refresh: resumeListRefresh,
    } = useRequest(getResumeList, {
        manual: true,
        // onSuccess: (result, params) => {
        //     toast({
        //         title: 'Resume list loaded',
        //         description: 'Your resume list has been loaded',
        //         status: 'success',
        //         duration: 9000,
        //         isClosable: true,
        //     })
        // },
        // onError: (error, params) => {
        //     toast({
        //         title: 'Resume list not loaded',
        //         description: 'Your resume list has not been loaded',
        //         status: 'error',
        //         duration: 9000,
        //         isClosable: true,
        //     })
        // },
    })
    const {
        data: newResume,
        loading: newResumeLoading,
        error: newResumeError,
        run: newResumeRun,
    } = useRequest(postNewResume, {
        manual: true,
        onSuccess: (result, params) => {
            toast({
                title: 'Resume created',
                description: 'Your resume has been created',
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
            resumeListRefresh()
            console.log('newResume', result)
            initializeResume(params[0].identifier, result.data._id || '')
        },
        onError: (error, params) => {
            toast({
                title: 'Resume not created',
                description: 'Your resume has not been created',
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
            resumeListRefresh()
        },
    })
    const {
        data: updateResume,
        loading: updateResumeLoading,
        error: updateResumeError,
        run: updateResumeRun,
    } = useRequest(updateResumeById, {
        // manual: true,
        throttleWait: 5000,
        debounceInterval: 5000,
        throttleTrailing: true,
        ready: resume && resume.identifier,
        refreshDeps: [resume],
        defaultParams: [resume],

        onError: (error, params) => {},
        onSuccess: (result, params) => {
            resumeListRefresh()
        },
    })

    useEffect(() => {
        // removes NewResumeButton
        if (resumeList && resumeList.data.length === 0) {
            setNewResumeMode(true)
        } else {
            setNewResumeMode(false)
        }
    }, [resumeList])

    React.useEffect(() => {
        if (isLoggedIn) {
            resumeListRun()
        }
    }, [isLoggedIn])

    const onUpdate = () => {
        updateResumeRun(resume)
    }

    const initializeResume = (identifier, _id) => {
        setResume({
            identifier: identifier,
            name: '',
            email: '',
            summary: '',
            skills: [],
            activities: [],
            awards: [],
            experience: [],
            education: [],
            phone: '',
            template: 1,
            _id: _id,
        })
    }

    // local storage mode for resume builder

    const onSaveLocal = () => {
        localStorage.setItem('resume', JSON.stringify(resume))
        toast({
            title: 'Resume saved',
            description: 'Your resume has been saved',
            status: 'success',
            duration: 9000,
            isClosable: true,
        })
    }

    const onSaveCloud = () => {
        updateResumeRun(resume)
        toast({
            title: 'Resume saved',
            description: 'Your resume has been saved',
            status: 'success',
            duration: 9000,
            isClosable: true,
        })
    }

    // }

    // useEffect(() => {
    //     if (resume && resume.identifier) {
    //         onUpdate()
    //     }
    // }, [resume])

    const inputWidth = useBreakpointValue({ base: '100%', md: '45%' })

    return (
        <Stack
            direction={'column'}
            alignItems={'center'}
            justifyContent={'start'}
            // bg={'red.500'}
            px={4}
        >
            <Modal isOpen={loginOpen} onClose={() => setLoginOpen(false)}>
                <ModalOverlay />
                <ModalContent maxW={'400px'}>
                    <LoginForm
                        modal={true}
                        onClose={() => setLoginOpen(false)}
                    />
                </ModalContent>
            </Modal>
            {isLoggedIn && (
                <ToolBar
                    updateResumeLoading={updateResumeLoading}
                    localMode={localMode}
                    setLocalMode={setLocalMode}
                    resume={resume}
                    isLoggedIn={isLoggedIn}
                    setLoginOpen={setLoginOpen}
                    resumeListLoading={resumeListLoading}
                    resumeList={resumeList}
                    resumeListError={resumeListError}
                    setResume={setResume}
                    setNewResumeMode={setNewResumeMode}
                    updateResume={updateResume}
                    onUpdate={onUpdate}
                    newResumeMode={newResumeMode}
                    resumeListRefresh={resumeListRefresh}
                />
            )}
            {/* new resume box */}
            {!resume && isLoggedIn && (
                <Box m={4}>
                    <NewResumeForm newResumeRun={newResumeRun} />
                </Box>
            )}

            {!isLoggedIn && (
                <Box m={4}>
                    <LoginForm
                        modal={false}
                        onClose={() => setLoginOpen(false)}
                    ></LoginForm>
                </Box>
            )}

            {/* end new resume box */}

            {/* resume editor */}
            {resume && (
                <SimpleGrid columns={2} spacing={10}>
                    <Box
                        p={4}
                        borderRadius="lg"
                        border={'1px'}
                        borderColor={'gray.200'}
                        // w={inputWidth}
                    >
                        <ResumeInput resume={resume} setResume={setResume} />
                    </Box>

                    <ResumePreview resume={resume} />
                </SimpleGrid>
            )}
        </Stack>
    )
}

export default ResumeBuilder
