import Contacts from "../contacts/Contacts";

const ContactInfo = () => {
  return (
    <div className="contact">
      <div className="wrapper flex flex-col items-center pt-8 pb-6 px-4">
        <h1 className="font-bold text-[1.5rem] mb-8">Where you can find us</h1>
        <Contacts isContactPage />
      </div>
    </div>
  );
};

export default ContactInfo;
