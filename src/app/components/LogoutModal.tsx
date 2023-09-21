import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

type AuthType = {
  username?: string;
};

function LogoutModal({ auth }: { auth: AuthType }) {
  const router = useRouter();
  const logout = async () => {
    const { data } = await axios.get("/api/auth/logout");
    return router.push("/login");
  };
  return (
    <div className="bg-black absolute -top-24  shadow-light z-50">
      <div className="py-4 px-2  min-w-[275px] text-sm font h-24 flex flex-col ">
        <Link href={"#"}> Add an existing account</Link>

        <Link
          href={"/logout"}
          onClick={(e) => {
            e.preventDefault();
            return logout();
          }}
          className="mt-3"
        >
          Logout @{auth.username}
        </Link>
      </div>
    </div>
  );
}

export default LogoutModal;
