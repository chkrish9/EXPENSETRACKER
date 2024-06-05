import { Outlet, Link } from "react-router-dom";
import { useRef } from "react";
import usePersist from "../hooks/usePersist";
import { useGlobalContext } from "../context/globalContext";
import { Messages } from "primereact/messages";
import { useMountEffect } from "primereact/hooks";

const PersistLogin = () => {
  const [persist] = usePersist();
  const { token } = useGlobalContext();
  const msgs = useRef(null);
  const { refresh, setToken } = useGlobalContext();

  const errorContent = () => {
    return (
      <>
        <Messages ref={msgs} />
        <Link to="/login">Login</Link>
      </>
    );
  };
  const verifyRefreshToken = async () => {
    console.log("verifying refresh token");
    try {
      const response = await refresh();
      if (!response) {
        return errorContent();
      }
      const accessToken = response;
      setToken(accessToken);
      return <Outlet />;
    } catch (err) {
      console.error(err);
      return errorContent();
    }
  };

  useMountEffect(() => {
    if (msgs.current) {
      msgs.current.clear();
      msgs.current.show([
        {
          sticky: true,
          severity: "error",
          summary: "Error",
          detail: "Some thing went wrong. Please login again",
          closable: false,
        },
      ]);
    }
  });

  let content;
  if (!persist && token) {
    // persist: no
    content = <Outlet />;
  } else if (token) {
    //persist: yes, token: yes
    console.log("token and uninit");
    content = <Outlet />;
  } else {
    verifyRefreshToken();
  }

  return content;
};
export default PersistLogin;
