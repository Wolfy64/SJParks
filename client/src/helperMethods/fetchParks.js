export const fetchParks = async () => {
  alert('fetched!');
  const res = await fetch('/api/parks');
  const json = await res.json();
  return json;
};
