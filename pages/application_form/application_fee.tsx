import { useRouter } from "next/router";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { PaystackButton } from "react-paystack";
import Button from "../../components/Button";
import FadeIn from "../../components/FadeIn";
import Logo from "../../components/Logo";
import ProgressBar from "../../components/ProgressBar";
import styles from "../../styles/Form.module.css";
import buttonStyles from "../../components/Button/Button.module.css";
import client from "../api/Services/AxiosClient";

const ApplicationFee = () => {
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies(["user", "applicant"]);

  useEffect(() => {
    if (!cookies.user || !cookies.applicant) router.push("/login");
    console.log(cookies.user?.email);
  });
  const config = {
    email: cookies.user?.email,
    amount: 1500000,
    publicKey: process.env.NEXT_PUBLIC_PS_PUBLIC_KEY!,
  };
  const handlePaystackCloseAction = () => {
    alert("Payment could not be Completed");
  };
  const markPaymentAsCompleted = async () => {
    try {
      const response = await client.post(
        `/applicant/payment/${cookies.user.applicantId}`
      );
      setCookie("applicant", { ...cookies.applicant, paymentCompleted: true });
      router.replace("/payment_successful");
    } catch (error) {
      console.log(error);
      alert(
        "Something went wrong... If your payment was successful, send us a message at medsuiteofficial@gmail.com"
      );
    }
  };
  const handlePaystackSuccessAction = () => {
    markPaymentAsCompleted();
  };
  const componentProps = {
    ...config,
    text: "Pay NGN 15,000",
    onSuccess: handlePaystackSuccessAction,
    onClose: handlePaystackCloseAction,
  };
  return (
    <FadeIn>
      <main>
        <div className={styles.logoContainer}>
          <Logo />
        </div>
        <div className={styles.progressbarContainer}>
          <ProgressBar page={4} />
        </div>
        <section className={styles.applicationFeeContainer}>
          <div className={styles.paystackLogoContainer}>
            <img
              className={styles.paystackLogo}
              src="/icons/paystackLogo.svg"
            />
          </div>
          {/* <Button color="#11C981" text="Pay N2,500" />
           */}
          <div
            className={`${buttonStyles.button} ${buttonStyles.paystackButtonContainer}`}
          >
            <PaystackButton
              {...componentProps}
            />
          </div>
          <Button
            onClick={() => router.push("/application_form/experience")}
            text="Prev < Experience"
          />
        </section>
      </main>
    </FadeIn>
  );
};
export default ApplicationFee;
