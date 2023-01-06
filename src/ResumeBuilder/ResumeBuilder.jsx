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
import ToolBar from './components/ToolBar'
import NewResume from './components/NewResume'
const ResumeBuilder = () => {
    const [fileUploadOpen, setFileUploadOpen] = useState(false)
    const { isLoggedIn, handleLogin, token, userId, expiresAt } =
        useContext(AuthContext)

    const [loginOpen, setLoginOpen] = useState(false)
    const [newResumeMode, setNewResumeMode] = useState(false)
    const [localMode, setLocalMode] = useState(false)
    const toast = useToast()
    const navigate = useNavigate()
    const [resume, setResume] = useState(null)
    const {
        data: resumeList,
        loading: resumeListLoading,
        error: resumeListError,
        run: resumeListRun,
    } = useRequest(getResumeList, {
        manual: true,
        onSuccess: (result, params) => {
            toast({
                title: 'Resume list loaded',
                description: 'Your resume list has been loaded',
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
        },
        onError: (error, params) => {
            toast({
                title: 'Resume list not loaded',
                description: 'Your resume list has not been loaded',
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        },
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
        },
        onError: (error, params) => {
            toast({
                title: 'Resume not created',
                description: 'Your resume has not been created',
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        },
    })

    const {
        data: updateResume,
        loading: updateResumeLoading,
        error: updateResumeError,
        run: updateResumeRun,
    } = useRequest(updateResumeById, {
        manual: true,
        throttleWait: 3000,
    })

    React.useEffect(() => {
        if (!localMode && isLoggedIn) {
            resumeListRun()
        }
    }, [localMode, isLoggedIn])

    const onUpdate = () => {
        updateResumeRun(resume)
    }

    const onCreateNewResume = (identifier, isLocal) => {
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
        })
        if (!isLocal) {
            newResumeRun(resume)
        }
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

    useEffect(() => {
        onUpdate()
    }, [resume])

    const cardWidth = useBreakpointValue({ base: '100%', md: '50%' })

    return (
        <Stack
            direction={'column'}
            alignContent={'center'}
            alignItems={'center'}
            justifyContent={'start'}
            h={'100vh'}
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
                />
            )}
            {/* new resume box */}
            {!resume && isLoggedIn && (
                <NewResume onCreateNewResume={onCreateNewResume} />
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
                <Box
                    p={4}
                    borderRadius="lg"
                    border={'1px'}
                    borderColor={'gray.200'}
                >
                   

                    <ResumeInput resume={resume} setResume={setResume} />
                </Box>
            )}
            {/* end resume editor */}
        </Stack>
    )
}

export default ResumeBuilder
