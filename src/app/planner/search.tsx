import { useSearchParams } from "next/navigation";
import PlannerPage from "./page";

const Search = () => {
  const searchParams = useSearchParams();
  const uploadId = searchParams.get("uploadId");

//   console.log(uploadId);

  return <PlannerPage searchParams={{ uploadId }} />; 
};

export default Search;
