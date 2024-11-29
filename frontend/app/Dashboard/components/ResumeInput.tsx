import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const ResumeInput = (props: { goNext: () => void; setUserInput: (text: string) => void; userInput: string }) => {
  const { goNext, setUserInput, userInput } = props;
  return (
    <div className="flex flex-col justify-between gap-12">
      <div className="grid w-full gap-1.5">
        <Textarea placeholder="Give your text to analyze.." id="message" onChange={(e) => setUserInput(e.target.value)} />
      </div>
      <Button onClick={goNext} disabled={userInput === ''}>Next</Button>
    </div>
  );
};

export default ResumeInput;
