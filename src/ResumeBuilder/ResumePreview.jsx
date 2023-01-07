import {
    Box,
    Heading,
    Stack,
    Flex,
    List,
    ListItem,
    Text,
    Link,
    AspectRatio,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
} from '@chakra-ui/react'
import Template1 from './Templates/Template1'
import { useState } from 'react'
const ResumePreview = ({
    resume: {
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
    },
}) => {
    const [zoom, setZoom] = useState(100)

    return (
        // a4 aspect ratio
        <Flex borderWidth="1px" p={4} borderRadius="lg" flexDir={'column'}>
            <Heading size={'md'} mb={2}>
                Preview
            </Heading>
            <Box
                maxW="80%"
                maxH="100%"
                ratio={210 / 297}
                __css={{
                    zoom: zoom / 100,
                    transform: `scale(${zoom / 100})` /* Safari */,
                    transformOrigin: 'top left',
                }}
                id="resume-preview"
            >
                <Template1
                    //         name: any;
                    // email: any;
                    // summary: any;
                    // skills: any;
                    // activities: any;
                    // awards: any;
                    // experience: any;
                    // education: any;
                    // phone: any;

                    name={name}
                    email={email}
                    summary={summary}
                    skills={skills}
                    activities={activities}
                    awards={awards}
                    experience={experience}
                    education={education}
                    phone={phone}
                />
            </Box>
        </Flex>
    )
}

export default ResumePreview
