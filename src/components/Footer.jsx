import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = () => {
  return (
    <div className="flex flex-col justify-center items-center p-2 border-t-2">
      <div className="">
        &copy; 2023 | Made with ❤️ by{" "}
        <a
          href="https://grenishrai.vercel.app"
          className=" ml-1 text-indigo-500 underline"
          target="_blank"
        >
          Grenish
        </a>
      </div>

      <div className="text-xs flex items-center mt-2">
        Lincesed under MIT License |{" "}
        <a href="https://github.com/Grenish/binary-search" className="ml-1">
          {" "}
          <GitHubIcon fontSize="small" />{" "}
        </a>
      </div>
    </div>
  );
};

export default Footer;
