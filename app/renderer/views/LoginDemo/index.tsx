import React, {memo, useEffect} from "react";
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import {useSelector, useDispatch} from "react-redux";
import {showErrorBox} from "@/utils";
import {actions} from "@/views/LoginDemo/store";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
  showErrorBox("请输入正确的账号和密码！");
};

const LoginDemo: React.FC = () => {
  const dispatch = useDispatch();
  const storageUserName = useSelector((state: any) => state.loginReducer.username);
  const [form] = Form.useForm();

  // const [user, setUser] = useState<string>("");

  const onFinish: FormProps<FieldType>['onFinish'] = (values: Omit<FieldType, "remember">) => {
    console.log('Success:', values);
    const {username, password} = values;

    dispatch(actions.setUserName(username));
    dispatch(actions.setLoginToken(`[username]:${username}/[password]:${password}`));
  };

  useEffect(() => {
    if(storageUserName) {
      form.setFieldValue("username", storageUserName);
    }
  }, [storageUserName]);
  
  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item<FieldType>
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default memo(LoginDemo);
