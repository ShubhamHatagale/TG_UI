export const getReflectionData = async () => {
  var s_id = localStorage.getItem('tr_id')

  var myGetHeaders = new Headers();
  myGetHeaders.append("Content-Type", "application/json");

  let res = await fetch(
    `https://parivartan.transganization.com/nodejs/masters/reflection/user/${s_id}`,
    {
      method: "get",
      headers: myGetHeaders
    }
  );
  let response = await res.json();
  const empResult = response.data;
  return empResult;
}