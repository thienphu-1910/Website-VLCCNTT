function formatCustomDate(dateString) {
  const date = new Date(dateString);

  // 1. Define Vietnamese weekdays (matching your requested casing)
  const daysOfWeek = [
    "Chủ nhật",
    "Thứ hai",
    "Thứ ba",
    "Thứ tư",
    "Thứ năm",
    "Thứ sáu",
    "Thứ bảy",
  ];

  // 2. Helper to pad numbers with a leading zero (e.g., 9 -> "09")
  const pad = (num) => num.toString().padStart(2, "0");

  // 3. Extract UTC components to preserve the "15:30" from the input
  const dayName = daysOfWeek[date.getUTCDay()];
  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1); // Months are 0-indexed
  const year = date.getFullYear();
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());  

  // 4. Return the constructed string using Template Literals
  return `${dayName}, ${day}/${month}/${year}, ${hours}:${minutes}:${seconds}`;
}

export { formatCustomDate };