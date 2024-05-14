import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { toast } from "sonner";
import { Input, Button, Form, FormGroup, Label } from "reactstrap";
import Select from "react-select";

import useAppContext from "../../hooks/useAppContext";

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;

const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  border-radius: 4px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.4);
  padding: 40px 80px;
`;

const LoginTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 8px;
`;

const Login = (props) => {
  const navigate = useNavigate();
  const {
    loadingState: { setIsLoading },
    authState: { signIn },
  } = useAppContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("teacher");

  const options = [
    { label: "Quản lý", value: "admin" },
    { label: "Giáo viên", value: "teacher" },
    { label: "Phụ huynh", value: "parent" },
  ];

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signIn({ email, password, role });

      toast.success("Đăng nhập thành công");
      navigate("/");
    } catch (err) {
      toast.error(err?.response?.data);
    }
    setIsLoading(false);
  };

  return (
    <LoginContainer>
      <LoginForm>
        <LoginTitle>
          <img
            src="/logo.png"
            alt=""
            style={{
              width: "30px",
              height: "30px",
              marginRight: "8px",
            }}
          />
          <h3 className="m-0">Đăng nhập</h3>
        </LoginTitle>

        <Form onSubmit={(e) => handleSignIn(e)}>
          <FormGroup className="d-flex flex-column">
            <Label>Bạn là</Label>
            <Select
              className="mb-2"
              options={options}
              value={options.find((option) => option.value === role)}
              onChange={(e) => setRole(e.value)}
            />

            <Input
              type="email"
              className="mb-2"
              placeholder={"Email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              type="password"
              className="mb-2"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              type="button"
              color="link"
              className="p-0 mt-4 d-block"
              onClick={() => navigate("/forgot-password")}
            >
              Quên mật khẩu
            </Button>

            <Button
              type="submit"
              className="mt-2 justify-self-center"
              color="primary"
            >
              Đăng nhập
            </Button>
          </FormGroup>
        </Form>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;
