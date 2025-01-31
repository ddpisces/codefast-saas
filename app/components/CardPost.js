import ButtonVote from "./ButtonVote";

export default function CardPost({ post }) {
  return (
    <li className="bg-base-100 rounded-3xl p-6 flex justify-between items-start">
      <div>
        <div className="font-bold mb-1">{post.title}</div>
        <div className="opacity-80 leading-relaxed max-h-32 overflow-auto">
          {post.description}
        </div>
      </div>

      <ButtonVote postId={post._id.toString()} initialVotes={false} />
    </li>
  );
}
