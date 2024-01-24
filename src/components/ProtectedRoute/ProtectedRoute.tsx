import { FunctionComponent } from "react";
import { useSelector } from "../../utils/hooks";
import { Navigate, useLocation } from "react-router-dom";

interface IProps {
  onlyUnAuth?: boolean;
  component: any;
}

const Protected: FunctionComponent<IProps> = ({ onlyUnAuth = false, component }) => {
  const user = useSelector((store) => store.userData.isAuthenticated);
  const location = useLocation();

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return component;
};

export const OnlyAuth: FunctionComponent<IProps> = Protected;
export const OnlyUnAuth: FunctionComponent<IProps> = ({ component }) => <Protected onlyUnAuth={true} component={component} />;
