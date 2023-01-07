import React from 'react'
import {
    Box,
    Flex,
    Heading,
    Text,
    List,
    ListItem,
    Icon,
    Grid,
    Avatar,
    Link,
    Divider,
    Button,
    VStack,
    IconButton,
} from '@chakra-ui/react'

const Template1 = ({
    name,
    email,
    summary,
    skills,
    hobbies,
    languages,
    experience,
    education,
}) => (
    <Box p={4}>
        <Grid templateColumns="25% 75%">
            <VStack>
                <Heading fontSize="3xl">{name}</Heading>
                <Divider />
                <Flex align="center">
                    <Link href="whatsapp://send?phone=+1234567890">
                        <IconButton
                            icon="chat"
                            aria-label="WhatsApp"
                            variant="outline"
                            color={'green.500'}
                            size="lg"
                        />
                    </Link>
                    <Link href="https://github.com/username">
                        <IconButton
                            icon="github"
                            aria-label="GitHub"
                            variant="outline"
                            variantColor="black"
                            size="lg"
                        />
                    </Link>
                    <Link href="https://linkedin.com/in/username">
                        <IconButton
                            icon="linkedin"
                            aria-label="LinkedIn"
                            variant="outline"
                            variantColor="blue"
                            size="lg"
                        />
                    </Link>
                </Flex>
                <Text fontSize="lg" mt={4}>
                    <Link href="https://example.com">example.com</Link>
                </Text>
                <Heading fontSize="2xl" mt={8} mb={4}>
                    Skills
                </Heading>
                <List>
                    {skills &&
                        skills.map((skill) => (
                            <ListItem>
                                <Icon name="check" mr={2} />
                                {skill}
                            </ListItem>
                        ))}
                </List>
                <Heading fontSize="2xl" mt={8} mb={4}>
                    Hobbies
                </Heading>
                <List>
                    {hobbies &&
                        hobbies.map((hobby) => (
                            <ListItem>
                                <Icon name="check" mr={2} />
                                {hobby}
                            </ListItem>
                        ))}
                </List>
                <Heading fontSize="2xl" mt={8} mb={4}>
                    Languages
                </Heading>
                <List>
                    {languages &&
                        languages.map((language) => (
                            <ListItem>
                                <Icon name="check" mr={2} />
                                {language}
                            </ListItem>
                        ))}
                </List>
            </VStack>
            <VStack>
                <Heading fontSize="2xl" mb={4}>
                    Summary
                </Heading>
                <Text fontSize="lg">{summary}</Text>
                <Heading fontSize="2xl" mt={8} mb={4}>
                    Employment History
                </Heading>
                {experience &&
                    experience.map((exp) => (
                        <Box mb={4}>
                            {' '}
                            <Box mb={2}>
                                <Heading as="h3" size="lg">
                                    {exp.company}
                                </Heading>
                                <Text fontSize="lg">{exp.position}</Text>
                                <Text fontSize="sm">
                                    {exp.startDate} - {exp.endDate}
                                </Text>
                            </Box>
                            <Text fontSize="lg">{exp.description}</Text>
                        </Box>
                    ))}
                <Heading fontSize="2xl" mt={8} mb={4}>
                    Education
                </Heading>
                {education &&
                    education.map((edu) => (
                        <Box mb={4}>
                            <Box mb={2}>
                                <Heading as="h3" size="lg">
                                    {edu.school}
                                </Heading>
                                <Text fontSize="lg">{edu.degree}</Text>
                                <Text fontSize="sm">
                                    {edu.startDate} - {edu.endDate}
                                </Text>
                            </Box>
                            <Text fontSize="lg">{edu.description}</Text>
                        </Box>
                    ))}
            </VStack>
        </Grid>
    </Box>
)

export default Template1
