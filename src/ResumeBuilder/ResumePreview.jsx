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
    // when size of the window changes, the zoom is resized to fit the window

    const [zoom, setZoom] = useState(100)
    const colorSchemes = ['red', 'orange', 'yellow', 'green', 'teal', 'blue', 'cyan', 'purple', 'pink']
    const [colorScheme, setColorScheme] = useState('blue')

    return (
        // a4 aspect ratio
        <Flex borderWidth="1px" p={4} borderRadius="lg" flexDir={'column'}>
            <Heading size={'md'} mb={2}>
                Preview
            </Heading>
            <Slider
                aria-label="slider-ex-1"
                defaultValue={100}
                onChange={(value) => setZoom(value)}
                min={50}
                max={200}
            >
                <SliderTrack>
                    <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
            </Slider>
            <Box
                // maxW="80%"
                // maxH="100%"
                // ratio={210 / 297}
                __css={{
                    zoom: zoom / 100,
                    transform: `scale(${zoom / 100})`,
                    transformOrigin: 'top left',
                }}
                id="resume-preview"
                border={'1px solid black'}
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
                    colorScheme={colorScheme}
                />
            </Box>
        </Flex>
    )
}

export default ResumePreview
