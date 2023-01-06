import { Badge, FormLabel } from '@chakra-ui/react'

function ActivitiesSection({ resume, setResume }) {
    const { activities } = resume

    return (
        <FormLabel htmlFor="activities">
            Activities and Hobbies:{' '}
            {activities &&
                activities.map((activity, i) => (
                    <>
                        <Badge
                            key={i}
                            colorScheme="teal"
                            size="sm"
                            m={1}
                            _hover={{ cursor: 'pointer', color: 'tomato' }}
                            // onClick={() => setActivities(activities.filter((_, j) => j !== i))}
                            onClick={() =>
                                setResume({
                                    ...resume,
                                    activities: activities.filter(
                                        (_, j) => j !== i
                                    ),
                                })
                            }
                        >
                            {activity}
                        </Badge>{' '}
                    </>
                ))}
        </FormLabel>
    )
}

export default ActivitiesSection
