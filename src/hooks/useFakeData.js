// src/hooks/useFakeData.js
import { useMemo } from "react";
import { faker } from "@faker-js/faker";
import { ProjectStatus } from "../constant/status";

const useFakeData = (num) => {
  return useMemo(() => {
    return Array.from({ length: num }, () => ({
      projectName: faker.company.name(),
      startTime: faker.date.past().toISOString(),
      endTime: faker.date.future().toISOString(),
      status: faker.helpers.arrayElement(Object.values(ProjectStatus)),
      description: faker.lorem.sentence(),
      logo: faker.image.imageUrl(50, 50, "business", true),
      pdf: faker.internet.url(),
    }));
  }, [num]);
};

export default useFakeData;
