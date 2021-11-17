import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { getOAuthUrl, getServiceId } from "../../services/oauth";

export const FormOAuth = () => {
  const [serviceId, setServiceId] = useState("");

  useEffect(() => {
    (async () => {
      const { data } = await getServiceId();
      setServiceId(data?.service_id);
    })();
  }, []);

  const oAuthUrl = getOAuthUrl(serviceId);
  return (
    <div>
      <Button href={oAuthUrl} target="_self">
        Yandex
      </Button>
    </div>
  );
};
