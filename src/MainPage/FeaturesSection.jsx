import { Heading, SimpleGrid } from '@chakra-ui/react'
import FeatureCard from './FeatureCard'

const features = [
    {
        icon: 'edit',
        heading: 'Cover letters',
        description:
            'Create professional cover letters with our pre-written templates and custom editor',
    },
    {
        icon: 'view-list',
        heading: 'Automatic summary generator',
        description:
            'Generate a summary for your resume with the click of a button',
    },
    {
        icon: 'build',
        heading: 'Easy online resume builder',
        description:
            'Easily build your resume with our user-friendly interface and pre-written content',
    },
    {
        icon: 'document',
        heading: 'Multi-format resume options',
        description:
            'Download your resume in various formats, including PDF, Word, and more',
    },
    {
        icon: 'check-circle',
        heading: 'Automatic spell-checker',
        description:
            'Never worry about spelling errors with our built-in spell checker',
    },
]
const FeaturesSection = () => {
    return (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
            {features.map((feature, index) => (
                <FeatureCard
                    key={index}
                    icon={feature.icon}
                    heading={feature.heading}
                    description={feature.description}
                />
            ))}
        </SimpleGrid>
    )
}

export default FeaturesSection
