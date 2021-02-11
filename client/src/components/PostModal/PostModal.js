import { Modal, Form, Button } from 'react-bootstrap';

const PostModal= (props) => {
    
    // const [showPostModal, setShowPostModal] = useState(false);
    // const handleClose = () => (console.log("close"))
    return ( 
    

        <div class="modal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Modal title</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p>Modal body text goes here.</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
                </div>
            </div>
        </div>

        // <Modal show={props.handleShow} onHide={props.handleClose}> 
        //     <Form>
        //     <Form.Group controlId="formBasicEmail">
        //         <Form.Label>Email address</Form.Label>
        //         <Form.Control type="email" placeholder="Enter email" />
        //         <Form.Text className="text-muted">
        //         We'll never share your email with anyone else.
        //         </Form.Text>
        //     </Form.Group>

        //     <Form.Group controlId="formBasicPassword">
        //         <Form.Label>Password</Form.Label>
        //         <Form.Control type="password" placeholder="Password" />
        //     </Form.Group>
        //     <Form.Group controlId="formBasicCheckbox">
        //         <Form.Check type="checkbox" label="Check me out" />
        //     </Form.Group>
        //     <Button variant="primary" type="submit">
        //         Submit
        //     </Button>
        //     </Form>
        // </Modal>
     );
}
 
export default PostModal;