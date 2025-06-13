import { useParams } from "react-router-dom";

export default function Index() {
  const { userId } = useParams();
  return <div>company review {userId}</div>;
}
