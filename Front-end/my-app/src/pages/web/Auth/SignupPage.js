import AuthCard from "../../../components/Auth/AuthCard"
import AuthContainer from "../../../components/Auth/AuthContainer"
import AuthFormFooter from "../../../components/Auth/AuthFormFooter"
import SignupForm from "../../../components/Auth/SignupForm"

const SignupPage = () => {
  return (
    <AuthContainer>
      <AuthCard>
        <SignupForm />
        <AuthFormFooter
          text="Already have an account?"
          linkText="Sign In"
          linkTo="/login"
        />
      </AuthCard>
    </AuthContainer>
  )
}

export default SignupPage
