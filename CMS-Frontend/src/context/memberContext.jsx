import React, { useContext, useState, useEffect, createContext } from "react";
import { AuthContext } from "./AuthContext";
import { makeApiRequest } from "../lib/api";
import Loader from "../components/common/Loader";

export const MemberContext = createContext();

const MemberProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true)

  const fetchMembers =async () => {
    const { response, error } =await makeApiRequest({
      endpoint: "/admin/members",
    });
    // console.log(response);

    if (error) {
        console.log(error);
        setLoading(false);
      return;
    }

    if (response.success) {
      setMembers(response);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role == "student") {
      setMembers([]);
    } else if (user?.role !== "student") {
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

export default MemberProvider;
