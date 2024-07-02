import React, {memo, useEffect, useState} from "react";
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import {useSelector, useDispatch} from "react-redux";
import {showErrorBox, getReduxPersistData, readFile} from "@/utils";
import {actions} from "@/views/LoginDemo/store";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const { TextArea } = Input;

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
  showErrorBox("请输入正确的账号和密码！");
};

const LoginDemo: React.FC = () => {
  const dispatch = useDispatch();
  const storageUserName = useSelector((state: any) => state.loginReducer.username);
  const [form] = Form.useForm();
  const [persistData, setPersistData] = useState<string>("");

  const onFinish: FormProps<FieldType>['onFinish'] = (values: Omit<FieldType, "remember">) => {
    console.log('Success:', values);
    const {username, password} = values;

    dispatch(actions.setUserName(username));
    dispatch(actions.setLoginToken(`[username]:${username}/[password]:${password}`));
  };

  const handlePrintReduxPersistData = async () => {
    try {
      const data: string = await getReduxPersistData();
      const result: string = await readFile(`${data}/config.json`);

      setPersistData(result);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if(storageUserName) {
      form.setFieldValue("username", storageUserName);
    }
  }, [storageUserName]);
  
  return (
    <div className="w-full">
      <Button type="primary" danger ghost onClick={handlePrintReduxPersistData}>测试打印redux持久化数据</Button>
      <br />
      <TextArea autoSize disabled value={persistData} />

      <br />
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
    </div>
  );
};

export default memo(LoginDemo);
