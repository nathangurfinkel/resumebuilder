export function handleDownload(resume) {
    // function to download resume as a json file
    const element = document.createElement('a')
    const file = new Blob([JSON.stringify(resume)], {
        type: 'application/json',
    })
    element.href = URL.createObjectURL(file)
    element.download = 'resume.json'
    document.body.appendChild(element) // Required for this to work in FireFox
    element.click()
}
