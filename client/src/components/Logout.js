import React, { useEffect } from "react";

const Logout = () => {
  useEffect(() => {
    localStorage.removeItem("userInfo");
  }, []);

  return <div>Logout</div>;
};

export default Logout;
