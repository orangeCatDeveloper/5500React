import Tuits from "../tuits";
import Tuit from "../tuits/tuit";
import * as service from "../../services/likes-service";
import { useEffect, useState } from "react";

const MyDislikes = () => {
  const [dislikedTuits, setDislikedTuis] = useState([]);
  const findTuitsIDislike = () =>
    service
      .findAllTuitsDislikedByUser("me")
      .then(tuits => setDislikedTuis(tuits));
  useEffect(findTuitsIDislike, []);

  const mockData = {
    tuit: "Cat For Testing",
    postedBy: "Tester",
    postedOn: "2022/03/20",
    stats: {
      replies: 1,
      retuits: 2,
      likes: 3,
      dislikes: 4
    }
  };

  return (
    <div>
      <Tuit tuit={mockData} />
      <Tuits tuits={dislikedTuits} refreshTuits={findTuitsIDislike} />
    </div>
  );
};
export default MyDislikes;
