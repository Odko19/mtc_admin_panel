const db_sc = require("../../db/db_sc");
const axios = require("axios");

async function getAllEbarimt(req, res) {
  const { client_id, grant_type, username, password } = req.query;
  const formData = {
    client_id: client_id,
    grant_type: grant_type,
    username: username,
    password: password,
  };
  const formBody = new URLSearchParams(formData).toString();
  axios
    .post(
      "https://auth.itc.gov.mn/auth/realms/ITC/protocol/openid-connect/token",
      formBody,
      {
        "Content-Type": "application/x-www-form-urlencoded",
      }
    )
    .then((response) => {
      console.log(response.data.access_token);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  res.send("ji");
}

async function getAllEbarimtReg(req, res) {
  const { regNo } = req.query;
  console.log(regNo);
  // You can pass parameters directly in the URL for a GET request
  const url = `https://service.itc.gov.mn/api/easy-register/api/info/consumer?regNo=${regNo}`;

  axios
    .get(url, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI1OFJjdFJOVUZ5X0h6NllyaFAtYTdfY08taTI1SFVuTTNGWnpsWWdJa0lnIn0.eyJleHAiOjE2OTQ3NjQ5MDYsImlhdCI6MTY5NDc2MTMwNiwianRpIjoiOWI2NDNmYmItZjNmOS00YzNhLTkzNzEtYTMzZDBmYTFiMjA3IiwiaXNzIjoiaHR0cHM6Ly9hdXRoLml0Yy5nb3YubW4vYXV0aC9yZWFsbXMvSVRDIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6ImRlMzcyMTJlLTgwNjAtNDFjMC05YmQwLTE0MGUwNzliN2FjNSIsInR5cCI6IkJlYXJlciIsImF6cCI6InZhdHBzIiwic2Vzc2lvbl9zdGF0ZSI6ImM1NTk4ODc0LWU1YTAtNGQyOC04MzhhLTRlNjY4NjYwM2I2ZCIsImFjciI6IjEiLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy1pdGMiLCJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsidmF0cHMiOnsicm9sZXMiOlsiRUFTWS1SRUdJU1RFUiJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwic2lkIjoiYzU1OTg4NzQtZTVhMC00ZDI4LTgzOGEtNGU2Njg2NjAzYjZkIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJlci0yMDczOTQzIiwiZW1haWwiOiJhemFhQG10Y29uZS5uZXQifQ.RWGpMnQSS0usdwalWoanXaw9n_85hJBkjJ2c-gzG4DjS4vy2PKImaQSaT_ZdKpVZMHHB681ilPip4lpfxaV_VRb5wL0w42QMWHguJqoOfcGgLvUy7ftQhXmqcQm8irSh32OgfXOMV7c01dlk3ts1iU5tTIhUJnD_6DiSMJGcE8zPnLrf_AFFpfBZPDQ1iR7ZPeZ9iVLcKwaFTcI2iYAwV23gxcVqKWUxcbEW7Gktuyu31QtvcrU9VvNcExGtFF-Sy27rIWIL20N0jAqbARa9GE2ELqOILqdVsjyoqUgQsoJSqjsFBeF1qGZIxtUGPmkH3Tkw3_9BYX1yJ_AER6zUzg",
      },
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  res.send("hello");
}
module.exports = {
  getAllEbarimt,
  getAllEbarimtReg,
};
