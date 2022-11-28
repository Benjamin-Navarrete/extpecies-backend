import { AiFillGithub } from "../../node_modules/react-icons/ai";

const Footer = () => {
  return (
    <div className="footer">
      <div className="row justify-content-center">
        <div className="col-2 text-end">Extpecies Design Pro</div>
        <div className="col-1 text-center">
          <AiFillGithub />
        </div>
        <div className="col-2 text-start">Extpecies Design</div>
      </div>
      <div className="row justify-content-center">
        <div className="col-4 text-center">
          Copyright ©2022 Produced by Extpecies
        </div>
      </div>
    </div>
  );
};

export default Footer;
