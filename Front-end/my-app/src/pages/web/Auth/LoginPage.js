import AuthCard from "../../../components/Auth/AuthCard"
import AuthContainer from "../../../components/Auth/AuthContainer"
import AuthFormFooter from "../../../components/Auth/AuthFormFooter"
import LoginForm from "../../../components/Auth/LoginForm"

const LoginPage = () => {
  return (
    <AuthContainer>
      <AuthCard>
        <LoginForm />
        <AuthFormFooter
          text="Don't have an account?"
          linkText="Create one"
          linkTo="/signup"
        />
      </AuthCard>
    </AuthContainer>
  )
}

export default LoginPage
