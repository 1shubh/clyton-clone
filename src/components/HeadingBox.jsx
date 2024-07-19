import React from "react";
import { Button, Select } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";

const options = [
  {
    title: "All Groups",
    value: "allGroups",
  },
  {
    title: "UNASSIGNED",
    value: "unassigned",
  },
  {
    title: "TEAM 1 - PURCELL",
    value: "team1-purcell",
  },
  {
    title: "TEAM 2 - KLEN",
    value: "team2-klen",
  },
  {
    title: "TEAM 3 - MADDUX",
    value: "team2-maddux",
  },
  {
    title: "Team 4 - CHRISTENSEN",
    value: "team4-christensen",
  },
  {
    title: "TEAM 5 - MONTANEZ",
    value: "",
  },
  {
    title: "TEAM 6 - YBARRA",
    value: "team6-ybarra",
  },
  {
    title: "Test/Demo",
    value: "test-demo",
  },
  {
    title: "Unregistered",
    value: "unregistered",
  },
];

const Dates = [
  {
    title: "All Dates",
    value: "all",
  },
  {
    title: "7 Days",
    value: "7-days",
  },
  {
    title: "30 Days",
    value: "30-days",
  },
  {
    title: "60 Days",
    value: "60-days",
  },
  {
    title: "90 Days",
    value: "90-days",
  },
  {
    title: "6 Months",
    value: "6-months",
  },
  {
    title: "1 Year",
    value: "1-year",
  },
];
export const HeadingBox = ({ pageName }) => {
  return (
    <div className="flex items-center justify-between pt-5 border-b-2 border-black pb-5">
      <div className="flex items-center gap-5 w-[25%]">
        <p className="text-2xl font-bold">{pageName}</p>
        <Select>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.title}
            </option>
          ))}
        </Select>
      </div>
      <div className="flex gap-2 w-[50%]">
        <Input placeholder={`Search ${pageName}`} />
        <Select>
          {Dates.map((ele, i) => {
            return (
              <option key={i} value={ele.value}>
                {ele.title}
              </option>
            );
          })}
        </Select>
        <Button colorScheme="orange" w={"50%"}>
          SEARCH
        </Button>
      </div>
    </div>
  );
};
