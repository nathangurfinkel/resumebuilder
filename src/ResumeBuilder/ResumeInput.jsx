import React from 'react'
import {
    Box,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Button,
    Flex,
    useDisclosure,
    Badge,
    IconButton,
    useToast,
    InputGroup,
    InputRightElement,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    SimpleGrid,
    Center,
    Stack,
    useColorMode,
    useColorModeValue,
    Spacer,
    StackDivider,
    VStack,
    HStack,
} from '@chakra-ui/react'
import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
import EditExperienceModal from './ResumeInput/EditExperienceModal'
import AddExperienceModal from './ResumeInput/AddExperienceModal'
import { DragDropContext, Draggable } from 'react-beautiful-dnd'
import PersonalSection from './ResumeInput/PersonalSection'
import ProfessionalSection from './ResumeInput/ProfessionalSection'

export const ResumeInput = ({ resume, setResume }) => {
    const {
        name,
        email,
        summary,
        skills,
        activities,
        awards,
        experience,
        education,
        phone,
        templateId,
    } = resume
    // {
    // identifier: '',
    //     name: '',
    //     email: '',
    //     summary: '',
    //     skills: [],
    //     activities: [],
    //     awards: [],
    //     experience: [{ company: '', position: '', startDate: '', endDate: '', description: '' }],
    //     education: [{ school: '', degree: '', startDate: '', endDate: '', description: '' }
    //     phone: '',
    //     template: 1,
    // }

    const {
        isOpen: eduIsOpen,
        onOpen: eduOnOpen,
        onClose: eduOnClose,
    } = useDisclosure()
    const toast = useToast()

    const getExperienceIndex = (experience) => {
        return resume.experience.indexOf(experience)
    }

    return (
        <VStack
            alignItems={'flex-start'}
            justifyContent={'start'}
            w="100%"
            // minW={'100%'}
            spacing={4}
            divider={
                <Center w="30%" h="100%">
                    <StackDivider borderColor="gray.200" />
                </Center>
            }
        >
            <FormControl id="name" isRequired>
                <Center>
                    <FormLabel>Resume Identifier</FormLabel>
                </Center>
                <Input
                    id="identifier"
                    placeholder="Product Manager 2021"
                    value={resume.identifier}
                    onChange={(e) =>
                        setResume({
                            ...resume,
                            identifier: e.target.value,
                        })
                    }
                    variant="filled"
                />
            </FormControl>

            <PersonalSection resume={resume} setResume={setResume} />
            <ProfessionalSection resume={resume} setResume={setResume} />
            {/* same for education */}
            <FormControl>
                <FormLabel htmlFor="education">Education</FormLabel>
                {education &&
                    education.map((edu, index) => {
                        return (
                            <Box
                                key={index}
                                borderWidth="1px"
                                p={4}
                                roundedTop={index === 0 ? 'md' : 'none'}
                                roundedBottom={
                                    education && index === education.length - 1
                                        ? 'none'
                                        : 'md'
                                }
                            >
                                <HStack>
                                    <Box>
                                        <Heading size="sm">
                                            {edu.school}
                                        </Heading>
                                        <Heading size="xs">
                                            {edu.degree}
                                        </Heading>
                                        <Badge>{edu.startDate}</Badge>-
                                        <Badge>{edu.endDate}</Badge>
                                        <p>{edu.description}</p>
                                        <IconButton
                                            aria-label="Edit"
                                            icon={<EditIcon />}
                                            onClick={() => {
                                                eduEditOnOpen()
                                            }}
                                            colorScheme="orange"
                                        />
                                        <IconButton
                                            aria-label="Delete"
                                            icon={<DeleteIcon />}
                                            colorScheme="red"
                                            onClick={() => {
                                                const newEducation = [
                                                    ...resume.education,
                                                ]
                                                newEducation.splice(index, 1)
                                                setResume({
                                                    ...resume,
                                                    education: newEducation,
                                                })
                                            }}
                                        />
                                        {/* <EditEducationModal
                                            education={edu}
                                            index={index}
                                            updateEducation={updateEducation}
                                            eduEditIsOpen={eduEditIsOpen}
                                            eduEditOnClose={eduEditOnClose}
                                        /> */}
                                    </Box>
                                </HStack>
                            </Box>
                        )
                    })}

                <Button
                    colorScheme="teal"
                    variant={useColorModeValue('solid', 'outline')}
                    onClick={eduOnOpen}
                    w="100%"
                    leftIcon={<AddIcon />}
                    roundedTop={
                        education && education.length > 0 ? 'none' : 'md'
                    }
                >
                    Add Education
                </Button>
                <Modal isOpen={eduIsOpen} onClose={eduOnClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Add Education</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <FormControl>
                                <FormLabel htmlFor="school">School</FormLabel>
                                <Input
                                    id="school"
                                    placeholder="University of California, Berkeley"
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor="degree">Degree</FormLabel>
                                <Input
                                    id="degree"
                                    placeholder="B.S. Computer Science"
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor="startDate">
                                    Start Date
                                </FormLabel>
                                <Input id="startDate" type="date" />
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor="endDate">
                                    End Date
                                </FormLabel>
                                <Input id="endDate" type="date" />
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor="description">
                                    Description
                                </FormLabel>
                                <Textarea
                                    id="description"
                                    placeholder="A brief summary of your background and skills."
                                />
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button
                                colorScheme="blue"
                                mr={3}
                                onClick={() => {
                                    setResume({
                                        ...resume,
                                        education: [
                                            ...(education ? education : []),
                                            {
                                                school: document.getElementById(
                                                    'school'
                                                )?.value,
                                                degree: document.getElementById(
                                                    'degree'
                                                )?.value,
                                                startDate:
                                                    document.getElementById(
                                                        'startDate'
                                                    )?.value,
                                                endDate:
                                                    document.getElementById(
                                                        'endDate'
                                                    )?.value,
                                                description:
                                                    document.getElementById(
                                                        'description'
                                                    )?.value,
                                            },
                                        ],
                                    })
                                    eduOnClose()
                                }}
                            >
                                Save
                            </Button>
                            <Button variant="ghost" onClick={eduOnClose}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </FormControl>
            {/* same for skills */}

            {/* array of badges of existing activities  and then an input to add new activities */}
            <InputGroup>
                <Input
                    id="activitiesInput"
                    placeholder="Hiking, Reading, Cooking"
                    onKeyDownCapture={(e) => {
                        if (e.key === 'Enter') {
                            const newActivity =
                                document.getElementById(
                                    'activitiesInput'
                                )?.value

                            if (newActivity === '') {
                                toast({
                                    title: 'Activity cannot be empty.',
                                    status: 'error',
                                    duration: 3000,
                                    isClosable: true,
                                })

                                return
                            }
                            // add new activity to activities array of resume object
                            setResume({
                                ...resume,
                                activities: resume.activities
                                    ? [...resume.activities, newActivity]
                                    : [newActivity],
                            })
                            document.getElementById('activitiesInput').value =
                                ''
                        }
                    }}
                />
                <InputRightElement width="4.5rem">
                    <IconButton
                        m={2}
                        size="sm"
                        aria-label="Add activity"
                        icon={<AddIcon />}
                        onClick={() => {
                            const newActivity =
                                document.getElementById(
                                    'activitiesInput'
                                )?.value
                            console.log(resume)

                            if (newActivity === '') {
                                toast({
                                    title: 'Activity cannot be empty.',
                                    status: 'error',
                                    duration: 3000,
                                    isClosable: true,
                                })

                                return
                            }
                            // add new activity to activities array of resume object
                            setResume({
                                ...resume,
                                activities: resume.activities
                                    ? [...resume.activities, newActivity]
                                    : [newActivity],
                            })
                            console.log(newActivity)
                            //clear input
                            document.getElementById('activitiesInput').value =
                                ''
                            console.log(resume)
                        }}
                    />
                </InputRightElement>
            </InputGroup>
            {/* same for skills */}
            <FormLabel htmlFor="skills">
                Skills:{' '}
                {skills &&
                    skills.map((skill, i) => (
                        <>
                            <Badge
                                key={i}
                                colorScheme="teal"
                                size="sm"
                                m={1}
                                _hover={{ cursor: 'pointer', color: 'tomato' }}
                                onClick={() =>
                                    setResume({
                                        ...resume,
                                        skills: skills.filter(
                                            (_, j) => j !== i
                                        ),
                                    })
                                }
                            >
                                {skill}
                            </Badge>{' '}
                        </>
                    ))}
            </FormLabel>
            <InputGroup>
                <Input id="skillsInput" placeholder="HTML, CSS, JavaScript" />
                <InputRightElement width="4.5rem">
                    <IconButton
                        m={2}
                        size="sm"
                        aria-label="Add skill"
                        icon={<AddIcon />}
                        onClick={() => {
                            const newSkill =
                                document.getElementById('skillsInput')?.value

                            if (newSkill === '') {
                                toast({
                                    title: 'Skill cannot be empty.',
                                    status: 'error',
                                    duration: 3000,
                                    isClosable: true,
                                })

                                return
                            }
                            // add new skill to skills array of resume object
                            setResume({
                                ...resume,
                                skills: resume.skills
                                    ? [...resume.skills, newSkill]
                                    : [newSkill],
                            })
                            console.log(newSkill)
                            //clear input
                            document.getElementById('skillsInput').value = ''
                            console.log(resume)
                        }}
                    />
                </InputRightElement>
            </InputGroup>
            <FormControl>
                <FormLabel htmlFor="awards">Awards and Honors</FormLabel>
                {/* map awards in state if exists */}
                {awards &&
                    awards.map((award, i) => (
                        <Badge
                            key={i}
                            colorScheme="teal"
                            size="sm"
                            mx={1}
                            _hover={{ cursor: 'pointer', color: 'tomato' }}
                            onClick={() =>
                                setResume({
                                    ...resume,
                                    awards: awards.filter((_, j) => j !== i),
                                })
                            }
                        >
                            {award}
                        </Badge>
                    ))}
                <Input
                    id="awards"
                    placeholder="Award or Honor"
                    onKeyDownCapture={(e) => {
                        if (e.key === 'Enter') {
                            const newAward =
                                document.getElementById('awards')?.value
                            console.log(resume)

                            if (newAward === '') {
                                toast({
                                    title: 'Award cannot be empty.',
                                    status: 'error',
                                    duration: 3000,
                                    isClosable: true,
                                })

                                return
                            }
                            // add new award to awards array of resume object
                            setResume({
                                ...resume,
                                awards: resume.awards
                                    ? [...resume.awards, newAward]
                                    : [newAward],
                            })
                            document.getElementById('awards').value = ''
                        }
                    }}
                />
            </FormControl>
        </VStack>
    )
}
