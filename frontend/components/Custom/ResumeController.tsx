import React, { useState } from "react";
import { Accordion, AccordionItem } from "@/components/ui/accordion";
import {
  FieldValues,
  Form,
  FormProvider,
  UseFormReturn,
} from "react-hook-form";
import { useDispatch } from "react-redux";
import AboutMeController from "./controllers/AboutMeController";
import ExperienceController from "./controllers/ExperienceController";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";

const ResumeController = (props: {
  form: UseFormReturn<any, any, undefined>;
}) => {
  const { form } = props;
  const dispatch = useDispatch();

  return (
    <div>
      <FormProvider {...form}>
        <Form {...form} className="w-full p-4">
          <FormField
            control={form.control}
            defaultValue={form.getValues("resumeTitle")}
            name={"resumeTitle"}
            render={({ field }) => (
              <FormItem className="mt-2">
                <FormLabel>Resume Title</FormLabel>
                <FormControl>
                  <Input
                    defaultValue={form.getValues("resumeTitle")}
                    placeholder={"Professional Resume"}
                    {...form.register("resumeTitle")}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </Form>
      </FormProvider>
      <Accordion type="single" collapsible>
        <AccordionItem
          value="item-1"
          className="border border-purple-400 dark:border-white rounded-lg px-2 my-2"
        >
          <AboutMeController form={form} />
        </AccordionItem>

        <AccordionItem
          value="item-2"
          className="border border-purple-400 dark:border-white rounded-lg px-2 my-2"
        >
          <ExperienceController
            form={form}
            companies={form.getValues("companies")}
            formValue={"companies"}
            tabTitle={"Professional Experience"}
            showdescription={true}
            showJobTitle={true}
            showDuration={true}
          />
        </AccordionItem>
        <AccordionItem
          value="item-3"
          className="border border-purple-400 dark:border-white rounded-lg px-2 my-2"
        >
          <ExperienceController
            form={form}
            companies={form.getValues("projects")}
            formValue={"projects"}
            tabTitle={"Projects"}
            showdescription={true}
            showJobTitle={true}
            showDuration={true}
          />
        </AccordionItem>
        <AccordionItem
          value="item-4"
          className="border border-purple-400 dark:border-white rounded-lg px-2 my-2"
        >
          <ExperienceController
            form={form}
            companies={form.getValues("education")}
            formValue={"education"}
            tabTitle={"Education"}
            showdescription={false}
            showJobTitle={true}
            showDuration={true}
          />
        </AccordionItem>
        <AccordionItem
          value="item-5"
          className="border border-purple-400 dark:border-white rounded-lg px-2 my-2"
        >
          <ExperienceController
            form={form}
            companies={form.getValues("achievements")}
            formValue={"achievements"}
            tabTitle={"Achievements"}
            showdescription={false}
            showJobTitle={false}
            showDuration={true}
          />
        </AccordionItem>
        <AccordionItem
          value="item-6"
          className="border border-purple-400 dark:border-white rounded-lg px-2 my-2"
        >
          <ExperienceController
            form={form}
            companies={form.getValues("skills")}
            formValue={"skills"}
            tabTitle={"Skills"}
            showdescription={false}
            showJobTitle={false}
            showDuration={false}
          />
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ResumeController;
