import { useQuery } from "@tanstack/react-query";
import React from "react";

const EachExercise = ({ exercise: exerciseTemp }) => {
  const { data: exercise, isLoading } = useQuery({
    queryKey: [exerciseTemp?.exercise_id],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/exerciseby_id?_id=${exerciseTemp?.exercise_id}`
      );
      const data = await res.json();
      return data;
    },
  });
  if (isLoading) {
    return (
      <div>
        <downloading className="">downloading</downloading>
      </div>
    );
  }
  return (
    <div>
      <h1>{exercise?.exerciseName}</h1>
    </div>
  );
};

export default EachExercise;
