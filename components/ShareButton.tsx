import { isMobile } from "react-device-detect";
import { RWebShare } from "react-web-share";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
  RedditShareButton,
  WhatsappShareButton,
  EmailShareButton,
} from "next-share";
import {
  FaTelegramPlane,
  FaFacebookF,
  FaWhatsapp,
  FaRedditAlien,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link, Mail } from "lucide-react";
import { IoShareSocialSharp } from "react-icons/io5";

type ShareButtonProps = {
  content: string;
};

export default function ShareButton({ content }: ShareButtonProps) {
  if (isMobile) {
    return (
      <RWebShare
        data={{
          url: content,
        }}
      >
        <Button variant={"ghost"}>
          <IoShareSocialSharp className="w-5 h-5" />
        </Button>
      </RWebShare>
    );
  } else {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant={"ghost"}>
            <IoShareSocialSharp className="w-5 h-5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-18 flex flex-col gap-2.5">
          <button
            onClick={async () => {
              await navigator.clipboard.writeText(content);
            }}
            className="background-color: transparent; border: none; padding: 0px; font: inherit; color: inherit; cursor: pointer; outline: none;"
          >
            <Link size={20} />
          </button>
          <WhatsappShareButton url={content}>
            <FaWhatsapp size={20} />
          </WhatsappShareButton>
          <TelegramShareButton url={content}>
            <FaTelegramPlane size={20} />
          </TelegramShareButton>
          <FacebookShareButton url={content}>
            <FaFacebookF size={20} />
          </FacebookShareButton>
          <TwitterShareButton url={content}>
            <FaXTwitter size={20} />
          </TwitterShareButton>
          <EmailShareButton url={content}>
            <Mail size={20} />
          </EmailShareButton>
          <RedditShareButton url={content}>
            <FaRedditAlien size={20} />
          </RedditShareButton>
        </PopoverContent>
      </Popover>
    );
  }
}
