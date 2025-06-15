import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ReactionType = {
  Like: 1,
  Love: 2,
  Haha: 3,
  Wow: 4,
  Sad: 5,
  Angry: 6,
};

const reactionConfig = {
  [ReactionType.Like]: { emoji: "👍", label: "Like", color: "text-blue-500" },
  [ReactionType.Love]: { emoji: "❤️", label: "Love", color: "text-red-500" },
  [ReactionType.Haha]: { emoji: "😂", label: "Haha", color: "text-yellow-500" },
  [ReactionType.Wow]: { emoji: "😮", label: "Wow", color: "text-yellow-500" },
  [ReactionType.Sad]: { emoji: "😢", label: "Sad", color: "text-blue-400" },
  [ReactionType.Angry]: {
    emoji: "😠",
    label: "Angry",
    color: "text-orange-500",
  },
};

export const Reactions = ({
  reactions = [],
  handleReact,
  clasNameIcon = "text-xl",
  classNameCount = "text-xs",
}) => {
  const countReactionLike = reactions.filter(
    (r) => r.reactionType === ReactionType.Like
  ).length;
  const countReactionLove = reactions.filter(
    (r) => r.reactionType === ReactionType.Love
  ).length;
  const countReactionHaha = reactions.filter(
    (r) => r.reactionType === ReactionType.Haha
  ).length;
  const countReactionWow = reactions.filter(
    (r) => r.reactionType === ReactionType.Wow
  ).length;
  const countReactionSad = reactions.filter(
    (r) => r.reactionType === ReactionType.Sad
  ).length;
  const countReactionAngry = reactions.filter(
    (r) => r.reactionType === ReactionType.Angry
  ).length;
  return (
    <div className="flex gap-4 items-center px-5">
      <div className="hover:cursor-pointer">
        <span className={clasNameIcon}>👍</span>
        <span className={classNameCount}>{countReactionLike}</span>
      </div>
      <div className="hover:cursor-pointer">
        <span className={clasNameIcon}>❤️</span>
        <span className={classNameCount}>{countReactionLove}</span>
      </div>
      <div className="hover:cursor-pointer">
        <span className={clasNameIcon}>😂</span>
        <span className={classNameCount}>{countReactionHaha}</span>
      </div>
      <div className="hover:cursor-pointer">
        <span className={clasNameIcon}>😮</span>
        <span className={classNameCount}>{countReactionWow}</span>
      </div>
      <div className="hover:cursor-pointer">
        <span className={clasNameIcon}>😢</span>
        <span className={classNameCount}>{countReactionSad}</span>
      </div>
      <div className="hover:cursor-pointer">
        <span className={clasNameIcon}>😡</span>
        <span className={classNameCount}>{countReactionAngry}</span>
      </div>
    </div>
  );
};
