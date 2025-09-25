import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "./authContext";
import { makeApiRequest } from "../lib/api";
import Loader from "../components/common/Loader";

const MemberProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [members, setMembers] = useState([]);

  const fetchMembers = () => {
    const { response, error } = makeApiRequest({
      endpoint: "/admin/members",
    });
    console.log(response);

    if (error) {
      console.log(error);
      return;
    }

    if (response.success) {
      setMembers(response);
    }
  };

  useEffect(() => {
    if (user?.role == "Member") {
      setMembers([]);
    } else if (user) {
      fetchMembers();
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return <Loader />;
  }
  return (
    <MemberContext.Provider value={{ members, setMembers }}>
      {children}
    </MemberContext.Provider>
  );
};

export default MemberContext;
