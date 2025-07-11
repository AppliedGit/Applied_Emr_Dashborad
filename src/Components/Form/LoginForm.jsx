import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import InputGroup from 'Components/Input/InputGroup';
import ButtonComponent from 'Components/Button/Button';
import { useCustomNavigate, useDispatch } from 'ResuableFunctions/CustomHooks';
import { handleEyeFunction, handleLogin, handleLoginCredentials, handleValidation } from 'Views/Common/Action/Common_action';
import sha256 from 'sha256';
import { useSelector } from 'react-redux';
import ButtonSpinner from 'Components/Spinner/ButtonSpinner';

const LoginForm = () => {
    const { usernamee, passwordd, eyeOpen, buttonSpinner, validated } = useSelector((state) => state.commonState);
    const dispatch = useDispatch();
    const navigate = useCustomNavigate();

    const handlSubmitOnEnter = (e) => {
        if (e.key === "Enter") {
            handleSubmit();
        }
    };

    const handleSubmit = () => {
        if (usernamee && passwordd) {
            let username = usernamee
            let password = passwordd

            const basicAuth = btoa(`${username}:${sha256(password)}`);
            dispatch(handleLogin(basicAuth, navigate))
        } else {
            dispatch(handleValidation)
        }
    };

    return (
        <Form className='pb-3'>
            <Row className="mb-3">
                <InputGroup
                    controlId="validationLoginUsername"
                    gropuClassName="col-12 py-2 text-secondary mb-2"  // changed mb-2 to mb-3 for better spacing
                    inputHeading="Username"
                    inputType="text"
                    placeholder="Username"
                    inputError={validated && !usernamee ? "Username required" : ""}
                    change={(e) => dispatch(handleLoginCredentials({ username: e.target.value }))}
                    value={usernamee}
                />

                <InputGroup
                    controlId="validationLoginPassword"
                    gropuClassName="col-12 py-2 text-secondary"
                    inputHeading="Password"
                    inputType="password"
                    placeholder="Password"
                    inputError={validated && !passwordd ? "Password required" : ""}
                    value={passwordd}
                    eyeState={!eyeOpen}
                    change={(e) => dispatch(handleLoginCredentials({ password: e.target.value }))}
                    eyeFunctionClick={() => dispatch(handleEyeFunction())}
                    keyDown={handlSubmitOnEnter}
                />
            </Row>



            {
                buttonSpinner ?
                    <ButtonSpinner title="Logging in" className="w-100 ps-3 btn-primary" spinner_width_height="1.5rem" />
                    :
                    <ButtonComponent
                        type="button"
                        className="btn-md btn-primary w-100"
                        clickFunction={handleSubmit}
                        title="Log in"
                        buttonName="Log in"
                    />
            }
        </Form>
    )
}

export default LoginForm