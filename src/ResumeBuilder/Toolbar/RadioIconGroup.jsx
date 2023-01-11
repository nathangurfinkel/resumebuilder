import {
    IconButton,
    Box,
    HStack,
    Button,
    useColorModeValue,
} from '@chakra-ui/react'
import { CgFile, CgCloud } from 'react-icons/cg'
import { useState } from 'react'
import { Flex } from '@chakra-ui/react'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { BsCloudDownload } from 'react-icons/bs'
import { useEffect } from 'react'
import { BounceLoader, BeatLoader } from 'react-spinners'

function RadioIconGroup({
   deleteResume,


}) {
    //timeout for the button to change back to saved after 2 seconds

    const [timeout, setTimeout] = useState(null)
    const [buttonLoading, setButtonLoading] = useState(false)
    const [buttonColor, setButtonColor] = useState('blue')
    const [buttonIcon, setButtonIcon] = useState(null)
    const [buttonText, setButtonText] = useState('Save')
    useEffect(() => {
        if (updateResumeLoading) {
            setButtonLoading(true)
            setButtonColor('mango')
            setButtonIcon(null)
        }
        if (updateResumeError) {
            setButtonLoading(false)
            setButtonColor('red')
            setButtonIcon(null)
        }
        if (updateResume) {
            setButtonLoading(false)
            setButtonColor('green')
            setButtonIcon(null)
        }
    }, [updateResumeLoading, updateResumeError, updateResume])

    return (
        <>
            <Button
                w="100px"
                spinner={<BeatLoader size={10} color="white" />}
                isLoading={buttonLoading}
                colorScheme={buttonColor}
                leftIcon={buttonIcon}
                onClick={() => {
                    onUpdate()
                }}
                variant="ghost"
            >
                {buttonText}
            </Button>
        </>
    )
}

export default RadioIconGroup
