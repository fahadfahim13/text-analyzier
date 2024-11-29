import React from "react";
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
import { Trash2Icon } from "lucide-react";

const DeleteResumeDialog = (props: {
  res: any;
  onDeleteText: (props: any) => void;
  isDeleteLoading: boolean | null;
}) => {
  const { res, onDeleteText, isDeleteLoading } = props;
  return (
    <Dialog>
      <DialogTrigger>
        <button className="btn btn-error btn-sm text-white text-sm">
          {" "}
          <Trash2Icon />{" "}
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Do you want to delete {res.title} ?
        </DialogDescription>
        <DialogFooter>
          <button
            className="btn btn-error btn-sm text-white text-sm"
            onClick={onDeleteText}
          >
            {isDeleteLoading ? (
              <span className="loading loading-spinner text-white loading-sm"></span>
            ) : (
              "Delete"
            )}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteResumeDialog;
