const NewsLetter = () => {
  return (
    <section className="container mx-auto px-4">
      <form className="bg-gradientlight dark:bg-gradientdark text-textdark dark:text-textlight px-4 rounded-xl md:rounded-xl flex flex-col justify-center items-center py-6 md:py-24">
        <p className="md:font-semibold text-lg md:text-xl text-center mb-3">
          Be the first to learn about our monthly offers!
        </p>
        <p className="md:font-semibold font-medium text-2xl md:text-3xl lg:text-5xl text-center">
          Sign Up for Our Newsletter
        </p>

        <div className="flex-col justify-center w-full md:flex-row flex pt-12">
          <input
            type="email"
            placeholder="Your email address"
            className="bg-white text-textdark md:h-[4rem] h-[3.5rem] mb-2 md:mb-0 rounded-xl pl-6 md:mr-5 md:w-[30rem] placeholder:text-textdark focus:outline-none"
          />
          <button type="button" className="btn-tertiary">
            Subscribe
          </button>
        </div>
      </form>
    </section>
  );
};

export default NewsLetter;
