import React from "react"
import { Button } from "reactstrap"

const BackBtn = (props) => (
    <Button color="primary" onClick={props.onClick}>
        Quay lại {props.title}
    </Button>
)

export default BackBtn;