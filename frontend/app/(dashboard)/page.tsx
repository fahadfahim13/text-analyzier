"use client";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useCreateUserMutation } from "@/lib/redux/APIs/user";
import { toast } from "@/components/ui/use-toast";

const Dashboard = () => {
  const { status, data: session } = useSession();

  const [
    createUser,
    { data: userCreationData, isLoading, isSuccess, isError },
  ] = useCreateUserMutation();

  useEffect(() => {
    if (status === "authenticated" && session.user?.email) {
      createUser(session.user);
    }
  }, [status, session?.user?.email]);

  useEffect(() => {
    if (isSuccess && !isLoading && !isError && userCreationData) {
      toast({
        title: "Successfully logged in!!",
        style: {
          backgroundColor: "cyan",
          color: "white",
        },
      });
    }
    if (isError && !isLoading) {
      toast({
        title: "Something wrong happened!",
        variant: "destructive",
      });
    }
  }, [userCreationData, isLoading, isSuccess, isError]);

  return (
    <section className="bg-gray-900 text-white">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-auto lg:items-center">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
            Next-Gen Text Analyzer.
            <span className="sm:block"> Increase Conversion. </span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
            Analyze text and get insights into your text.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              className="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
              href={status === "unauthenticated" ? "/sign-in" : "/Dashboard"}
            >
              {status === "unauthenticated" ? "Get Started" : "Go To Dashboard"}
            </Link>

            {/* <a
              className="block w-full rounded border border-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
              href="/Dashboard"
            >
              
            </a> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
