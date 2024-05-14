import { Link } from "react-router-dom";
import { BiHomeAlt } from "react-icons/bi";

const NotFound = () => {
  return (
    <div className="flex-colo gap-8 w-full min-h-screen text-white bg-main lg:py-20 py-10 px-6">
      <img
        src="/assets/images/404.svg"
        alt="Not Found"
        className="w-full h-96 object-contain "
      />
      <h1 className="lg:text-4xl font-bold">Page Not Found</h1>
      <p className="font-medium text-border leading-6">
        The page you are looking does not exist. You may have mistyped the URL
      </p>
      <Link
        to="/"
        className="bg-subMain transitions text-white flex-rows gap-4 font-medium py-3 px-6 hover:text-main rounded-md"
      >
        <BiHomeAlt />
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
