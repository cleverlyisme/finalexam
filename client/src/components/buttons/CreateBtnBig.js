import { Button } from "reactstrap";

export default ({ title, onClick, ...rest }) => (
  <Button color="success" onClick={onClick} {...rest}>
    Tạo {title}
  </Button>
);
