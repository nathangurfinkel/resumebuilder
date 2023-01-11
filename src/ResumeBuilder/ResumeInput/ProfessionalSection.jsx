import {
    Badge,
    Box,
    Button,
    FormControl,
    FormLabel,
    Heading,
    IconButton,
    Spacer,
    Stack,
    Textarea,
    useColorModeValue,
    useDisclosure,
} from '@chakra-ui/react'
import React from 'react'
import AddExperienceModal from './AddExperienceModal'
import EditExperienceModal from './EditExperienceModal'
import { AddIcon } from '@chakra-ui/icons'
import { EditIcon } from '@chakra-ui/icons'
import { DeleteIcon } from '@chakra-ui/icons'

const ProfessionalSection = ({ resume, setResume }) => {
    const updateExperience = (index, experience) => {
        const newExperience = [...resume.experience]
        newExperience[index] = experience
        setResume({ ...resume, experience: newExperience })
    }
    const { summary, experience } = resume
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

    return (
        <>
            <Heading size="md" mb={2}>
                Professional Details
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
        </>
    )
}

export default ProfessionalSection
