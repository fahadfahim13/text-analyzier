"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import {
  useGetDetailsTextMutation,
  useUpdateTextMutation,
} from "@/lib/redux/APIs/resume";
import { useSession } from "next-auth/react";
import { toast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

const TextView = () => {
  const { textId } = useParams();
  const { status, data: userData } = useSession({
    required: true,
  });

  const router = useRouter();

  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const [
    getTextDetails,
    {
      data: textData,
      isSuccess: textDataSuccess,
      isError: textDataEror,
      isLoading: textDataLoading,
    },
  ] = useGetDetailsTextMutation();

  const [
    updateText,
    {
      data: textUpdateResponse,
      isSuccess: textUpdateSuccess,
      isError: textUpdateError,
      isLoading: textUpdateLoading,
    },
  ] = useUpdateTextMutation();

  useEffect(() => {
    if (userData?.user?.email) {
      getTextDetails({
        id: textId.toString(),
        userEmail: userData?.user?.email ?? "",
      });
    }
  }, [userData?.user?.email]);

  useEffect(() => {
    if (
      textUpdateResponse &&
      !textUpdateLoading &&
      !textUpdateError &&
      textUpdateSuccess
    ) {
      toast({
        title: "Successfully Updated Text",
        description: "Your Text has been updated successfully!!",
        style: {
          backgroundColor: "green",
          color: "white",
        },
      });
      window.location.reload();
      // router.refresh();
    }
    if (!textUpdateLoading && textUpdateError && !textUpdateSuccess) {
      toast({
        title: "Couldn't Update Resume",
        description: "Something wrong happened!!",
        variant: "destructive",
      });
    }
  }, [
    textUpdateResponse,
    textUpdateSuccess,
    textUpdateLoading,
    textUpdateError,
  ]);

  useEffect(() => {
    if (textData && !textDataEror && !textDataLoading && textDataSuccess) {
      setContent(textData.content);
      setTitle(textData.title);
    }
  }, [textDataEror, textDataLoading, textDataSuccess, textData]);

  const handleUpdateText = () => {
    if (userData?.user?.email) {
      updateText({
        id: textId.toString(),
        title: title,
        content: content,
        userEmail: userData?.user?.email!,
      });
    }
  };

  return (
    <div>
      <h1 className="text-2xl p-4">Text Analysis</h1>
      <div className="flex gap-4 flex-wrap min-h-[100vh]">
        <div className="w-[30rem] border border-slate-400 rounded-lg p-6">
          <h4 className="text-lg font-semibold mb-4">Title</h4>
          <Input
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            defaultValue={title}
            className="w-full mb-4"
          />
          <h4 className="text-lg font-semibold mb-4">Content</h4>
          <Textarea
            rows={20}
            placeholder="Give your text to analyze.."
            id="message"
            onChange={(e) => setContent(e.target.value)}
            defaultValue={content}
            className="w-full mb-4"
          />

          <div className="flex justify-end">
            <Button onClick={handleUpdateText}>Update</Button>
          </div>
        </div>
        <div className="w-7/12 border border-slate-400 rounded-lg p-6 flex-1">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
            
            <article className="flex items-center gap-4 rounded-lg border border-gray-100 bg-white p-6">
              <div>
                <p className="text-2xl font-medium text-gray-900 text-center">
                  {textData?.analysis?.characterCount}
                </p>
                <p className="text-sm text-gray-500 text-center">Total Characters</p>
              </div>
            </article>

            <article className="flex items-center gap-4 rounded-lg border border-gray-100 bg-white p-6">
              <div>
                <p className="text-2xl font-medium text-gray-900 text-center">
                  {textData?.analysis?.paragraphCount}
                </p>
                <p className="text-sm text-gray-500 text-center">Total Paragraphs</p>
              </div>
            </article>

            <article className="flex items-center gap-4 rounded-lg border border-gray-100 bg-white p-6">
              <div>
                <p className="text-2xl font-medium text-gray-900 text-center">
                  {textData?.analysis?.wordCount}
                </p>
                <p className="text-sm text-gray-500 text-center">Total Words</p>
              </div>
            </article>

            <article className="flex items-center gap-4 rounded-lg border border-gray-100 bg-white p-6">
              <div>
                <p className="text-2xl font-medium text-gray-900 text-center">
                  {textData?.analysis?.sentenceCount}
                </p>
                <p className="text-sm text-gray-500 text-center">Total Sentences</p>
              </div>
            </article>
          </div>

          <hr className="border-slate-400 my-4" />

          <div className="w-full mt-8 px-8">
            <h4 className="text-lg font-semibold mb-2 w-full">
              Longest Words
            </h4>
            <ul className="list-decimal border border-slate-400 rounded-lg p-4">
              {textData?.analysis?.longestWords.map(
                (item: string, index: number) => (
                  <>
                  <li className="text-md p-2 m-4 list-item" key={index}>
                    {item}
                  </li>
                  </>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextView;
