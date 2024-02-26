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

/*

<div className="grid grid-cols-2 grid-rows-2 gap-4">
    <div className="row-span-2">1</div>
    <div >3</div>
    <div className="col-start-2">4</div>
</div>
    
*/
