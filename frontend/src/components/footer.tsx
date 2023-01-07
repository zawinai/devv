const Footer = () => {
  return (
    <footer className='border-t font-Futurist mt-32 pt-12 pb-32 px-4 lg:px-0  bg-slate-200'>
      <div className='text-center max-w-[800px] mx-auto text-sm'>
        <span className='bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-sky-800 text-2xl'>
          DEV Book
        </span>{" "}
        👩‍💻👨‍💻 — A constructive and inclusive social network for software
        developers. With you every step of your journey. Built on Forem — the
        open source software that powers DEV and other inclusive communities.
        Made with{" "}
        <span className='bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-sky-800'>
          MERN
        </span>{" "}
        stack. 👩‍💻👨‍💻 © 2023.
      </div>
    </footer>
  );
};

export default Footer;
