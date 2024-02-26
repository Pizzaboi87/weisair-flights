import ContactForm from "@/components/contact-form/ContactForm";
import ContactInfo from "@/components/contact-info/ContactInfo";
import ContactMap from "@/components/contact-map/ContactMap";

const Contact = () => {
  return (
    <div className="grid lg:grid-cols-3 lg:grid-rows-2 gap-4 relative container mx-auto md:my-24 my-12 2xl:mt-[10rem]">
      <ContactForm />
      <ContactInfo />
      <ContactMap />
    </div>
  );
};

export default Contact;
