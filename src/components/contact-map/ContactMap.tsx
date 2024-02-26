const ContactMap = () => {
  return (
    <div className="contact">
      <div className="wrapper w-full h-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2694.274376999996!2d18.989725587902146!3d47.52352099687815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4741dece04b94d9d%3A0x253cb7b918851857!2sBudapest%2C%20Pasar%C3%A9ti%20%C3%BAt%20129%2C%201026%20Hungary!5e0!3m2!1sen!2sgr!4v1708967301197!5m2!1sen!2sgr"
          loading="lazy"
          className="border-none w-full h-full rounded-xl outline-none"
        />
      </div>
    </div>
  );
};

export default ContactMap;
