export const handlePointSelect = (
  newPoint,
  points,
  setPoints,
  setRouteData,
  fetchRoute
) => {
  if (points.length === 2) {
    setPoints([newPoint]);
    setRouteData(null);
  } else {
    const updatedPoints = [...points, newPoint];
    setPoints(updatedPoints);

    if (updatedPoints.length === 2) {
      fetchRoute(updatedPoints[0], updatedPoints[1])
        .then((data) => setRouteData(data))
        .catch((err) => console.error("Ошибка маршрута:", err));
    }
  }
};
