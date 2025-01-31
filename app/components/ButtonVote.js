"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function ButtonVote({ postId, initialVotes }) {
  const localStorageKeyName = `codefastSaas-hasVoted-${postId}`;
  const [hasVoted, setHasVoted] = useState(false);
  const [isVoting, setIsVoting] = useState(false);

  const [votes, setVotes] = useState(initialVotes);

  useEffect(() => {
    const hasVotedStoredValue = localStorage.getItem(localStorageKeyName);
    setHasVoted(hasVotedStoredValue === "true");
  }, []);

  const handleVote = async () => {
    if (isVoting) return;

    setIsVoting(true);

    try {
      if (hasVoted) {
        await axios.delete(`/api/vote?postId=${postId}`);
        setVotes(votes - 1);
        setHasVoted(false);
        toast.success("Downvoted successfully!");
        localStorage.removeItem(localStorageKeyName);
      } else {
        await axios.post(`/api/vote?postId=${postId}`);
        setVotes(votes + 1);
        setHasVoted(true);
        toast.success("Upvoted successfully!");
        localStorage.setItem(localStorageKeyName, "true");
      }
    } catch (error) {
      toast.error("Failed to update vote. Please try again.");
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <button
      className={`group border px-4 py-2 rounded-xl text-lg ${
        hasVoted
          ? "bg-primary text-primary-content border-transparent"
          : "bg-base-100 text-base-content hover:border-base-content/25 duration-200"
      }`}
      onClick={handleVote}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6 group-hover:-translate-y-1 duration-200"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m4.5 15.75 7.5-7.5 7.5 7.5"
        />
      </svg>

      {isVoting ? (
        <span className="loading loading-spinner loading-xs"></span>
      ) : (
        <div>{votes}</div>
      )}
    </button>
  );
}
