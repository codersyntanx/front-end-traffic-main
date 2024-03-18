const data = [
  {
    createAt: "2023-01-10T10:38:00.384Z",
  },
  {
    createAt: "2023-02-10T10:38:00.384Z",
  },
  {
    createAt: "2023-02-10T10:38:00.384Z",
  },

  {
    createAt: "2023-03-10T10:38:00.384Z",
  },

  {
    createAt: "2023-03-10T10:38:00.384Z",
  },
];
const list = [1, 2, 3, 4, 5, 2, 3, 4, 5, 2, 1, 2, 1, 34, 4, 1, 5];
const result = { January: 0, December: 0 };
data.forEach((item) => {
  const month = new Date(item.createAt).toLocaleString("en-us", {
    month: "long",
  });
  result[month] ? (result[month] = result[month] + 1) : (result[month] = 1);
});
console.log(result);
