"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Admin() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window != undefined) {
      let ADMIN_KEY = localStorage.getItem("ADMIN_KEY");
      if (ADMIN_KEY == undefined) {
        router.push("/admin/login")
      }
    }
  }, []);
  
  return <div>404</div>;
}
