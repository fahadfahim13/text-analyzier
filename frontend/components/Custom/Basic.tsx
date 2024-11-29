import React, { LegacyRef, useRef } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { Editor, EditorProvider } from "react-simple-wysiwyg";

const BasicTemplate = (props: {
  divRef: React.RefObject<HTMLDivElement>;
  form: UseFormReturn<any, any, undefined>;
}) => {
  const { divRef, form } = props;

  return (
    <div className="w-full" ref={divRef}>
      {/* Personal Details */}
      <div>
        <div className="flex flex-col justify-center align-middle text-center">
          <h1 className="text-3xl font-bold text-red-600">
            {form.watch("fullName") ?? "John Doe"}
          </h1>
          <h2 className="text-lg">
            {form.watch("title") ?? "Software Engineer | Programmer | Coder"}
          </h2>
          <h3 className="">{form.watch("address") ?? "Austin, TX, U.S.A."}</h3>
        </div>
        <div className="flex justify-between">
          <h4 className="text-sm grow">
            {form.watch("phone") ?? "+880123456789"}
          </h4>
          <h4 className="text-sm flex-none">
            {form.watch("email") ?? "fahadfahim13@gmail.com"}
          </h4>
        </div>
        <hr className="border-2 my-2" />
      </div>
      {/* Professional Experience */}
      <div>
        <div className="flex flex-col justify-center align-middle text-center mt-2">
          <h1 className="text-lg ">Professional Experience</h1>
        </div>
        <hr className="border my-2" />
        {form.watch("companies")?.length > 0 &&
          form.watch("companies").map((cmp: any, idx: number) => (
            <div>
              <div className="flex justify-between my-2">
                <div className="grow">
                  <h4 className="text-md font-bold">
                    {form.watch(`companies.${idx}.jobTitle`) ??
                      "Full Stack Software Engineer"}
                  </h4>
                  <h5>
                    {form.watch(`companies.${idx}.companyName`) ??
                      "Company Name"}
                  </h5>
                </div>
                <h4 className="text-sm flex-none">
                  {form.watch(`companies.${idx}.duration`) ??
                    "01 Jan, 2022 - 30 June, 2024"}
                </h4>
              </div>
              <div className="text-wrap font-light break-words text-sm">
                {/* dangerouslySetInnerHTML={{__html: cmp.description ?? ''}} */}
                <EditorProvider>
                  <Editor
                    className="w-[10px] resize border-0"
                    value={cmp.description ?? ""}
                    disabled
                  ></Editor>
                </EditorProvider>
              </div>
              <hr className="border my-2" />
            </div>
          ))}
      </div>
      {/* Education */}
      <div>
        <div className="flex flex-col justify-center align-middle text-center mt-2">
          <h1 className="text-lg ">Education</h1>
        </div>
        <hr className="border my-2" />
        {form.watch("education")?.length > 0 &&
          form.watch("education").map((cmp: any, idx: number) => (
            <div>
              <div className="flex justify-between my-2">
                <div className="grow">
                  <h4 className="text-md font-bold text-wrap break-words">
                    {form.watch(`education.${idx}.companyName`) ??
                      "School Name"}
                  </h4>
                  <h5 className=" text-wrap break-words">
                    {form.watch(`education.${idx}.jobTitle`) ??
                      "B.Sc. in Computer Science & Engineering"}
                  </h5>
                </div>
                <h4 className="text-sm flex-none  text-wrap break-words">
                  {form.watch(`education.${idx}.duration`) ??
                    "01 Jan, 2020 - 01 July, 2024"}
                </h4>
              </div>
              <hr className="border my-2" />
            </div>
          ))}
      </div>
      {/* Projects */}
      <div>
        <div className="flex flex-col justify-center align-middle text-center mt-2">
          <h1 className="text-lg ">Projects</h1>
        </div>
        <hr className="border my-2" />
        {form.watch("projects")?.length > 0 &&
          form.watch("projects").map((cmp: any, idx: number) => (
            <div>
              <div className="flex justify-between my-2">
                <div className="grow">
                  <h4 className="text-md font-bold break-words">
                    {form.watch(`projects.${idx}.companyName`) ??
                      "Project Name"}
                  </h4>
                  <h5 className="break-words">
                    {form.watch(`projects.${idx}.jobTitle`) ??
                      "React, Node.js, Redux, AWS"}
                  </h5>
                </div>
                <h4 className="text-sm flex-none break-words">
                  {form.watch(`projects.${idx}.duration`) ?? "Project URL"}
                </h4>
              </div>
              <div className="text-wrap font-light break-words text-sm">
                {/* dangerouslySetInnerHTML={{__html: cmp.description ?? ''}} */}
                <EditorProvider>
                  <Editor
                    className="w-[10px] resize border-0"
                    value={cmp.description ?? ""}
                    disabled
                  ></Editor>
                </EditorProvider>
              </div>
              <hr className="border my-2" />
            </div>
          ))}
      </div>
      {/* Achievements */}
      <div>
        <div className="flex flex-col justify-center align-middle text-center mt-2">
          <h1 className="text-lg ">Achievements</h1>
        </div>
        <hr className="border my-2" />
        {form.watch("achievements")?.length > 0 &&
          form.watch("achievements").map((cmp: any, idx: number) => (
            <div>
              <div className="flex justify-between my-2">
                <div className="grow">
                  <h4 className="text-md font-bold text-wrap break-words">
                    {form.watch(`achievements.${idx}.companyName`) ??
                      "Champion at Hackathon "}
                  </h4>
                  {/* <h5>
                    {form.watch(`achievements.${idx}.description`) ?? "Jan, 2015"}
                  </h5> */}
                </div>
                <h4 className="text-sm break-words">
                  {form.watch(`achievements.${idx}.duration`) ?? "Jan, 2015"}
                </h4>
              </div>
              <hr className="border my-2" />
            </div>
          ))}
      </div>
      {/* Skills */}
      <div>
        <div className="flex flex-col justify-center align-middle text-center mt-2">
          <h1 className="text-lg ">Skills</h1>
        </div>
        <hr className="border my-2" />
        <div className="flex flex-row flex-wrap justify-start my-2 gap-4">
          {form.watch("skills")?.length > 0 &&
            form
              .watch("skills")
              .map((cmp: any, idx: number) => (
                <p className="font-semibold">{cmp.jobTitle}</p>
              ))}
        </div>
      </div>
    </div>
  );
};

export default BasicTemplate;
