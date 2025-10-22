const Footer = () => {
  return (
    <footer className="bg-white border-t p-6 text-center">
      <p className="text-sm text-gray-500">
        &copy; {new Date().getFullYear()} <b> Farrux Temurov.</b> All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
