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
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'

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
    //     experience: [],
    //     education: [],
    //     phone: '',
    //     template: 1,
    // }
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()
    return (
        <Flex
            borderWidth="0px"
            p={2}
            id="resume-input"
            w="100%"
            m={1}
            borderRadius="lg"
            flexDir={'column'}
        >
            <Heading size="md" mb={2}>
                Perosnal Details
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
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
            <Heading size="md" mb={2}>
                Professional Summary
            </Heading>
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
                <FormLabel htmlFor="experience">
                    Work and Related Experience
                </FormLabel>
                {/* add work experience modal */}
                {experience &&
                    experience.map((exp, index) => {
                        return (
                            <Box
                                key={index}
                                borderWidth="1px"
                                p={4}
                                m={1}
                                borderRadius="lg"
                            >
                                <Flex justifyContent="space-between">
                                    <Box>
                                        <Heading size="sm">
                                            {exp.company}
                                        </Heading>
                                        <Heading size="xs">
                                            {exp.position}
                                        </Heading>
                                    </Box>
                                    <Box>
                                        <Badge>{exp.startDate}</Badge>
                                        <Badge>{exp.endDate}</Badge>
                                    </Box>
                                </Flex>
                                <Box>
                                    <p>{exp.description}</p>
                                </Box>
                            </Box>
                        )
                    })}

                <Button
                    colorScheme="teal"
                    variant="outline"
                    onClick={onOpen}
                    m={0.5}
                    w="100%"
                >
                    <AddIcon mr={1} />
                    Add Work Experience
                </Button>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Add Work Experience</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <FormControl>
                                <FormLabel htmlFor="company">Company</FormLabel>
                                <Input id="company" placeholder="Google" />
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor="position">
                                    Position
                                </FormLabel>
                                <Input
                                    id="position"
                                    placeholder="Software Engineer"
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
                                        experience: [
                                            ...(experience ? experience : []),
                                            {
                                                company:
                                                    document.getElementById(
                                                        'company'
                                                    )?.value,
                                                position:
                                                    document.getElementById(
                                                        'position'
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
                                    onClose()
                                }}
                            >
                                Save
                            </Button>
                            <Button variant="ghost" onClick={onClose}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

                {/* work experience list  */}
                {/* edit work experience modal */}
            </FormControl>
            //
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
                                m={1}
                                borderRadius="lg"
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
                                        <Badge>{edu.startDate}</Badge>
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
                    variant="outline"
                    onClick={onOpen}
                    m={0.5}
                    w="100%"
                >
                    <AddIcon mr={1} />
                    Add Education
                </Button>
                <Modal isOpen={isOpen} onClose={onClose}>
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
                                    onClose()
                                }}
                            >
                                Save
                            </Button>
                            <Button variant="ghost" onClick={onClose}>
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
            <FormControl>
                <FormLabel htmlFor="education">Education</FormLabel>
                {/* same as work */}

                <Input
                    id="education"
                    placeholder="School, Degree, Field"
                    // value={education.map(e => `${e.school}, ${e.degree}, ${e.field}`).join('; ')}
                    onChange={(e) =>
                        setResume({
                            ...resume,
                            education: e.target.value.split('; '),
                        })
                    }
                />
            </FormControl>
        </Flex>
    )
}
