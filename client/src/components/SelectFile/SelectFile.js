import React, { useRef, useState } from 'react'
import { InputGroup, FormControl, Button } from 'react-bootstrap';

function SelectFile({ onFileSelect, className }) {

    const [imageName, setImageName] = useState('')
    const hiddenFileInput = useRef(null);

    const handleChange = e => {
        setImageName(e.target.files[0].name)
        onFileSelect(e.target.files[0])
    }

    const handleClick = (e) => {
        hiddenFileInput.current.click();
    }

    return (
        <div>
            <InputGroup className="mb-3">
                <FormControl
                    placeholder="Choose image"
                    aria-label="Choose image"
                    aria-describedby="basic-addon2"
                    value={imageName}
                    onChange={() => console.log('')}
                    onClick={handleClick}
                />
                <InputGroup.Append>
                    <Button variant="secondary"
                        onClick={handleClick}
                    >
                        Button
                    </Button>
                    <input
                        style={INPUT_STYLE}
                        onChange={handleChange}
                        ref={hiddenFileInput}
                        type="file"
                        id="file"
                        name="file"
                    />
                </InputGroup.Append>
            </InputGroup>
        </div>
    )
}

export default SelectFile;

const INPUT_STYLE = {
    display: "none"
}

