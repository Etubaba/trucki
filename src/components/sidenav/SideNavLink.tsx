import { SideBarLinkType } from "../../types";
import { Link, useLocation, useNavigate } from "react-router-dom";

const SideNavLink = ({
  iconName,
  text,
  href,
  setIndex,
  index,
}: SideBarLinkType) => {
  const router = useNavigate();

  const location = useLocation();
  const path = location.pathname;

  const handleClick = () => {
    setIndex(index);
    router(href);
  };

  return (
    <Link to={href}>
      <div
        key={index}
        className={
          path === href
            ? "hover:cursor-pointer rounded-md p-2  md:pl-2 md:my-2 md:block text-primary  hover:text-primary/30 font-semibold"
            : "hover:cursor-pointer rounded-md p-2  md:pl-2 md:my-2 md:block hover:text-primary/40  text-primary  font-light"
        }
        onClick={handleClick}
      >
        <div className="flex space-x-2 items-center">
          <div>{iconName}</div>
          <div className="capitalize">{text}</div>
        </div>
      </div>
    </Link>
  );
};

export default SideNavLink;
