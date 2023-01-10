import {
    Heading,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Icon,
} from '@chakra-ui/react'

function FeatureCard({ icon, heading, description }) {
    return (
        <Card>
            <CardHeader>
                <Icon>{icon}</Icon>

                <Heading as="h3" size="md" textAlign="center" mt={3}>
                    {heading}
                </Heading>
            </CardHeader>
            <CardBody mt={3}>{description}</CardBody>
        </Card>
    )
}

export default FeatureCard
