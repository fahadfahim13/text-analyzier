"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
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

  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const [
    getTextDetails,
    {
      data: textData,
      isSuccess: textDataSuccess,
      isError: textDataEror,
      isLoading: textDataLoading
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
    if(userData?.user?.email){
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
            <div className="rounded-sm border border-stroke bg-white text-center shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <h4 className="text-title-md font-bold text-black dark:text-white">{textData?.analysis?.characterCount}</h4>
                  <span className="text-sm font-medium">Total Characters</span>
                </div>
              </div>
            </div>

            <div className="rounded-sm border border-stroke bg-white text-center shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <h4 className="text-title-md font-bold text-black dark:text-white">{textData?.analysis?.paragraphCount}</h4>
                  <span className="text-sm font-medium">Total Paragraphs</span>
                </div>
              </div>
            </div>
            
            <div className="rounded-sm border border-stroke bg-white text-center shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <h4 className="text-title-md font-bold text-black dark:text-white">{textData?.analysis?.wordCount}</h4>
                  <span className="text-sm font-medium">Total Words</span>
                </div>
              </div>
            </div>

            <div className="rounded-sm border border-stroke bg-white text-center shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <h4 className="text-title-md font-bold text-black dark:text-white">{textData?.analysis?.sentenceCount}</h4>
                  <span className="text-sm font-medium">Total Sentences</span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full">
            <h4 className="text-lg font-semibold mb-4 mt-6 w-full">Longest Words</h4>
            <ul className="list-disc">
              {textData?.analysis?.longestWords.map((item: string, index: number) => (
                <li className="text-md" key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextView;
