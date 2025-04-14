import instance from "./axios";

export const fetchRoute = async (start, end) => {
  try {
    const response = await instance.post("/api/route", {
      start,
      end,
    });

    return response.data;
  } catch (err) {
    console.error("Ошибка при получении маршрута:", err);
    return null;
  }
};
