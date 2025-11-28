import { Steps } from "antd"
import {
  EnvironmentOutlined,
  CarOutlined,
  CreditCardOutlined,
} from "@ant-design/icons"
import "./StepProgress.css"

const StepProgress = ({ currentStep }) => {
  const steps = [
    {
      title: "Address",
      icon: <EnvironmentOutlined />,
      description: "Step 1",
    },
    {
      title: "Shipping",
      icon: <CarOutlined />,
      description: "Step 2",
    },
    {
      title: "Payment",
      icon: <CreditCardOutlined />,
      description: "Step 3",
    },
  ]

  return (
    <div className="step-progress-container">
      <Steps current={currentStep} items={steps} className="custom-steps" />
    </div>
  )
}

export default StepProgress
