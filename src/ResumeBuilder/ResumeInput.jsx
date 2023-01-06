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
} from '@chakra-ui/react'
import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
import EditExperienceModal from './components/EditExperienceModal'
import AddExperienceModal from './components/AddExperienceModal'
import { DragDropContext, Draggable } from 'react-beautiful-dnd'

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
    //     education: [],
    //     phone: '',
    //     template: 1,
    // }
    const {
        isOpen: workIsOpen,
        onOpen: workOnOpen,
        onClose: workOnClose,
    } = useDisclosure()
    const {
        isOpen: workEditIsOpen,
        onOpen: workEditOnOpen,
        onClose: workEditOnClose,
    } = useDisclosure()

    const {
        isOpen: eduIsOpen,
        onOpen: eduOnOpen,
        onClose: eduOnClose,
    } = useDisclosure()
    const toast = useToast()

    const getExperienceIndex = (experience) => {
        return resume.experience.indexOf(experience)
    }

    const updateExperience = (index, experience) => {
        const newExperience = [...resume.experience]
        newExperience[index] = experience
        setResume({ ...resume, experience: newExperience })
    }

    return (
        <Stack
            direction={'column'}
            alignItems={'flex-start'}
            justifyContent={'start'}
            w="100%"
            spacing={4}
        >
            <FormControl id="name" isRequired>
                <Center>
                    <FormLabel>Resume Identifier</FormLabel>
                </Center>
                <Input
                    id="identifier"
                    placeholder="Product Manager 2021"
                    value={resume.identifier}
                    m={1}
                    onChange={(e) =>
                        setResume({
                            ...resume,
                            identifier: e.target.value,
                        })
                    }
                />
            </FormControl>
            <Heading size="md" mb={2}>
                Perosnal Details
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="100%">
                <FormControl>
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <Input
                        id="name"
                        placeholder="John Smith"
                        value={name}
                        onChange={(e) =>
                            setResume({ ...resume, name: e.target.value })
                        }
                    />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={email}
                        onChange={(e) =>
                            setResume({ ...resume, email: e.target.value })
                        }
                    />
                </FormControl>

                <FormControl>
                    <FormLabel htmlFor="phone">Phone</FormLabel>
                    <Input
                        id="phone"
                        type="tel"
                        placeholder="555-555-5555"
                        value={phone}
                        onChange={(e) =>
                            setResume({ ...resume, phone: e.target.value })
                        }
                    />
                </FormControl>
            </SimpleGrid>
            <Heading size="md">Professional Details</Heading>
            <FormControl>
                <FormLabel htmlFor="summary">Summary</FormLabel>
                <Textarea
                    id="summary"
                    placeholder="A brief summary of your background and skills."
                    value={summary}
                    onChange={(e) =>
                        setResume({ ...resume, summary: e.target.value })
                    }
                />
            </FormControl>
            <FormControl>
                <FormLabel htmlFor="experience" mt={2}>
                    Work and Related Experience
                </FormLabel>
                {/* add work experience modal */}
                {/* make this area drag and droppabel */}

                {experience &&
                    experience.length > 0 &&
                    experience.map((exp, index) => {
                        return (
                            <>
                                <Box
                                    key={index}
                                    borderWidth="1px"
                                    p={4}
                                    roundedTop={index === 0 ? 'md' : 'none'}
                                    roundedBottom={
                                        experience &&
                                        index === experience.length - 1
                                            ? 'none'
                                            : 'md'
                                    }
                                    onClick={() => {
                                        console.log('clicked')
                                    }}
                                >
                                    <Stack direction="row">
                                        <Box>
                                            <Heading size="sm">
                                                {exp.company}
                                            </Heading>
                                            <Heading size="xs">
                                                {exp.position}
                                            </Heading>
                                        </Box>
                                        <Box>
                                            <Badge>{exp.startDate}</Badge>-
                                            <Badge>{exp.endDate}</Badge>
                                        </Box>
                                        {/* edit and delete buttons */}
                                        <Spacer />
                                        <IconButton
                                            aria-label="Edit"
                                            icon={<EditIcon />}
                                            onClick={() => {
                                                workEditOnOpen()
                                            }}
                                            colorScheme="orange"
                                        />
                                        <IconButton
                                            aria-label="Delete"
                                            icon={<DeleteIcon />}
                                            colorScheme="red"
                                            onClick={() => {
                                                const newExperience = [
                                                    ...resume.experience,
                                                ]
                                                newExperience.splice(index, 1)
                                                setResume({
                                                    ...resume,
                                                    experience: newExperience,
                                                })
                                            }}
                                        />
                                    </Stack>
                                    <Box>
                                        <p>{exp.description}</p>
                                    </Box>
                                </Box>
                                {/* experience: any; udateExperienceByIndex: any;
                                getExperienceIndex: any; workEditIsOpen: any;
                                workEditOnClose: any; */}
                                <EditExperienceModal
                                    experience={exp}
                                    index={index}
                                    updateExperience={updateExperience}
                                    workEditIsOpen={workEditIsOpen}
                                    workEditOnClose={workEditOnClose}
                                />
                            </>
                        )
                    })}

                <Button
                    colorScheme="teal"
                    variant={useColorModeValue('solid', 'outline')}
                    onClick={workOnOpen}
                    w="100%"
                    roundedTop={
                        experience && experience.length > 0 ? 'none' : 'md'
                    }
                >
                    <AddIcon mr={1} />
                    Add Work Experience
                </Button>
                <AddExperienceModal
                    workIsOpen={workIsOpen}
                    workOnClose={workOnClose}
                    resume={resume}
                    setResume={setResume}
                />
            </FormControl>
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
                                <Flex justifyContent="space-between">
                                    <Box>
                                        <Heading size="sm">
                                            {edu.school}
                                        </Heading>
                                        <Heading size="xs">
                                            {edu.degree}
                                        </Heading>
                                    </Box>
                                    <Box>
                                        <Badge>{edu.startDate}</Badge>-
                                        <Badge>{edu.endDate}</Badge>
                                    </Box>
                                </Flex>
                                <Box>
                                    <p>{edu.description}</p>
                                </Box>
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
            <FormLabel htmlFor="activities">
                Activities and Hobbies:{' '}
                {activities &&
                    activities.map((activity, i) => (
                        <>
                            <Badge
                                key={i}
                                colorScheme="teal"
                                size="sm"
                                m={1}
                                _hover={{ cursor: 'pointer', color: 'tomato' }}
                                // onClick={() => setActivities(activities.filter((_, j) => j !== i))}
                                onClick={() =>
                                    setResume({
                                        ...resume,
                                        activities: activities.filter(
                                            (_, j) => j !== i
                                        ),
                                    })
                                }
                            >
                                {activity}
                            </Badge>{' '}
                        </>
                    ))}
            </FormLabel>
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
        </Stack>
    )
}
