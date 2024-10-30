import { useState, } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate }from 'react-router-dom';
import * as Yup from 'yup';
import clsx from 'clsx';
import styles from './Login.module.scss'; 
import Button from '../../components/Button';
import { login } from '~/components/Redux/Actions/AuthAction';
import { useDispatch } from 'react-redux';
import { registerUser } from '~/apis/index.js';

function Login () {
  const [showRegisterPopup, setShowRegisterPopup] = useState(false);
  const [showPassword, setShowPassword] = useState(false); 
  const nevigate = useNavigate()
  const dispatch = useDispatch();

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    // email: Yup.string().email('Email không hợp lệ').required(),
    // password: Yup.string().min(6, 'Mật khẩu ít nhất 6 ký tự').required(),
  });

  const handleSubmit = async (values) => {
    // nevigate("/")
    const { email, password } = values; 
    await dispatch(login({email,password}));
    // onLogin()
    // console.log('Login form submitted', values);
  };

  const handleRegisterSubmit = async (values) => {
    const data = await registerUser(values);
    console.log(data);

  };

  const handleRegisterClick = () => {
    setShowRegisterPopup(true);
  };

  const handleClosePopup = () => {
    setShowRegisterPopup(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={clsx(styles.container)}>
      <div className={clsx(styles.logo)}>
        <h1>Cloudy</h1>
      </div>

      <div className={clsx(styles.loginBox, { [styles.blurBackground]: showRegisterPopup })}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
          <h2 style={{ color: '#0866FF' }}>Login</h2>
        </div>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          <Form>
            <div className={clsx(styles.formGroup)}>
              <Field type="email" id="email" name="email" placeholder="Email" />
              <ErrorMessage name="email" component="div" className={clsx(styles.errorMessage)} />
            </div>

            {/* Ô nhập mật khẩu với icon */}
            <div className={clsx(styles.formGroup, styles.passwordGroup)}>
              <div className={clsx(styles.passwordWrapper)}>
                <Field
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  placeholder="Password"
                />
                <i
                  className={clsx('fas', showPassword ? 'fa-eye-slash' : 'fa-eye', styles.iconEye)}
                  onClick={togglePasswordVisibility}
                ></i>
              </div>
              <ErrorMessage name="password" component="div" className={clsx(styles.errorMessage)} />
            </div>

            <div className={clsx(styles.formActions)}>
              <Button type="submit" size='large' className={clsx(styles.loginButton)}>Login</Button>
            </div>
          </Form>
        </Formik>

        <a href="#" className={clsx(styles.forgotPassword)}>Forgot password ?</a>

        <div className="">
          <br />
        </div>

        <div className={clsx(styles.additionalActions)}>
          <Button size='large' className={clsx(styles.registerButton)} onClick={handleRegisterClick}>
            Sign in
          </Button>
        </div>
      </div>

      {showRegisterPopup && (
        <div className={clsx(styles.registerPopup)} onClick={handleClosePopup}>
          <div
            className={clsx(styles.popupContent)}
            onClick={(e) => e.stopPropagation()} // Ngăn chặn sự kiện nhấn chuột từ truyền ra ngoài
          >
            <h2 style={{ margin: '15px', color:'#1D72FE' }}>Sign in</h2>
            <Formik
              initialValues={{ firstName: '', lastName: '', email: '', password: '' }}
              validationSchema={Yup.object({
                firstName: Yup.string().required('Enter first name'),
                lastName: Yup.string().required('Enter last name'),
                email: Yup.string().email('Email not valid').required('Enter email'),
                password: Yup.string().min(6, 'Password at least 6 characters').required('Enter password'),
              })}
              onSubmit={(values) => {
                console.log('Register form submitted', values);
                handleRegisterSubmit(values);
                // handleClosePopup();
              }}
            >
              <Form>
                <div className={clsx(styles.regisName)}>
              
                  <div className={clsx(styles.formGroup)}>
                    <Field type="text" id="lastName" name="lastName" placeholder="Last Name" />
                    <ErrorMessage name="lastName" component="div" className={clsx(styles.errorMessage)} />
                  </div>

                  <div className={clsx(styles.formGroup)}>
                    <Field type="text" id="firstName" name="firstName" placeholder="First Name" />
                    <ErrorMessage name="firstName" component="div" className={clsx(styles.errorMessage)} />
                  </div>

                </div>
                <div className={clsx(styles.formGroup)}>
                  <Field type="email" id="email" name="email" placeholder="Email" />
                  <ErrorMessage name="email" component="div" className={clsx(styles.errorMessage)} />
                </div>
                <div className={clsx(styles.formGroup)}>
                  <Field type="password" id="password" name="password" placeholder="Password" />
                  <ErrorMessage name="password" component="div" className={clsx(styles.errorMessage)} />
                </div>

                <div className={clsx(styles.formGroup)}>
                  <Field type="password" id="re-password" name="re-password" placeholder="Re-write password" />
                  <ErrorMessage name="password" component="div" className={clsx(styles.errorMessage)} />
                </div>

                <div className={clsx(styles.additionalActions)}>
                  <Button type="submit" className={clsx(styles.registerButton)}>Sign in</Button>
                </div>

              </Form>
            </Formik>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
