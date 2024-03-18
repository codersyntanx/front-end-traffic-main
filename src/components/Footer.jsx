const Footer = () => {
  return (
    <footer
      className="bg-[#292929] max-h-10 pt-4"
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <img src="/navbar.png" alt="logo" className="w-32 cursor-pointer" />
      <p className="text-white text-lg font-bold">
        &copy; 2023 . All rights reserved.
      </p>
    </footer>
  );
};
export default Footer;
