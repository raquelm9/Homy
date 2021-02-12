import React from "react";
import { Modal, Button, Form, InputGroup, FormControl } from "react-bootstrap";

function ResidentPostForm() {
  return (
    <div>
      <Form>
        <Form.Group>
          {/* <Form.Label>CAPTION</Form.Label> */}
          <Form.Control
            type="textarea"
            as="textarea"
            placeholder="WRITE A CAPTION..."
            rows={3}
          />
          <Form.Text className="text-muted">
            Please be cautious of providing your unit number.
          </Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.File id="exampleFormControlFile1" label="Choose an image" />
        </Form.Group>
        <Button variant="primary" type="submit">
          POST
        </Button>
      </Form>
    </div>
  );
}

export default ResidentPostForm;
