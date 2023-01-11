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
    HStack,
} from '@chakra-ui/react'
import parse from 'html-react-parser'
import { BsWhatsapp, BsGithub, BsLinkedin } from 'react-icons/bs'
import ReactQuill from 'react-quill'
// import chakraUiRichTextParser from '../../helpers/chakraUiRichTextParser'

const Template1 = ({
    name,
    email,
    summary,
    skills,
    activities,
    languages,
    experience,
    education,
    colorScheme,
    phone,
}) => (
    <Box
        // p={4}
        __css={{
            width: '8.27in' /* 210mm */,
            height: '11.69in' /* 297mm */,
            margin: '0 auto',
            background: 'white',
        }}
    >
        <Grid templateColumns="25% 75%">
            <VStack align="start" bg={colorScheme + '.600'} p={4} h="11.69in">
                <Heading fontSize="3xl" color="white">
                    {name}
                </Heading>
                {/* email */}
                <Text fontSize="sm" color="white">
                    <Link href={`mailto:${email}`}>{email}</Link>
                </Text>
                {/* phone */}
                <Text fontSize="sm" color="white">
                    <Link href={`tel:${phone}`}>{phone}</Link>
                </Text>

                <Divider w={'30%'} />
                <HStack spacing={4} align="center" mt={4}>
                    <Link href="whatsapp://send?phone=+1234567890">
                        <IconButton
                            icon={<BsWhatsapp />}
                            aria-label="WhatsApp"
                            variant="solid"
                            color={'green.500'}
                            size="md"
                            bg={'green.100'}
                        />
                    </Link>
                    <Link href="https://github.com/username">
                        <IconButton
                            icon={<BsGithub />}
                            aria-label="GitHub"
                            variant="solid"
                            color={'black'}
                            size="md"
                            bg={'gray.100'}
                        />
                    </Link>
                    <Link href="https://linkedin.com/in/username">
                        <IconButton
                            icon={<BsLinkedin />}
                            aria-label="LinkedIn"
                            variant="solid"
                            color={'blue.500'}
                            size="md"
                            bg={'blue.100'}
                        />
                    </Link>
                </HStack>
                <Text fontSize="lg" mt={4} color="white">
                    <Link href="https://example.com">example.com</Link>
                </Text>
                <Heading fontSize="2xl" mt={8} mb={4} color="white">
                    Skills
                </Heading>
                <List>
                    {skills &&
                        skills.map((skill) => (
                            <ListItem color="white">
                                <Icon name="check" mr={2} />
                                {skill}
                            </ListItem>
                        ))}
                </List>
                <Heading fontSize="2xl" mt={8} mb={4} color="white">
                    Hobbies
                </Heading>
                <List>
                    {activities &&
                        activities.map((activity) => (
                            <ListItem color="white">
                                <Icon name="check" mr={2} />
                                {activity}
                            </ListItem>
                        ))}
                </List>
                <Heading fontSize="2xl" mt={8} mb={4} color="white">
                    Languages
                </Heading>
                <List>
                    {languages &&
                        languages.map((language) => (
                            <ListItem color="white">
                                <Icon name="check" mr={2} />
                                {language}
                            </ListItem>
                        ))}
                </List>
            </VStack>
            <VStack align="start" p={4} style={{ color: 'black' }}>
                <Heading fontSize="2xl" mb={4}>
                    Summary
                </Heading>
                <Text fontSize="lg">{summary}</Text>
                <Heading fontSize="2xl" mt={8} mb={4}>
                    Employment History
                </Heading>
                {experience &&
                    experience.map((exp) => (
                        <Box m={4} p={4}>
                            {' '}
                            <Box mb={2}>
                                <Heading as="h3" size="lg">
                                    {exp.company}
                                </Heading>
                                <Text fontSize="lg">{exp.position}</Text>
                                <Text fontSize="sm">
                                    {exp.startDate} - {exp.endDate}
                                </Text>
                                <ReactQuill
                                    value={exp.description}
                                    readOnly
                                    theme={'bubble'}
                                />
                            </Box>
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
