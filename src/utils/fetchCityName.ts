export default async function (lat: number, lon: number) {
  const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/geolocate/address";
  const token = "209cc99c8e73fdaa1bd70d8a0f6d4069cbbe7a85";
  const query = { lat, lon };

  try {
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Token " + token,
      },
      body: JSON.stringify(query),
    });
    const json = await response.json();

    return json.suggestions[0]?.data?.city || " - ";
  } catch (e) {
    return "-";
  }
}
