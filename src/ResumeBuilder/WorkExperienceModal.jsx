import React, { useState } from 'react'
import {
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from '@chakra-ui/react'
{
    /* <WorkExperienceModal onSubmit={(company, title, description, startDate, endDate) => {
    setResume({
        ...resume,
        experience: [...experience, {
            company,
            title,
            description,
            startDate,
            endDate,
        }]
    });
    toast({
        title: 'Experience added.',
        status: 'success',
        duration: 3000,
        isClosable: true,
    });
}} /> */
}

export const WorkExperienceModal = ({ onSubmit }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [company, setCompany] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    return (
        <>
            <Button colorScheme="teal" onClick={onOpen}>
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
                            <Input
                                id="company"
                                placeholder="Company"
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="title">Title</FormLabel>
                            <Input
                                id="title"
                                placeholder="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="description">
                                Description
                            </FormLabel>
                            <Textarea
                                id="description"
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="startDate">
                                Start Date
                            </FormLabel>
                            <Input
                                id="startDate"
                                placeholder="Start Date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="endDate">End Date</FormLabel>
                            <Input
                                id="endDate"
                                placeholder="End Date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme="blue"
                            mr={3}
                            onClick={() => {
                                onSubmit(
                                    company,
                                    title,
                                    description,
                                    startDate,
                                    endDate
                                )
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
        </>
    )
}
