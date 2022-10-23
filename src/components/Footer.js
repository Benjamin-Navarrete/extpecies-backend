import { AiFillGithub } from "../../node_modules/react-icons/ai";

const Footer = () => {
  return (
    <div class="footer">
      <div class="row m-1">
        <div class="col-5 text-end">Extpecies Design Pro</div>
        <div class="col-2 text-center">
          <AiFillGithub />
        </div>
        <div class="col-5 text-start">Extpecies Design</div>
      </div>
      <div class="row m-1">
        <div class="col-12 text-center">
          Copyright ©2022 Produced by Extpecies
        </div>
      </div>
    </div>
  );
};

export default Footer;
