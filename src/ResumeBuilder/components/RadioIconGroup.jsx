import { IconButton, Box, HStack } from '@chakra-ui/react'
import { CgFile, CgCloud } from 'react-icons/cg'
import { useState } from 'react'
import { Flex } from '@chakra-ui/react'

function RadioIconGroup({ isLocal, setIsLocal }) {
    // component that imitates radio button behavior but looks like a toggle switch with icons that chage on click
    // the icon will move (translateX) to the right when the toggle is 'Cloud' and to the left when the toggle is 'File'
    return (
        <Flex>
            <HStack spacing={1}>
                <IconButton
                    aria-label="File"
                    icon={<CgFile />}
                    onClick={() => setIsLocal(true)}
                    colorScheme={!isLocal ? 'gray' : 'blue'}
                >
                    Local Mode
                </IconButton>

                <IconButton
                    aria-label="Cloud"
                    icon={<CgCloud />}
                    onClick={() => setIsLocal(false)}
                    colorScheme={isLocal ? 'gray' : 'blue'}
                >
                    Cloud Mode
                </IconButton>
            </HStack>
        </Flex>
    )
}

export default RadioIconGroup
