import React, { ReactElement, useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import ResumeInput from "./ResumeInput";
import TemplateSelector from "./TemplateSelector";
import { useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { useGenerateTextMutation } from "@/lib/redux/APIs/resume";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

const CreateResumeCarousel = (props: { triggerElement: React.ReactNode }) => {
  const { triggerElement } = props;
  const { status, data: userData } = useSession({
    required: true,
  });
  const router = useRouter();

  const [generateText, {
    isLoading: isGeneratingText,
    isError: isErrorGeneratingText,
    error: errorGeneratingText,
    data: generatedTextOutput
  }] = useGenerateTextMutation();


  const [api, setApi] = useState<CarouselApi>();
  const [userInput, setUserInput] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (generatedTextOutput && !isGeneratingText && !isErrorGeneratingText) {
      toast({
        title: "Text Generated Successfully",
        description: "Redirecting to your text",
      });
      router.push(`/Text/${generatedTextOutput._id}`);
    }
  }, [generatedTextOutput, isGeneratingText, isErrorGeneratingText, errorGeneratingText]);
  
  const goNext = () => {
    console.log({userData});
    generateText({
      title: title,
      content: userInput,
      userEmail: userData?.user?.email!
    });
  };

  const goBack = () => {
    api?.scrollPrev(true);
  };
  return (
    <Dialog>
      <DialogTrigger>{triggerElement}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Analyze Your Text</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <Input
            className="mb-4"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <ResumeInput
            goNext={goNext}
            setUserInput={setUserInput}
            userInput={userInput}
          />
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default CreateResumeCarousel;
