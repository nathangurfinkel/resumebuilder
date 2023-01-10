import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

function RichTextEditor({ value, setValue }) {
    

    return <ReactQuill theme="snow" value={value} onChange={setValue} />
}

export default RichTextEditor
