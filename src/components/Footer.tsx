const Footer = () => {
  return (
    <footer className="bg-[#fdf6fd] border-t border-purple-100 text-center py-4">
      <p className="text-sm text-[#6b4089]">
        &copy; {new Date().getFullYear()} PhysiologyShelf. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
