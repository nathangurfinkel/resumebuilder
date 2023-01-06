import React from 'react'
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    useToast,
    ModalFooter,
} from '@chakra-ui/react'

function AddExperienceModal({ workIsOpen, workOnClose, resume, setResume }) {
    const onSubmit = (e) => {
        e.preventDefault()
        const company = e.target.company.value
        const position = e.target.position.value
        const startDate = e.target.startDate.value
        const endDate = e.target.endDate.value
        const description = e.target.description.value
        const newExperience = {
            company,
            position,
            startDate,
            endDate,
            description,
        }
        setResume({
            ...resume,
            experience: [...resume.experience, newExperience],
        })
        workOnClose()
    }

    return (
        <Modal isOpen={workIsOpen} onClose={workOnClose}>
            <ModalOverlay />
            <ModalContent>
                <form onSubmit={onSubmit}>
                    <ModalHeader>Add Work Experience</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel htmlFor="company">Company</FormLabel>
                            <Input id="company" placeholder="Google" />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="position">Position</FormLabel>
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
                            <FormLabel htmlFor="endDate">End Date</FormLabel>
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
                        <Button colorScheme="blue" mr={3} type="submit">
                            Save
                        </Button>
                        <Button variant="ghost" onClick={workOnClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    )
}

export default AddExperienceModal
