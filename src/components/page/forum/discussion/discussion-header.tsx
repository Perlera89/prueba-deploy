import { Avatar, AvatarFallback, AvatarImage } from "../../../ui/avatar";
import { CardHeader, CardTitle, CardContent } from "../../../ui/card";
import { getInitials } from "@/utils/initials";
import { CalendarDays, MessageSquare } from "lucide-react";
import dayjs from "dayjs";
import { MarkdownRenderer } from "../../../display/markdown-renderer";

interface DiscussionHeaderProps {
  title: string;
  instructor: {
    name?: string;
    lastName?: string;
    profileImage?: string;
    role?: string;
  };
  createdAt: Date;
  description: string;
}

export function DiscussionHeader({
  title,
  instructor,
  createdAt,
  description,
}: DiscussionHeaderProps) {
  return (
    <>
      <CardHeader className="pb-3 space-y-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-semibold leading-tight text-foreground">
            {title}
          </CardTitle>
        </div>

        <div className="flex items-center gap-3">
          <Avatar
            className={`h-8 w-8 rounded-full ${instructor?.role === "teacher" ? "ring-1 ring-primary/20" : ""
              }`}
          >
            <AvatarImage
              src={instructor?.profileImage}
              alt={`${instructor?.name || ""} ${instructor?.lastName || ""}`}
              className="rounded-full object-cover"
            />
            <AvatarFallback
              className={
                instructor?.role === "teacher" ? "bg-primary/5" : "bg-muted"
              }
            >
              {getInitials(
                `${instructor?.name || ""} ${instructor?.lastName || ""}`
              )}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <p className="text-sm">
              <span
                className={`font-medium ${instructor?.role === "teacher" ? "text-primary/80" : ""}`}
              >
                {`${instructor?.name || ""} ${instructor?.lastName || ""}`}
              </span>
              {instructor?.role === "teacher" && (
                <span className="text-[10px] ml-1.5 text-primary/70 font-medium">
                  · Profesor
                </span>
              )}
            </p>

            <div className="flex items-center text-xs text-muted-foreground mt-0.5">
              <CalendarDays className="h-3 w-3 mr-1" />
              <span>{dayjs(createdAt).format("DD MMM YYYY, HH:mm")}</span>
              <span className="mx-1.5">·</span>
              <MessageSquare className="h-3 w-3 mr-1" />
              <span>Discusión iniciada</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0 pb-4">
        <div className="text-sm text-foreground leading-relaxed">
          <MarkdownRenderer>{description}</MarkdownRenderer>
        </div>
      </CardContent>
    </>
  );
}
