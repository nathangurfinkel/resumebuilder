import React from 'react'
import { Heading, Select, Button, Stack, Spacer } from '@chakra-ui/react'
import jsPDF from 'jspdf'

export function ExtractAsPDF() {
    const exportAsPDF = () => {
        const doc = new jsPDF('portrait', 'pt', 'a4')
        doc.html(document.getElementById('resume-preview'), {
            callback: (doc) => {
                doc.save('resume.pdf')
            },
        })
    }
    return (
        <Stack
            spacing={4}
            p={4}
            borderRadius="lg"
            boxShadow="lg"
            bg="white"
            direction={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
            width={'98%'}
        >
            <Heading fontSize={'md'} mb={8}>
                Resume Builder
            </Heading>
            <Spacer flex={1} />
            <Select placeholder="Select template" w="200px">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
            </Select>
            <Button onClick={exportAsPDF}>Export as PDF</Button>
        </Stack>
    )
}
