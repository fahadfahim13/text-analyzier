export type DescriptionType = "paragraph" | "list" | "Paragraph" | "List";

export interface SocialInfo {
  email: string;
  linkedin?: string;
  phone?: string;
}

export interface BasicInfoString {
  header: string;
  descriptionType: "paragraph" | "Paragraph";
  description: string;
}

export interface BasicInfoStringArray {
  header: string;
  descriptionType: "list" | "List";
  description: string[];
}

export interface AdvancedInfo extends BasicInfoString {
  header3: string;
  smallDescription: string;
  subHeader: string;
}

export interface AdvancedSocialInfo extends BasicInfoString {
  header3: string;
  smallDescription: SocialInfo;
  subHeader: string;
}

export interface ResumeState {
  _id?: string;
  name?: string;
  aboutMe: BasicInfoString;
  achievements: BasicInfoString[];
  experiences: AdvancedInfo[];
  introduction: AdvancedSocialInfo;
  projects: AdvancedInfo[];
  skills: BasicInfoStringArray;
}

export const initialState: ResumeState = {
  aboutMe: {
    header: "",
    descriptionType: "paragraph",
    description: "",
  },
  achievements: [],
  experiences: [],
  introduction: {
    header: "",
    descriptionType: "paragraph",
    description: "",
    smallDescription: {
      email: "",
    },
    header3: "",
    subHeader: "",
  },
  projects: [],
  skills: {
    header: "",
    descriptionType: "list",
    description: [],
  },
};
