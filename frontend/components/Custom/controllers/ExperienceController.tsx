import React, { useCallback, useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  FieldValues,
  Form,
  FormProvider,
  UseFormReturn,
} from "react-hook-form";
import {
  experienceForms,
  experienceFields,
  ExperienceType,
} from "../utils/FormItems";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Editor, {
  BtnBold,
  BtnBulletList,
  BtnClearFormatting,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnRedo,
  BtnStrikeThrough,
  BtnStyles,
  BtnUnderline,
  BtnUndo,
  EditorProvider,
  HtmlButton,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import DescriptionGeneratorDialog from "../../../app/Resume/components/DescriptionGeneratorDialog";

const ExperienceController = (props: {
  form: UseFormReturn<FieldValues, any, any>;
  companies: any[];
  formValue: string;
  tabTitle: string;
  showdescription: boolean;
  showJobTitle: boolean;
  showDuration: boolean;
}) => {
  const {
    form,
    companies,
    formValue,
    tabTitle,
    showdescription,
    showJobTitle,
    showDuration,
  } = props;
  const [experiences, setExperiences] = useState(experienceFields);

  useEffect(() => {
    let newValue = {
      name: formValue,
      values:
        form
          .getValues(formValue)
          .map((cmp: any) => experienceForms(formValue)) ??
        companies.map(() => experienceForms(formValue)),
    };
    setExperiences((prev) => [prev[0], newValue]);
  }, [form.getValues(formValue), form.getValues(formValue).length]);

  const handleAddNew = () => {
    let newValue = {
      name: formValue,
      values: [
        ...(form
          .getValues(formValue)
          .map((cmp: any) => experienceForms(formValue)) ??
          companies.map(() => experienceForms(formValue))),
        experienceForms(formValue),
      ],
    };
    setExperiences((prev) => [prev[0], newValue]);
    const newFormValue = [
      ...form.getValues(formValue),
      {
        companyName: "",
        jobTitle: "",
        duration: "",
        description: "",
      },
    ];
    form.setValue(formValue, newFormValue);
  };

  const handleRemove = (id: number) => {
    let newValue = experiences[1].values;
    newValue = newValue.filter((el, idx) => idx !== id && el);
    setExperiences((prev) => [
      prev[0],
      {
        ...prev[1],
        values: newValue,
      },
    ]);

    let newFormValue = [...form.getValues(formValue)];
    newFormValue = newFormValue.filter((el, idx) => idx !== id && el);

    form.setValue(formValue, newFormValue);
  };

  return (
    <>
      <AccordionTrigger>{tabTitle}</AccordionTrigger>
      <AccordionContent>
        <FormProvider {...form}>
          <Form {...form} className="w-full p-4">
            {/* <div> */}
            {experiences[1].values.map((ex, idx) => (
              <div>
                {ex.map((f: ExperienceType) => (
                  <FormField
                    control={form.control}
                    name={`${formValue}.${idx}.${f?.name}` ?? ""}
                    render={({ field }) => (
                      <FormItem className="mt-2">
                        {!(f.name === "description" && !showdescription) &&
                          !(f.name === "jobTitle" && !showJobTitle) &&
                          !(!showDuration && f.name === "duration") && (
                            <div className="flex flex-row justify-between">
                              <FormLabel>{f.title}</FormLabel>
                              {f.name === "description" && (
                                <DescriptionGeneratorDialog
                                  form={form}
                                  formValue={`${formValue}.${idx}.${f?.name}`}
                                />
                              )}
                            </div>
                          )}
                        <FormControl>
                          {f.name !== "description" ? (
                            !(f.name === "jobTitle" && !showJobTitle) &&
                            !(!showDuration && f.name === "duration") && (
                              <Input
                                placeholder={f.placeholder}
                                {...form.register(
                                  `${formValue}.${idx}.${f?.name}`,
                                )}
                                className="w-full"
                              />
                            )
                          ) : showdescription ? (
                            <EditorProvider>
                              <Editor
                                className="w-[10px] resize"
                                value={form.getValues(
                                  `${formValue}.${idx}.${f?.name}`,
                                )}
                                // {...form.register(`${formValue}.${idx}.${f?.name}`)}
                                onChange={(e) =>
                                  form.setValue(
                                    `${formValue}.${idx}.${f?.name}`,
                                    e.target.value,
                                  )
                                }
                              >
                                <Toolbar>
                                  <BtnUndo />
                                  <BtnRedo />
                                  <Separator />
                                  <BtnBold />
                                  <BtnItalic />
                                  <BtnUnderline />
                                  <BtnStrikeThrough />
                                  <Separator />
                                  <BtnNumberedList />
                                  <BtnBulletList />
                                  <Separator />
                                  <BtnLink />
                                  <BtnClearFormatting />
                                  <HtmlButton />
                                  <Separator />
                                  <BtnStyles />
                                </Toolbar>
                              </Editor>
                            </EditorProvider>
                          ) : (
                            <></>
                          )}
                        </FormControl>
                      </FormItem>
                    )}
                  />
                ))}
                {ex.length > 0 && (
                  <div className="flex p-4 my-2 justify-between w-full flex-row-reverse">
                    <Button
                      onClick={() => handleRemove(idx)}
                      variant={"destructive"}
                    >
                      {" "}
                      <TrashIcon />{" "}
                    </Button>
                  </div>
                )}
              </div>
            ))}

            <Button
              variant={"secondary"}
              className="mt-4 border border-black"
              onClick={handleAddNew}
            >
              + Add New
            </Button>
          </Form>
        </FormProvider>
      </AccordionContent>
    </>
  );
};

export default ExperienceController;
