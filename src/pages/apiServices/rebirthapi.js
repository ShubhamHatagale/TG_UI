export const getRebirthData = async () => {
  var myGetHeaders = new Headers();
  myGetHeaders.append("Content-Type", "application/json");
  var s_id = localStorage.getItem('tr_id')

  let res = await fetch(
    `http://localhost:9002/masters/rebirth/user/${s_id}`,
    {
      method: "get",
      headers: myGetHeaders
    }
  );
  let response = await res.json();
  const empResult = response.data;
  return empResult;
}