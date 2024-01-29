import Form from "./Form";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

const SignUp = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const handleRegister = (login, password, name, age, height, weight) => {
    fetch("http://localhost:3001/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ login, password, name, age, height, weight }),
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        if (data.length > 200) {
          window.localStorage.setItem("token", data);
          navigate("/");
        } else {
          alert(data);
        }
      })
      .catch(() => {
        messageApi.open({ type: "error", content: "Ошибка сервера" });
      });
  };

  return (
    <>
      {contextHolder}
      <Form title="Зарегистрироваться" handleClick={handleRegister} />
    </>
  );
};

export default SignUp;
