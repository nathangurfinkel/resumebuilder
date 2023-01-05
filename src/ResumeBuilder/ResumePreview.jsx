import {
    Box,
    Heading,
    Stack,
    Flex,
    List,
    ListItem,
    Text,
    Link,
} from '@chakra-ui/react'

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
    return (
        // a4 aspect ratio
        <Flex borderWidth="1px" p={4} borderRadius="lg" flexDir={'column'}>
            <Heading size={'md'} mb={2}>
                Preview
            </Heading>

            <Box
                borderWidth="1px"
                p={4}
                id="resume-preview"
                maxW={420}
                maxH={595}
            >
                <Stack spacing={4}>
                    <Stack spacing={4} direction="row">
                        <Heading size={'md'} mb={4}>
                            {name}
                        </Heading>
                        <Link href={`mailto:${email}`} isExternal>
                            <Text fontSize="xs" mb={4}>
                                {email}
                            </Text>
                        </Link>
                    </Stack>

                    <Box mb={4}>{summary}</Box>
                    <Heading as="h3" mb={4}>
                        Skills
                    </Heading>
                    {skills && (
                        <List styleType="disc">
                            {skills.map((skill) => (
                                <ListItem key={skill}>{skill}</ListItem>
                            ))}
                        </List>
                    )}
                    <Heading as="h3" mb={4}>
                        Activities and Hobbies
                    </Heading>
                    {activities && (
                        <List styleType="disc">
                            {activities.map((activity) => (
                                <ListItem key={activity}>{activity}</ListItem>
                            ))}
                        </List>
                    )}
                    <Heading as="h3" mb={4}>
                        Awards and Honors
                    </Heading>
                    {awards && (
                        <List styleType="disc">
                            {awards.map((award) => (
                                <ListItem key={award}>{award}</ListItem>
                            ))}
                        </List>
                    )}
                    <Heading as="h3" mb={4}>
                        Work and Related Experience
                    </Heading>
                    {experience && (
                        <List styleType="disc">
                            {experience.map(
                                ({ company, title, description }) => (
                                    <ListItem key={company}>
                                        <Heading as="h4" mb={2}>
                                            {title} at {company}
                                        </Heading>
                                        <Box>{description}</Box>
                                    </ListItem>
                                )
                            )}
                        </List>
                    )}
                    <Heading as="h3" mb={4}>
                        Education
                    </Heading>
                    {education && (
                        <List styleType="disc">
                            {education.map(({ school, degree, field }) => (
                                <ListItem key={school}>
                                    <Heading as="h4" mb={2}>
                                        {degree} in {field} from {school}
                                    </Heading>
                                </ListItem>
                            ))}
                        </List>
                    )}
                </Stack>
            </Box>

            {templateId === 2 && (
                <Box
                    m={8}
                    borderWidth="1px"
                    p={4}
                    id="resume-preview"
                    maxW={420}
                    maxH={595}
                >
                    <Stack spacing={4}>
                        <Stack spacing={4} direction="row">
                            <Heading size={'md'} mb={4}>
                                {name}
                            </Heading>
                            <Link href={`mailto:${email}`} isExternal>
                                <Text fontSize="xs" mb={4}>
                                    {email}
                                </Text>
                            </Link>
                        </Stack>
                        <Box mb={4}>{summary}</Box>
                        <Heading as="h6" mb={4}>
                            Skills
                        </Heading>
                        <List styleType="disc">
                            {skills.map((skill) => (
                                <ListItem key={skill}>{skill}</ListItem>
                            ))}
                        </List>
                        <Heading as="h3" mb={4}>
                            Activities and Hobbies
                        </Heading>
                        <List styleType="disc">
                            {activities.map((activity) => (
                                <ListItem key={activity}>{activity}</ListItem>
                            ))}
                        </List>
                        <Heading as="h3" mb={4}>
                            Awards and Honors
                        </Heading>
                        <List styleType="disc">
                            {awards.map((award) => (
                                <ListItem key={award}>{award}</ListItem>
                            ))}
                        </List>
                        <Heading as="h3" mb={4}>
                            Work and Related Experience
                        </Heading>
                        {experience &&
                            experience.map(
                                ({ company, position, description }) => (
                                    <Box>
                                        <Heading as="h4" mb={2}>
                                            {position} at {company}
                                        </Heading>
                                        <Box>{description}</Box>
                                    </Box>
                                )
                            )}
                        <Heading as="h3" mb={4}>
                            Education
                        </Heading>
                        <List styleType="disc">
                            {education.map(({ school, degree, field }) => (
                                <ListItem key={school}>
                                    <Heading as="h4" mb={2}>
                                        {degree} in {field} from {school}
                                    </Heading>
                                </ListItem>
                            ))}
                        </List>
                    </Stack>
                </Box>
            )}
        </Flex>
    )
}

export default ResumePreview
