import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import ContactDetailsItem from "../components/ContactDetailsItem";
import Navbar from "../components/Navbar";
import ViewApplicationButton from "../components/ViewApplicationButton";
import styles from "../styles/ViewApplication.module.css";
import ContactDetails from "./application_form/contact_details";
import { motion } from "framer-motion";
import DocumentItem from "../components/Document";
import InfoMessage from "../components/InfoMessage";

const ViewApplication = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["user", "applicant"]);
  const router = useRouter();

  useEffect(() => {
    if (!cookies.user || !cookies.applicant) {
      router.push("/login");
    } else {
      setFirstName(cookies.applicant?.contactDetails?.firstName);
      setLastName(cookies.applicant?.contactDetails?.lastName);
      setMiddleName(cookies.applicant?.contactDetails?.middleName);
      setPhoneNumber(cookies.applicant?.contactDetails?.phoneNumber);
      setStateOfOrigin(cookies.applicant?.contactDetails?.stateOfOrigin);
      setCountryOfOrigin(cookies.applicant?.contactDetails?.countryOfOrigin);
      setStreet(cookies.applicant?.contactDetails?.street);
      setCity(cookies.applicant?.contactDetails?.city);
      setState(cookies.applicant?.contactDetails?.state);
      setImgSrc(cookies.applicant?.documents?.profilePic);
      setApplicantId(cookies.user?.applicantId);
      setDocuments(Object.values(cookies.applicant?.documents));
      setNursingExperience(cookies.applicant?.experience?.nursingExperience);
      setPostGraduateExperience(
        cookies.applicant?.experience?.postGraduateExperience
      );
      setProofOfWork(cookies.applicant?.experience?.proofOfWork);
    }
  });

  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [stateOfOrigin, setStateOfOrigin] = useState("");
  const [countryOfOrigin, setCountryOfOrigin] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [imgSrc, setImgSrc] = useState();
  const [applicantId, setApplicantId] = useState("");
  const [documents, setDocuments] = useState([]);
  const [nursingExperience, setNursingExperience] = useState("");
  const [postGraduateExperience, setPostGraduateExperience] = useState("");
  const [proofOfWork, setProofOfWork] = useState({
    fileName: "",
    secure_url: "",
    public_id: "",
  });

  const [activeNav, setActiveNav] = useState("contact");
  return (
    <main className={styles.mainContainer}>
      <Navbar />
      <div className={styles.infoMessagesContainer}>
        <InfoMessage
          text={
            "Kindly request for a letter of Good Standing from the Nursing and Midwifery Council in your country which will verify among other things, your nursing education and license. The letter should be addressed to medsuiteofficial@gmail.com. Please note that applications will not be processed without the receipt of this letter"
          }
        />
        <InfoMessage
          text={
            "You may have to make a payment to the Nursing and Midwifery Council in your country to enable Dataflow Group initiate the verification request for your credential verification"
          }
        />
      </div>
      <section className={styles.applicantDetails}>
        <div className={styles.profilePicContainer}>
          <img className={styles.profilePic} src={imgSrc} />
        </div>
        <div className={styles.textContainer}>
          <p>
            {firstName} {lastName}
          </p>
          <p className={styles.applicantId}>
            ID:{" "}
            <span className={`${styles.orangeText} ${styles.clipped}`}>
              {applicantId}
            </span>
          </p>
        </div>
      </section>
      <nav className={styles.nav}>
        <ViewApplicationButton
          active={activeNav == "contact"}
          onClick={() => setActiveNav("contact")}
          text={"Contact Info"}
        />
        <ViewApplicationButton
          active={activeNav == "documents"}
          onClick={() => setActiveNav("documents")}
          text={"Documents"}
        />
        <ViewApplicationButton
          active={activeNav == "experience"}
          onClick={() => setActiveNav("experience")}
          text={"Experience"}
        />
      </nav>
      <div className={styles.overflowContent}>
        <motion.section
          animate={{
            x:
              activeNav == "contact"
                ? 0
                : activeNav == "documents"
                ? "-100vw"
                : "-200vw",
            transition: {
              duration: 0.4,
            },
          }}
          className={styles.content}
        >
          <motion.section
            animate={{ opacity: activeNav == "contact" ? 1 : 0 }}
            className={`${styles.gridColumn} ${styles.contactDetails}`}
          >
            <div>
              <ContactDetailsItem title="First Name:" text={firstName} />
              <ContactDetailsItem title="Last Name:" text={lastName} />
              <ContactDetailsItem title="Middle Name:" text={middleName} />
              <ContactDetailsItem title="Phone Number:" text={phoneNumber} />
              <ContactDetailsItem
                title="State Of Origin:"
                text={stateOfOrigin}
              />
              <ContactDetailsItem
                title="Country Of Origin:"
                text={countryOfOrigin}
              />
              <h3 className={styles.smallHeader}>Address</h3>
              <ContactDetailsItem title="Street: " text={street} />
              <ContactDetailsItem title="Town / City: " text={city} />
              <ContactDetailsItem title="State: " text={state} />
            </div>
          </motion.section>
          <motion.section
            animate={{
              opacity:
                activeNav == "documents" || activeNav == "experience" ? 1 : 0,
            }}
            className={`${styles.gridColumn} ${styles.documentContainer}`}
          >
            {documents.map((item: any, index) => (
              <DocumentItem
                key={index}
                fileName={item.fileName}
                url={item.secure_url}
                status="Being reviewed"
              />
            ))}
          </motion.section>
          <motion.section
            animate={{ opacity: activeNav == "experience" ? 1 : 0 }}
            className={`${styles.gridColumn} ${styles.contactDetails}`}
          >
            <div>
              <ContactDetailsItem
                title="Nursing Experience:"
                text={nursingExperience}
              />
              <ContactDetailsItem
                title="Experience in Post Graduate Nursing Specialty Area:"
                text={postGraduateExperience}
              />
            </div>
            <p className={styles.smallHeader}>Proof Of Work</p>
            <DocumentItem
              fileName={proofOfWork.fileName}
              url={proofOfWork.secure_url}
              status="Being reviewed"
            />
          </motion.section>
        </motion.section>
      </div>
    </main>
  );
};

export default ViewApplication;
