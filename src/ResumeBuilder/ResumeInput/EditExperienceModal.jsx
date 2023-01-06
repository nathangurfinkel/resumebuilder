import React, { useEffect } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
    FormControl,
    FormLabel,
    Input,
    useToast,
    Text,
    Stack,
    Box,
    Textarea,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useDisclosure } from '@chakra-ui/react'

function EditExperienceModal({
    experience,
    index,
    updateExperience,
    workEditIsOpen,
    workEditOnClose,
}) {
    // copy the experience object
    // const [experienceCopy, setExperienceCopy] = useState(experience)
    //     experience: [{ company: '', position: '', startDate: '', endDate: '', description: '' }],

    return (
        <Modal isOpen={workEditIsOpen} onClose={workEditOnClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Edit Work Experience</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl id="companyname" isRequired>
                        <FormLabel>Company Name</FormLabel>
                        <Input
                            placeholder="Google"
                            value={experience.company}
                            m={1}
                            onChange={(e) =>
                                updateExperience(index, {
                                    ...experience,
                                    company: e.target.value,
                                })
                            }
                        />
                    </FormControl>
                    <FormControl id="position" isRequired>
                        <FormLabel>Position</FormLabel>
                        <Input
                            placeholder="Software Engineer"
                            value={experience.position}
                            m={1}
                            onChange={(e) =>
                                updateExperience(index, {
                                    ...experience,
                                    position: e.target.value,
                                })
                            }
                        />
                    </FormControl>

                    <FormControl id="endDate" isRequired>
                        <FormLabel>Start Date</FormLabel>
                        <Input
                            type="date"
                            value={experience.startDate}
                            m={1}
                            onChange={(e) =>
                                updateExperience(index, {
                                    ...experience,
                                    startDate: e.target.value,
                                })
                            }
                        />
                    </FormControl>
                    <FormControl id="endDate" isRequired>
                        <FormLabel>End Date</FormLabel>
                        <Input
                            type="date"
                            value={experience.endDate}
                            m={1}
                            onChange={(e) =>
                                updateExperience(index, {
                                    ...experience,
                                    endDate: e.target.value,
                                })
                            }
                        />
                    </FormControl>
                    <FormControl id="description" isRequired>
                        <FormLabel>Description</FormLabel>
                        <Textarea
                            placeholder="Worked on the Google Search team"
                            value={experience.description}
                            m={1}
                            onChange={(e) =>
                                updateExperience(index, {
                                    ...experience,
                                    description: e.target.value,
                                })
                            }
                        />
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={workEditOnClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default EditExperienceModal
